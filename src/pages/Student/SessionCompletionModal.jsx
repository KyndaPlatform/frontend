// components/student/SessionCompletionModal.jsx
import React, { useState } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import axios from 'axios';

const SessionCompletionModal = ({ isOpen, onClose, session }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleComplete = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `/api/v1/sessions/${session.id}/complete`,
        { rating, review },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        setCompleted(true);
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 3000);
      }

    } catch (error) {
      console.error('Session completion error:', error);
      alert(error.response?.data?.message || 'Failed to complete session');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6">
        {!completed ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Complete Session</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Rate your experience with {session?.tutor?.name}
              </p>

              {/* Star Rating */}
              <div className="flex gap-2 justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={40}
                      className={`${
                        star <= rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>

              {/* Review */}
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your experience (optional)"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>✓ Your rating will be recorded</li>
                <li>✓ Payment will be released from escrow</li>
                <li>✓ Tutor will receive ₦{session?.payment?.tutorAmount?.toLocaleString()} in their account</li>
                <li>✓ You can request a refund within 24 hours if there was an issue</li>
        </ul>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleComplete}
            disabled={loading}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300"
          >
            {loading ? 'Processing...' : 'Confirm & Complete'}
          </button>
        </div>
      </>
    ) : (
      <div className="text-center py-8">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Session Completed!
        </h2>
        <p className="text-gray-600 mb-4">
          Payment has been released to the tutor.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting to dashboard...
        </p>
      </div>
    )}
  </div>
</div>

);
};

export default SessionCompletionModal;