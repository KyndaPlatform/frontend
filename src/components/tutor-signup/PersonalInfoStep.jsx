// src/components/tutor-signup/PersonalInfoStep.jsx
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PersonalInfoStep = ({ 
  formData, 
  updateFormData, 
  showPassword, 
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword
}) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ayobami"
          value={formData.firstName}
          onChange={(e) => updateFormData('firstName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Mercy"
          value={formData.lastName}
          onChange={(e) => updateFormData('lastName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email Address <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        placeholder="olamipejo@example.com"
        value={formData.email}
        onChange={(e) => updateFormData('email', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-2">
        <select className="w-24 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>🇳🇬 +234</option>
        </select>
        <input
          type="tel"
          placeholder="+1 234 765 4321"
          value={formData.phoneNumber}
          onChange={(e) => updateFormData('phoneNumber', e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Password <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Insert password"
          value={formData.password}
          onChange={(e) => updateFormData('password', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
        </button>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Confirm Password <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Insert password"
          value={formData.confirmPassword}
          onChange={(e) => updateFormData('confirmPassword', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
        </button>
      </div>
    </div>
  </div>
);

export default PersonalInfoStep;