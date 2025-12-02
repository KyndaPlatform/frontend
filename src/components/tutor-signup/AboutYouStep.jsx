// src/components/tutor-signup/AboutYouStep.jsx
import React from 'react';

const AboutYouStep = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800">Upload Verification Document</h3>
    <p className="text-sm text-gray-600">These documents help verify your professional credentials</p>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tell us About You
      </label>
      <textarea
        placeholder="tell us about you, your professionalism and what makes confidence and trusting to as a tutor"
        value={formData.tellUsAboutYou}
        onChange={(e) => updateFormData('tellUsAboutYou', e.target.value)}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tell us About Your Lessons
      </label>
      <textarea
        placeholder="convince your future students why they should take lessons with you"
        value={formData.tellUsAboutYourLessons}
        onChange={(e) => updateFormData('tellUsAboutYourLessons', e.target.value)}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Explain Your Teaching Methods
      </label>
      <textarea
        placeholder="briefly explain the methods you use to treat you individual unique student needs"
        value={formData.explainYourTeachingMethods}
        onChange={(e) => updateFormData('explainYourTeachingMethods', e.target.value)}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
);

export default AboutYouStep;