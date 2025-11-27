// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Onboarding from "./pages/Onboarding";
import ConnectWallet from "./pages/ConnectWallet";
import ConnectAccount from "./pages/ConnectAccount";
import StudentSignUp from "./pages/Student/StudentSignUp";
import TutorSignUp from "./pages/Tutor/TutorSignUp";
import Login from "./pages/Student/Login";
import EnrollmentDetails1 from "./pages/EnrollmentDetails1";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Features from "./pages/Features";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TeachOnKynda from "./pages/TeachOnKynda";
import DashBoard from "./pages/Student/DashBoard";
import TutorLogin from "./pages/Tutor/TutorLogin";
import TutorDashboard from "./pages/Tutor/TutorDashboard";
import ForgetPassword from "./pages/ForgetPassword";
import TermsAndCondition from "./pages/TermsAndCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import LearningHub from "./pages/LearningHub";
import ExamPrepGuides from "./pages/ExamPrepGuides";
import ContractTerms from "./pages/ContractTerms";
import TutorPolicy from "./pages/Tutor/TutorPolicy";
import TutorResources from "./pages/Tutor/TutorResources";
import EmailVerificationModal from "./pages/EmailVerificationModal";
import FAQs from "./pages/FAQs";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route path="/connect-account" element={<ConnectAccount />} />
          <Route path="/student-signup" element={<StudentSignUp />} />
          <Route path="/tutor-signup" element={<TutorSignUp />} />
          <Route path="/tutor-login" element={<TutorLogin />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/teach-on-kynda" element={<TeachOnKynda />} />
          <Route path="/enrollment-details1" element={<EnrollmentDetails1 />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/learning-hub" element={<LearningHub />} />
          <Route path="/exam-prep-guides" element={<ExamPrepGuides />} />
          <Route path="/contract-terms" element={<ContractTerms />} />
          <Route path="/tutor-policy" element={<TutorPolicy />} />
          <Route path="/tutor-resources" element={<TutorResources />} />
          <Route path="/verify-email" element={<EmailVerificationModal />} />
          <Route path="/faqs" element={<FAQs />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tutor-dashboard"
            element={
              <ProtectedRoute>
                <TutorDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}