// src/jobs/autoReleasePayments.js
const Session = require('../models/Session');
const blockchainService = require('../services/blockchain/mock-blockchain.service');
const conversionService = require('../services/payment/conversion.service');

/**
 * Auto-release payments for completed sessions after 24 hours
 * Run this job every hour
 */
async function autoReleasePayments() {
  console.log('🔄 Running auto-release job...');
  
  try {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Find sessions that:
    // 1. Are in PAYMENT_CONFIRMED or IN_PROGRESS status
    // 2. Scheduled end time was more than 24 hours ago
    // 3. Student hasn't confirmed completion yet
    // 4. Payment is still in LOCKED status
    const eligibleSessions = await Session.find({
      status: { $in: ['PAYMENT_CONFIRMED', 'IN_PROGRESS'] },
      scheduledEndTime: { $lt: twentyFourHoursAgo },
      'studentConfirmed.confirmed': false,
      'payment.escrowStatus': 'LOCKED'
    }).populate('studentId tutorId');

    console.log(`Found ${eligibleSessions.length} sessions eligible for auto-release`);

    for (const session of eligibleSessions) {
      try {
        console.log(`Processing session ${session.sessionId}...`);

        // Release escrow on blockchain
        const release = await blockchainService.releaseEscrow(session.sessionId);

        // Convert USDT back to Naira for tutor
        const tutorPayoutConversion = await conversionService.convertUSDTToNaira(
          session.payment.tutorAmountUSDT
        );

        // Update session
        session.payment.tutorAmountNaira = tutorPayoutConversion.nairaAmount;
        session.payment.releaseTransactionHash = release.release.transactionHash;
        session.payment.releaseDate = new Date();
        session.payment.releaseMethod = 'AUTO_RELEASED';
        session.payment.escrowStatus = 'RELEASED';
        session.status = 'COMPLETED';
        session.actualEndTime = session.scheduledEndTime;
        
        // Mark as auto-completed
        session.completionConfirmed = {
          by: 'AUTO',
          at: new Date()
        };

        await session.save();

        console.log(`✅ Auto-released payment for session ${session.sessionId}`);
        console.log(`   Tutor will receive: ₦${tutorPayoutConversion.nairaAmount.toLocaleString()}`);

        // TODO: Send notifications
        // - Email to tutor: "You've received payment"
        // - Email to student: "Session auto-completed"
        // - Initiate Paystack transfer to tutor's bank

      } catch (sessionError) {
        console.error(`❌ Failed to auto-release session ${session.sessionId}:`, sessionError);
        
        // Log error but continue with other sessions
        session.adminNotes = `Auto-release failed: ${sessionError.message}`;
        await session.save();
      }
    }

    console.log('✅ Auto-release job completed');

  } catch (error) {
    console.error('❌ Auto-release job error:', error);
  }
}

// Run job every hour
const runScheduledJob = () => {
  console.log('📅 Starting auto-release scheduler...');
  
  // Run immediately on startup
  autoReleasePayments();
  
  // Then run every hour
  setInterval(() => {
    autoReleasePayments();
  }, 60 * 60 * 1000); // 1 hour
};

module.exports = { autoReleasePayments, runScheduledJob };