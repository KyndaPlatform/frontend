// src/components/tutor-signup/PhoneCodeStep.jsx
import React from 'react';
import { Check } from 'lucide-react';

const PhoneCodeStep = ({ formData, updateFormData }) => (
  <div className="text-center space-y-6">
    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
      <Check className="w-8 h-8 text-white" />
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Email Verified</h3>
      <p className="text-sm text-gray-600 mt-2">
        You have successfully verified your email address. Proceed to complete your application
      </p>
    </div>
    <input
      type="text"
      placeholder="Enter verification code"
      value={formData.phoneCode}
      onChange={(e) => updateFormData('phoneCode', e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
    />
  </div>
);

export default PhoneCodeStep;