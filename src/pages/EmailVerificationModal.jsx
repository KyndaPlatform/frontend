// EmailVerificationModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { Mail, CheckCircle, XCircle, Clock, X } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-60 animate-slide-in">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
          type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"
        } text-white`}
      >
        {type === "success" ? (
          <CheckCircle size={20} />
        ) : type === "error" ? (
          <XCircle size={20} />
        ) : (
          <Clock size={20} />
        )}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default function EmailVerificationModal({ isOpen, onClose, email, onSuccess }) {
  const { verifyEmail } = useAuth();
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  // Timer for resend button
  useEffect(() => {
    if (isOpen && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
  }, [resendTimer, isOpen]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", "", "", ""]);
      setError("");
      setResendTimer(60);
      setCanResend(false);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every(digit => digit !== "") && newOtp.join("").length === 6) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) {
      showToast("Please paste numbers only", "error");
      return;
    }

    const newOtp = pastedData.split("");
    while (newOtp.length < 6) newOtp.push("");
    setOtp(newOtp);

    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (code = otp.join("")) => {
    if (code.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await verifyEmail({ email, code });
      showToast("Email verified successfully!", "success");
      
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      const errorMessage = err?.message || "Invalid verification code. Please try again.";
      setError(errorMessage);
      showToast(errorMessage, "error");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setError("");
    
    try {
      await verifyEmail({ email });
      showToast("Verification code sent!", "success");
      setResendTimer(60);
      setCanResend(false);
    } catch (err) {
      const errorMessage = err?.message || "Failed to resend code. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    if (import.meta.env.DEV) {
      showToast("Verification skipped (dev mode)", "success");
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
        {/* Modal Content */}
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-scale-in">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            disabled={isLoading}
          >
            <X size={24} />
          </button>

          <div className="p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail size={40} className="text-blue-600" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Verify Your Email
              </h2>
              <p className="text-gray-600">We've sent a 6-digit code to</p>
              <p className="text-blue-600 font-semibold mt-1">{email}</p>
            </div>

            {/* OTP Input */}
            <div className="mb-6">
              <div className="flex gap-2 justify-center mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={isLoading}
                    className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                      error ? "border-red-500" : "border-gray-300"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>

            {/* Verify Button */}
            <button
              onClick={() => handleVerify()}
              disabled={isLoading || otp.some(digit => !digit)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Verify Email"
              )}
            </button>

            {/* Resend Code */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
              <button
                onClick={handleResend}
                disabled={!canResend || isLoading}
                className={`text-sm font-medium ${
                  canResend
                    ? "text-blue-600 hover:text-blue-800 hover:underline"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                {canResend ? "Resend Code" : `Resend in ${resendTimer}s`}
              </button>
            </div>

            {/* Development Skip Button */}
            {import.meta.env.DEV && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSkip}
                  className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Skip Verification (Dev Only)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}