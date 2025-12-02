// src/components/tutor-signup/CertificateUploadStep.jsx
import React from 'react';

const CertificateUploadStep = ({ formData, updateFormData }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-800">Upload Verification Document</h3>
    <p className="text-sm text-gray-600">These documents help verify your professional credentials</p>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Certificate Title
      </label>
      <input
        type="text"
        placeholder="Title of Certificate"
        value={formData.certificateTitle}
        onChange={(e) => updateFormData('certificateTitle', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        SMS Observer<span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        placeholder="Name of SMS observer"
        value={formData.smsObserver}
        onChange={(e) => updateFormData('smsObserver', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Institution Issuer<span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        placeholder="Name of Institution"
        value={formData.institutionIssuer}
        onChange={(e) => updateFormData('institutionIssuer', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
);

export default CertificateUploadStep;