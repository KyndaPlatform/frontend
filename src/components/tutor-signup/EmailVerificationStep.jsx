// src/components/tutor-signup/EmailVerificationStep.jsx
import React from 'react';

const EmailVerificationStep = ({ handleNext, loading }) => (
  <div className="text-center space-y-6">
    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Verify Your Email</h3>
      <p className="text-sm text-gray-600 mt-2">We'll send a code to your email</p>
    </div>
    <button
      onClick={handleNext}
      disabled={loading}
      className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
    >
      {loading ? 'Sending...' : 'Send Verification Code'}
    </button>
  </div>
);

export default EmailVerificationStep;