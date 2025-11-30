// src/pages/TutorSignup.jsx - FIXED with Debug Logging
import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { Eye, EyeOff, ChevronLeft, Check, Upload, X } from 'lucide-react';
import StepIndicator from '../../components/tutor-signup/StepIndicator';
import SuccessModal from '../../components/tutor-signup/SuccessModal';
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

const TutorSignup = () => {
  const auth = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    
    // Step 2 - Email Verification
    emailCode: '',
    
    // Step 3 - Phone Verification
    phoneCode: '',
    
    // Step 4 - Qualifications
    highestEducation: '',
    age: '',
    subjectsYouTeach: '',
    teachingLevel: '',
    hourlyRate: '',
    yearsOfExperience: '',
    location: '',
    
    // Step 5 - Certificates
    certificateTitle: '',
    smsObserver: '',
    institutionIssuer: '',
    
    // Step 6 - Documents Upload
    governmentId: null,
    educationalProof: null,
    profileImage: null,
    
    // Step 7 - About You
    tellUsAboutYou: '',
    tellUsAboutYourLessons: '',
    explainYourTeachingMethods: ''
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errorMessage) setErrorMessage('');
  };

  const validateStep1 = () => {
    const errors = [];
    
    if (!formData.firstName.trim()) errors.push('First name is required');
    if (!formData.lastName.trim()) errors.push('Last name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.email.includes('@')) errors.push('Valid email is required');
    if (!formData.phoneNumber.trim()) errors.push('Phone number is required');
    if (!formData.password) errors.push('Password is required');
    if (formData.password.length < 6) errors.push('Password must be at least 6 characters');
    if (!formData.confirmPassword) errors.push('Confirm password is required');
    if (formData.password !== formData.confirmPassword) errors.push('Passwords do not match');
    
    return errors;
  };

  const handleNext = async () => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      // Step 1: Personal Info & Signup
      if (currentStep === 1) {
        console.log('📝 Step 1: Validating personal info...');
        
        // Validate
        const errors = validateStep1();
        if (errors.length > 0) {
          setErrorMessage(errors.join(', '));
          setLoading(false);
          return;
        }
        
        // Prepare payload
        const payload = {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phoneNumber: formData.phoneNumber.trim(),
          password: formData.password,
          confirmPassword: formData.confirmPassword
        };
        
        console.log('📤 Sending signup payload:', payload);
        
        const response = await auth.tutorSignup(payload);
        console.log('✅ Signup successful:', response);
        
      } 
      // Step 2: Send Email Verification Code
      else if (currentStep === 2) {
        console.log('📧 Step 2: Sending email verification code...');
        
        const payload = { 
          email: formData.email.trim().toLowerCase() 
        };
        
        console.log('📤 Sending email code payload:', payload);
        
        const response = await auth.tutorEmailVerifyCode(payload);
        console.log('✅ Email code sent:', response);
        
      } 
      // Step 3: Verify Email Code
      else if (currentStep === 3) {
        console.log('🔐 Step 3: Verifying email code...');
        
        if (!formData.emailCode.trim()) {
          setErrorMessage('Please enter the verification code');
          setLoading(false);
          return;
        }
        
        const payload = { 
          email: formData.email.trim().toLowerCase(), 
          code: formData.emailCode.trim() 
        };
        
        console.log('📤 Sending email verification payload:', payload);
        
        const response = await auth.tutorVerifyEmail(payload);
        console.log('✅ Email verified:', response);
        
        setShowSuccessModal(true);
        setSuccessMessage('Email Verified');
        setTimeout(() => {
          setShowSuccessModal(false);
          setCurrentStep(5);
          setLoading(false);
        }, 2000);
        return;
        
      } 
      // Step 5: Send Phone Verification Code
      else if (currentStep === 5) {
        console.log('📱 Step 5: Sending phone verification code...');
        
        const payload = { 
          phoneNumber: formData.phoneNumber.trim() 
        };
        
        console.log('📤 Sending phone code payload:', payload);
        
        const response = await auth.tutorPhoneVerifyCode(payload);
        console.log('✅ Phone code sent:', response);
        
      } 
      // Step 6: Verify Phone Code
      else if (currentStep === 6) {
        console.log('🔐 Step 6: Verifying phone code...');
        
        if (!formData.phoneCode.trim()) {
          setErrorMessage('Please enter the verification code');
          setLoading(false);
          return;
        }
        
        const payload = { 
          phoneNumber: formData.phoneNumber.trim(), 
          code: formData.phoneCode.trim() 
        };
        
        console.log('📤 Sending phone verification payload:', payload);
        
        const response = await auth.tutorVerifyPhone(payload);
        console.log('✅ Phone verified:', response);
        
        setShowSuccessModal(true);
        setSuccessMessage('Phone Number Verified');
        setTimeout(() => {
          setShowSuccessModal(false);
          setCurrentStep(7);
          setLoading(false);
        }, 2000);
        return;
        
      } 
      // Step 7: Qualifications
      else if (currentStep === 7) {
        console.log('🎓 Step 7: Submitting qualifications...');
        
        const payload = {
          highestEducation: formData.highestEducation,
          age: formData.age,
          subjectsYouTeach: formData.subjectsYouTeach,
          teachingLevel: formData.teachingLevel,
          hourlyRate: formData.hourlyRate,
          yearsOfExperience: formData.yearsOfExperience,
          location: formData.location
        };
        
        console.log('📤 Sending qualifications payload:', payload);
        
        const response = await auth.tutorQualifications(payload);
        console.log('✅ Qualifications saved:', response);
        
      } 
      // Step 8: Certificate Info (just move to next)
      else if (currentStep === 8) {
        console.log('📜 Step 8: Certificate info collected, moving to uploads...');
      }
      // Steps 9-10: Document Uploads
      else if (currentStep === 9 || currentStep === 10) {
        console.log('📤 Step 9/10: Uploading documents...');
        
        const formDataToSend = new FormData();
        
        // Only append files that exist
        if (formData.governmentId) {
          formDataToSend.append('governmentId', formData.governmentId);
          console.log('📎 Appending governmentId:', formData.governmentId.name);
        }
        if (formData.educationalProof) {
          formDataToSend.append('educationalProof', formData.educationalProof);
          console.log('📎 Appending educationalProof:', formData.educationalProof.name);
        }
        if (formData.profileImage) {
          formDataToSend.append('profileImage', formData.profileImage);
          console.log('📎 Appending profileImage:', formData.profileImage.name);
        }
        
        // Only upload if there are files
        if (formDataToSend.has('governmentId') || 
            formDataToSend.has('educationalProof') || 
            formDataToSend.has('profileImage')) {
          
          console.log('📤 Uploading documents...');
          const response = await auth.tutorUploadDocuments(formDataToSend);
          console.log('✅ Documents uploaded:', response);
        } else {
          console.log('⚠️ No documents to upload, skipping...');
        }
        
      } 
      // Step 11: About You & Final Submission
      else if (currentStep === 11) {
        console.log('📝 Step 11: Final submission...');
        
        const payload = {
          tellUsAboutYou: formData.tellUsAboutYou,
          tellUsAboutYourLessons: formData.tellUsAboutYourLessons,
          explainYourTeachingMethods: formData.explainYourTeachingMethods
        };
        
        console.log('📤 Sending final submission:', payload);
        
        const response = await auth.tutorVerifyDocuments(payload);
        console.log('✅ Final submission successful:', response);
        
        setCurrentStep(13);
        setLoading(false);
        return;
        
      } 
      // Steps 13-14: Registration Complete
      else if (currentStep === 13 || currentStep === 14) {
        console.log('✅ Moving to review screen...');
        setCurrentStep(15);
        setLoading(false);
        return;
      }
      
      // Move to next step
      setCurrentStep(prev => prev + 1);
      
    } catch (error) {
      console.error('❌ Error in step', currentStep, ':', error);
      
      // Extract error message
      let errorMsg = 'An error occurred';
      
      if (error.response) {
        console.error('📥 Error response:', error.response.data);
        errorMsg = error.response.data?.message || error.response.data?.error || errorMsg;
      } else if (error.message) {
        errorMsg = error.message;
      }
      
      setErrorMessage(errorMsg);
      
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 5) {
      setCurrentStep(2);
    } else if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
    // Clear errors when going back
    setErrorMessage('');
  };

  const getStepInfo = () => {
    const steps = [
      { step: 1, label: 'Personal Info', range: [1] },
      { step: 2, label: 'Verification', range: [2, 3, 4, 5, 6] },
      { step: 3, label: 'Qualifications', range: [7] },
      { step: 4, label: 'Certificates', range: [8, 9, 10] },
      { step: 5, label: 'Complete', range: [11, 12, 13, 14, 15, 16] }
    ];

    return steps.map(s => ({
      ...s,
      isActive: s.range.includes(currentStep),
      isCompleted: currentStep > Math.max(...s.range)
    }));
  };

  const renderStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      showPassword,
      setShowPassword,
      showConfirmPassword,
      setShowConfirmPassword,
      handleNext,
      loading
    };

    switch (currentStep) {
      case 1: return <PersonalInfoStep {...stepProps} />;
      case 2: return <EmailVerificationStep {...stepProps} />;
      case 3: return <EmailCodeStep {...stepProps} />;
      case 5: return <PhoneVerificationStep {...stepProps} />;
      case 6: return <PhoneCodeStep {...stepProps} />;
      case 7: return <QualificationsStep {...stepProps} />;
      case 8: return <CertificateUploadStep {...stepProps} />;
      case 9: 
      case 10: return <DocumentUploadStep {...stepProps} />;
      case 11: return <AboutYouStep {...stepProps} />;
      case 12: return <AgreementFormStep />;
      case 13: 
      case 14: return <RegistrationCompleteStep handleNext={handleNext} />;
      case 15: return <AccountUnderReviewStep />;
      case 16: return <AllVerifiedStep />;
      default: return <PersonalInfoStep {...stepProps} />;
    }
  };

  const showStepIndicators = ![3, 4, 6, 12, 13, 14, 15, 16].includes(currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      {/* Success Modal */}
      <SuccessModal 
        show={showSuccessModal}
        message={successMessage}
        onClose={() => setShowSuccessModal(false)}
      />

      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img
                src="../../../public/images/Vector (1).png"
                alt="Kynda Logo"
                className="w-10 h-10"
              />
            <span className="text-2xl font-bold text-gray-800">KYNDA</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Kynda</h1>
          <p className="text-sm text-gray-600">Create a tutor's account to get started</p>
        </div>

        {/* Step Indicators */}
        {showStepIndicators && (
          <div className="flex justify-between mb-8 max-w-md mx-auto">
            {getStepInfo().map((step, idx) => (
              <React.Fragment key={step.step}>
                <StepIndicator {...step} />
                {idx < getStepInfo().length - 1 && (
                  <div className="flex-1 flex items-center px-2">
                    <div className={`h-0.5 flex-1 ${step.isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          {renderStep()}

          {/* Navigation Buttons */}
          <div className="mt-8 flex gap-4">
            {currentStep > 1 && ![4, 12, 13, 14, 15, 16].includes(currentStep) && (
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
            )}
            
            {![2, 3, 4, 5, 6, 15, 16].includes(currentStep) && (
              <button
                onClick={handleNext}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Processing...' : currentStep === 12 ? 'Create Account' : currentStep >= 13 ? 'Next' : 'Next'}
                {!loading && <span>→</span>}
              </button>
            )}

            {currentStep === 3 && (
              <button
                onClick={handleNext}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Proceed'}
              </button>
            )}

            {currentStep === 6 && (
              <button
                onClick={handleNext}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Proceed'}
              </button>
            )}
          </div>

          {/* Sign in link */}
          {currentStep === 1 && (
            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{' '}
              <a href="/tutor-login" className="text-blue-600 font-medium hover:underline">
                Sign In
              </a>
            </p>
          )}

          {/* Google Sign up */}
          {currentStep === 1 && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">OR</span>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-gray-700 font-medium">Sign up with Google</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorSignup;