// src/pages/Tutor/TutorSignUp.jsx - COMPLETE CORRECTED VERSION
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import StepIndicator from '../../components/tutor-signup/StepIndicator';
import PersonalInfoStep from '../../components/tutor-signup/PersonalInfoStep';
import EmailVerificationStep from '../../components/tutor-signup/EmailVerificationStep';
import EmailCodeStep from '../../components/tutor-signup/EmailCodeStep';
import PhoneVerificationStep from '../../components/tutor-signup/PhoneVerificationStep';
import PhoneCodeStep from '../../components/tutor-signup/PhoneCodeStep';
import QualificationsStep from '../../components/tutor-signup/QualificationsStep';
import CertificateUploadStep from '../../components/tutor-signup/CertificateUploadStep';
import DocumentUploadStep from '../../components/tutor-signup/DocumentUploadStep';
import AboutYouStep from '../../components/tutor-signup/AboutYouStep';
import AgreementFormStep from '../../components/tutor-signup/AgreementFormStep';
import RegistrationCompleteStep from '../../components/tutor-signup/RegistrationCompleteStep';
import AccountUnderReviewStep from '../../components/tutor-signup/AccountUnderReviewStep';
import AllVerifiedStep from '../../components/tutor-signup/AllVerifiedStep';
import SuccessModal from '../../components/tutor-signup/SuccessModal';
import { X } from 'lucide-react';

