// src/components/student/BookingModal.jsx
import React, { useState } from 'react';
import { X, Calendar, Clock, DollarSign, Shield, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BookingModal = ({ isOpen, onClose, tutor, course }) => {
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: 60, // default 60 minutes
    subject: course?.subjects?.[0] || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Details, 2: Confirm, 3: Payment

  // Calculate price based on duration
  const calculatePrice = () => {
    const pricePerHour = 2000;
    return (bookingData.duration / 60) * pricePerHour;
  };

  // const handleBooking = async () => {
  //   try {
  //     setLoading(true);
  //     setError('');

  //     // Combine date and time
  //     const scheduledStartTime = new Date(`${bookingData.date}T${bookingData.time}`);

  //     // Create booking
  //     const response = await axios.post('/api/booking/create', {
  //       tutorId: tutor.id,
  //       subject: bookingData.subject,
  //       duration: bookingData.duration,
  //       scheduledStartTime: scheduledStartTime.toISOString()
  //     }, {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('kynda_token')}`
  //       }
  //     });

  //     if (response.data.success) {
  //       // Redirect to Paystack payment page
  //       window.location.href = response.data.data.payment.authorizationUrl;
  //     }

  //   } catch (err) {
  //     console.error('Booking error:', err);
  //     setError(err.response?.data?.message || 'Failed to create booking');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // In your BookingModal.jsx - Update the handleBooking function:

const handleBooking = async () => {
  try {
    setLoading(true);
    setError('');

    // Prepare booking data
    const bookingData = {
      tutorId: tutor.id,
      subject: bookingData.subject,
      duration: bookingData.duration,
      scheduledStartTime: startTime.toISOString(),
      studentWallet: '' // Optional: Student's crypto wallet if they have one
    };

    // Call backend to create booking
    const response = await axios.post('/api/booking/create', bookingData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('kynda_token')}`
      }
    });

    if (response.data.success) {
      // Redirect to Paystack payment page
      window.location.href = response.data.data.payment.authorizationUrl;
    } else {
      setError(response.data.message || 'Failed to create booking');
    }

  } catch (err) {
    console.error('Booking error:', err);
    setError(err.response?.data?.message || 'Failed to create booking');
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {step === 1 && 'Book a Session'}
            {step === 2 && 'Confirm Booking'}
            {step === 3 && 'Payment'}
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-4 sm:px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= s 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > s ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Step 1: Booking Details */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Tutor Info */}
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <img 
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{tutor.name}</h3>
                  <p className="text-sm text-gray-600">{tutor.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-semibold">4.9</span>
                    <span className="text-sm text-gray-500">(156 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <select 
                  value={bookingData.subject}
                  onChange={(e) => setBookingData({...bookingData, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select subject</option>
                  {course?.subjects?.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  Date
                </label>
                <input 
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock size={16} className="inline mr-2" />
                  Time
                </label>
                <input 
                  type="time"
                  value={bookingData.time}
                  onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[45, 60].map((dur) => (
                    <button
                      key={dur}
                      onClick={() => setBookingData({...bookingData, duration: dur})}
                      className={`px-4 py-3 rounded-lg border-2 font-semibold transition-colors ${
                        bookingData.duration === dur
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {dur} minutes
                      <div className="text-sm font-normal mt-1">
                        ₦{((dur / 60) * 2000).toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Display */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Session Price:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₦{calculatePrice().toLocaleString()}
                  </span>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!bookingData.date || !bookingData.time || !bookingData.subject}
                className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Continue to Confirmation
              </button>
            </div>
          )}

          {/* Step 2: Confirmation */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Shield size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">Payment Protection</h4>
                    <p className="text-sm text-blue-700">
                      Your payment is secured in blockchain escrow and will only be released to the tutor after you confirm the session was completed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Booking Summary</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tutor:</span>
                    <span className="font-semibold">{tutor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subject:</span>
                    <span className="font-semibold">{bookingData.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">
                      {new Date(bookingData.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold">{bookingData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{bookingData.duration} minutes</span>
                  </div>
                </div>

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total Amount:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₦{calculatePrice().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* How it Works */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3">How Payment Works:</h4>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-600">1.</span>
                    <span>You pay ₦{calculatePrice().toLocaleString()} now</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-600">2.</span>
                    <span>Money is held securely in blockchain escrow</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-600">3.</span>
                    <span>Session happens at scheduled time</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-600">4.</span>
                    <span>You confirm session completion</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-600">5.</span>
                    <span>Payment automatically released to tutor</span>
                  </li>
                </ol>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleBooking}
                  disabled={loading}
                  className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;