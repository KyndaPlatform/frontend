// src/components/tutor-signup/QualificationsStep.jsx
import React from 'react';

const QualificationsStep = ({ formData, updateFormData }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-800">List Your Qualification</h3>
    <p className="text-sm text-gray-600">Setup your verification qualifications</p>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Highest Education <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.highestEducation}
          onChange={(e) => updateFormData('highestEducation', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">select</option>
          <option value="high_school">High School</option>
          <option value="associate">Associate Degree</option>
          <option value="bachelor">Bachelor's Degree</option>
          <option value="master">Master's Degree</option>
          <option value="doctorate">Doctorate</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Age <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="(30-40 years)"
          value={formData.age}
          onChange={(e) => updateFormData('age', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subject you Teach <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.subjectsYouTeach}
          onChange={(e) => updateFormData('subjectsYouTeach', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Subject you want to teach</option>
          <option value="mathematics">Mathematics</option>
          <option value="english">English</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teaching Level <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.teachingLevel}
          onChange={(e) => updateFormData('teachingLevel', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select the level you teach</option>
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="tertiary">Tertiary</option>
        </select>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Hourly Rate <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        placeholder="Tell us your normal hourly amount in dollars"
        value={formData.hourlyRate}
        onChange={(e) => updateFormData('hourlyRate', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Years of Experience <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        placeholder="0"
        value={formData.yearsOfExperience}
        onChange={(e) => updateFormData('yearsOfExperience', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Location <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        placeholder="Type in or pin your location"
        value={formData.location}
        onChange={(e) => updateFormData('location', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
);

export default QualificationsStep;