const TutorSignUp = () => {
  const navigate = useNavigate();
  const { 
    tutorSignup, 
    tutorEmailVerifyCode, 
    tutorVerifyEmail, 
    tutorPhoneVerifyCode, 
    tutorVerifyPhone,
    tutorQualifications,
    tutorUploadDocuments
  } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    emailCode: '',
    phoneCode: '',
    highestEducation: '',
    age: '',
    subjectsYouTeach: '',
    teachingLevel: '',
    hourlyRate: '',
    yearsOfExperience: '',
    location: '',
    certificateTitle: '',
    smsObserver: '',
    institutionIssuer: '',
    governmentId: null,
    educationalProof: null,
    profileImage: null,
    tellUsAboutYou: '',
    tellUsAboutYourLessons: '',
    explainYourTeachingMethods: ''
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\s/g, '');
    return cleanPhone.length >= 10;
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!validatePhone(formData.phoneNumber)) {
      setError('Please enter a valid phone number (at least 10 digits)');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!formData.confirmPassword) {
      setError('Please confirm your password');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

 // In TutorSignUp.jsx - Update the handleNext function for Step 1
const handleNext = async () => {
  setError('');
  setLoading(true);

  try {
    // Step 1: Initial Signup
    if (currentStep === 1) {
      if (!validateStep1()) {
        setLoading(false);
        return;
      }

      // Clean phone number
      const cleanPhoneNumber = formData.phoneNumber.replace(/\s/g, '');

      // Debug: Check all form fields
      console.log('🔍 Debug - Form data check:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: cleanPhoneNumber,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        passwordLength: formData.password.length,
        confirmPasswordLength: formData.confirmPassword?.length,
        passwordsMatch: formData.password === formData.confirmPassword
      });

      const signupPayload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phoneNumber: cleanPhoneNumber,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      console.log('📤 Step 1: Signing up tutor...');
      console.log('📦 Complete Payload:', JSON.stringify(signupPayload, null, 2));
      
      try {
        await tutorSignup(signupPayload);
        console.log('✅ Step 1: Signup successful');
        setCurrentStep(2);
      } catch (signupError) {
        console.error('❌ Signup failed with error:', signupError);
        
        // Check if it's a validation error
        if (signupError.message.includes('required fields')) {
          // Show specific field validation
          const missing = [];
          if (!formData.firstName.trim()) missing.push('First Name');
          if (!formData.lastName.trim()) missing.push('Last Name');
          if (!formData.email.trim()) missing.push('Email');
          if (!formData.phoneNumber.trim()) missing.push('Phone Number');
          if (!formData.password) missing.push('Password');
          if (!formData.confirmPassword) missing.push('Confirm Password');
          
          if (missing.length > 0) {
            setError(`Please fill in: ${missing.join(', ')}`);
          } else {
            setError(signupError.message);
          }
        } else {
          setError(signupError.message);
        }
        throw signupError;
      }
    }
         
      // Step 2: Request Email Verification Code
      else if (currentStep === 2) {
        console.log('📤 Step 2: Requesting email verification code...');
        await tutorEmailVerifyCode({ email: formData.email });
        console.log('✅ Step 2: Email code sent');
        setCurrentStep(3);
      }
      
      // Step 3: Verify Email Code
      else if (currentStep === 3) {
        if (!formData.emailCode.trim()) {
          setError('Please enter the verification code');
          setLoading(false);
          return;
        }
        
        // Parse OTP as integer
        const otp = parseInt(formData.emailCode);
        if (isNaN(otp)) {
          setError('Please enter a valid verification code (numbers only)');
          setLoading(false);
          return;
        }
        
        console.log('📤 Step 3: Verifying email code...');
        await tutorVerifyEmail({ otp: otp });
        console.log('✅ Step 3: Email verified');
        
        setSuccessMessage('Email Verified');
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          setCurrentStep(4);
        }, 2000);
      }
      
      // Step 4: Request Phone Verification Code
      else if (currentStep === 4) {
        console.log('📤 Step 4: Requesting phone verification code...');
        const cleanPhone = formData.phoneNumber.replace(/\s/g, '');
        await tutorPhoneVerifyCode({ phoneNumber: cleanPhone });
        console.log('✅ Step 4: Phone code sent');
        setCurrentStep(5);
      }
      
      // Step 5: Verify Phone Code
      else if (currentStep === 5) {
        if (!formData.phoneCode.trim()) {
          setError('Please enter the verification code');
          setLoading(false);
          return;
        }
        
        // Parse OTP as integer
        const otp = parseInt(formData.phoneCode);
        if (isNaN(otp)) {
          setError('Please enter a valid verification code (numbers only)');
          setLoading(false);
          return;
        }
        
        console.log('📤 Step 5: Verifying phone code...');
        await tutorVerifyPhone({ otp: otp });
        console.log('✅ Step 5: Phone verified');
        
        setSuccessMessage('Phone Number');
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          setCurrentStep(6);
        }, 2000);
      }
      
      // Step 6: Qualifications
      else if (currentStep === 6) {
        if (!formData.highestEducation || !formData.age || !formData.subjectsYouTeach || 
            !formData.teachingLevel || !formData.hourlyRate || !formData.yearsOfExperience || 
            !formData.location) {
          setError('Please fill in all required fields');
          setLoading(false);
          return;
        }
        
        // Validate numeric fields
        if (isNaN(parseInt(formData.age)) || parseInt(formData.age) < 18) {
          setError('Please enter a valid age (must be at least 18)');
          setLoading(false);
          return;
        }
        
        if (isNaN(parseInt(formData.hourlyRate)) || parseInt(formData.hourlyRate) <= 0) {
          setError('Please enter a valid hourly rate');
          setLoading(false);
          return;
        }
        
        if (isNaN(parseInt(formData.yearsOfExperience)) || parseInt(formData.yearsOfExperience) < 0) {
          setError('Please enter valid years of experience');
          setLoading(false);
          return;
        }
        
        console.log('📤 Step 6: Submitting qualifications...');
        
        const qualificationsPayload = {
          highestEducation: formData.highestEducation,
          age: parseInt(formData.age),
          subjects: formData.subjectsYouTeach,
          teachingLevels: formData.teachingLevel,
          hourlyRate: parseInt(formData.hourlyRate),
          yearsOfExperience: parseInt(formData.yearsOfExperience),
          location: formData.location
        };
        
        await tutorQualifications(qualificationsPayload);
        console.log('✅ Step 6: Qualifications saved');
        setCurrentStep(7);
      }
      
      // Step 7: Certificate Upload (Skip to Documents)
      else if (currentStep === 7) {
        console.log('📝 Step 7: Certificate details noted');
        setCurrentStep(8);
      }
      
      // Step 8: Document Upload
      else if (currentStep === 8) {
        if (!formData.governmentId || !formData.educationalProof || !formData.profileImage) {
          setError('Please upload all required documents');
          setLoading(false);
          return;
        }
        
        console.log('📤 Step 8: Uploading documents...');
        
        const documentFormData = new FormData();
        documentFormData.append('governmentId', formData.governmentId);
        documentFormData.append('educationProof', formData.educationalProof);
        documentFormData.append('profilePicture', formData.profileImage);
        
        // Add certificate details if provided
        if (formData.certificateTitle) {
          documentFormData.append('certificateTitle', formData.certificateTitle);
        }
        if (formData.smsObserver) {
          documentFormData.append('skillObtained', formData.smsObserver);
        }
        if (formData.institutionIssuer) {
          documentFormData.append('institutionIssuer', formData.institutionIssuer);
        }
        
        await tutorUploadDocuments(documentFormData);
        console.log('✅ Step 8: Documents uploaded');
        setCurrentStep(9);
      }
      
      // Step 9: About You
      else if (currentStep === 9) {
        if (!formData.tellUsAboutYou || !formData.tellUsAboutYourLessons || 
            !formData.explainYourTeachingMethods) {
          setError('Please complete all fields');
          setLoading(false);
          return;
        }
        console.log('✅ Step 9: About you information saved');
        setCurrentStep(10);
      }
      
      // Step 10: Agreement
      else if (currentStep === 10) {
        console.log('✅ Step 10: Agreement accepted');
        setCurrentStep(11);
      }
      
      // Step 11: Registration Complete
      else if (currentStep === 11) {
        console.log('✅ Step 11: Moving to review');
        setCurrentStep(12);
      }
      
      // Step 12: Account Under Review
      else if (currentStep === 12) {
        console.log('✅ Step 12: Proceeding to verification status');
        setCurrentStep(13);
      }
      
      // Step 13: All Verified
      else if (currentStep === 13) {
        console.log('✅ Step 13: Redirecting to dashboard');
        navigate('/tutor-dashboard');
      }

    } catch (err) {
      console.error('❌ Error in step', currentStep, ':', err);
      
      let errorMessage = 'An error occurred. Please try again.';
      
      if (err.response?.data) {
        if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep 
          formData={formData} 
          updateFormData={updateFormData}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
        />;
      case 2:
        return <EmailVerificationStep handleNext={handleNext} loading={loading} />;
      case 3:
        return <EmailCodeStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <PhoneVerificationStep handleNext={handleNext} loading={loading} />;
      case 5:
        return <PhoneCodeStep formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <QualificationsStep formData={formData} updateFormData={updateFormData} />;
      case 7:
        return <CertificateUploadStep formData={formData} updateFormData={updateFormData} />;
      case 8:
        return <DocumentUploadStep formData={formData} updateFormData={updateFormData} />;
      case 9:
        return <AboutYouStep formData={formData} updateFormData={updateFormData} />;
      case 10:
        return <AgreementFormStep />;
      case 11:
        return <RegistrationCompleteStep handleNext={handleNext} />;
      case 12:
        return <AccountUnderReviewStep />;
      case 13:
        return <AllVerifiedStep />;
      default:
        return null;
    }
  };

  const shouldShowBackButton = () => {
    return currentStep > 1 && currentStep !== 2 && currentStep !== 4 && 
           currentStep !== 11 && currentStep !== 12 && currentStep !== 13;
  };

  const shouldShowNextButton = () => {
    return currentStep !== 2 && currentStep !== 4 && currentStep !== 11 && 
           currentStep !== 12 && currentStep !== 13;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Tutor Application</h2>
          <button 
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {currentStep <= 10 && (
          <div className="flex justify-between items-center mb-8">
            <StepIndicator step={1} label="Personal Info" isActive={currentStep === 1} isCompleted={currentStep > 1} />
            <div className="flex-1 h-1 bg-gray-300 mx-2">
              <div className={`h-full ${currentStep > 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            </div>
            <StepIndicator step={2} label="Verification" isActive={currentStep >= 2 && currentStep <= 5} isCompleted={currentStep > 5} />
            <div className="flex-1 h-1 bg-gray-300 mx-2">
              <div className={`h-full ${currentStep > 6 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            </div>
            <StepIndicator step={3} label="Qualifications" isActive={currentStep >= 6 && currentStep <= 9} isCompleted={currentStep > 9} />
            <div className="flex-1 h-1 bg-gray-300 mx-2">
              <div className={`h-full ${currentStep > 10 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            </div>
            <StepIndicator step={4} label="Agreement" isActive={currentStep === 10} isCompleted={currentStep > 10} />
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="mb-8">
          {renderStepContent()}
        </div>

        <div className="flex justify-between">
          {shouldShowBackButton() && (
            <button
              onClick={handleBack}
              disabled={loading}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Back
            </button>
          )}
          {shouldShowNextButton() && (
            <button
              onClick={handleNext}
              disabled={loading}
              className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : currentStep === 13 ? 'Go to Dashboard' : 'Next'}
            </button>
          )}
        </div>
      </div>

      <SuccessModal 
        show={showSuccessModal}
        message={successMessage}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default TutorSignUp;