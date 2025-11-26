import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowLeft, Shield } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleBackToLogin = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Back Button */}
          <button
            onClick={handleBackToLogin}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Login</span>
          </button>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-2xl">
                      <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Reset Your Password
                  </h1>
                  <p className="text-gray-600">
                    Enter your email address and we'll send you instructions to reset your password.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Instructions...</span>
                      </div>
                    ) : (
                      'Send Reset Instructions'
                    )}
                  </button>
                </form>

                {/* Additional Help */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-800 font-medium">Security Tip</p>
                      <p className="text-xs text-blue-700 mt-1">
                        We'll send a secure link to your email. The link will expire in 1 hour for your protection.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-green-100 p-4 rounded-2xl">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Check Your Email
                </h2>
                
                <p className="text-gray-600 mb-2">
                  We've sent password reset instructions to:
                </p>
                <p className="text-blue-600 font-semibold mb-6">{email}</p>
                
                <p className="text-gray-600 text-sm mb-8">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    try again
                  </button>
                </p>

                <div className="space-y-4">
                  <button
                    onClick={handleBackToLogin}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Back to Login
                  </button>
                  
                  <button
                    onClick={() => window.location.href = '/support'}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Links */}
          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              Need help?{' '}
              <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgetPassword;