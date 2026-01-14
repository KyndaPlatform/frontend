// pages/student/PaymentCallback.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import axios from 'axios';

const PaymentCallback = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, failed
  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      // Get payment reference from URL
      const urlParams = new URLSearchParams(window.location.search);
      const reference = urlParams.get('reference');

      if (!reference) {
        setStatus('failed');
        setError('Payment reference not found');
        return;
      }

      // Verify payment with backend
      const response = await axios.post('/api/v1/bookings/verify-payment', {
        reference: reference
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setStatus('success');
        setSessionData(response.data.data);
        
        // Redirect to session details after 3 seconds
        setTimeout(() => {
          navigate(`/sessions/${sessionId}`);
        }, 3000);
      } else {
        setStatus('failed');
        setError(response.data.message);
      }

    } catch (err) {
      console.error('Payment verification error:', err);
      setStatus('failed');
      setError(err.response?.data?.message || 'Payment verification failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        {status === 'verifying' && (
          <div className="text-center">
            <Loader size={64} className="mx-auto text-blue-600 animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verifying Payment
            </h2>
            <p className="text-gray-600">
              Please wait while we confirm your payment...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Your booking has been confirmed and payment is secured in escrow.
            </p>

            {sessionData && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-blue-800 mb-3">Session Details:</h3>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>✓ Amount Paid: ₦{sessionData.payment.amountPaid.toLocaleString()}</p>
                  <p>✓ Payment Secured in Escrow</p>
                  <p>✓ Session Confirmed</p>
                  <p>✓ Tutor will contact you shortly</p>
                </div>
              </div>
            )}

            <p className="text-sm text-gray-500">
              Redirecting to session details...
            </p>
          </div>
        )}

        {status === 'failed' && (
          <div className="text-center">
            <XCircle size={64} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Failed
            </h2>
            <p className="text-gray-600 mb-6">
              {error || 'Something went wrong with your payment.'}
            </p>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback;