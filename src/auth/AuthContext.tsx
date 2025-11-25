// src/auth/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosError, AxiosInstance } from "axios";

/* ---------------------------
   Types
   --------------------------- */
type User = {
  id?: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  [key: string]: any;
};

type ApiResult<T = any> = Promise<T>;

export type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;

  // Student auth
  signUp: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    [key: string]: any;
  }) => ApiResult<any>;
  signupPage2: (data: Record<string, any>) => ApiResult<any>;

  submitEnrollment: (data: {
    studentId: string;
    schoolLevel: string;
    Age: string;
    subjects: string;
    preferredLessonType: string;
    location: string;
    struggles: string;
    [key: string]: any;
  }) => ApiResult<any>;

  login: (credentials: { email: string; password: string }) => ApiResult<any>;
  verifyEmail: (payload: { email: string; otp?: string }) => ApiResult<any>;
  forgotPassword: (email: string) => ApiResult<any>;
  resetPassword: (payload: {
    token: string;
    password: string;
  }) => ApiResult<any>;

  // Student actions
  bookSection: (data: Record<string, any>) => ApiResult<any>;
  comment: (data: Record<string, any>) => ApiResult<any>;
  studentDashboard: () => ApiResult<any>;
  getStudentProfile: (id: string) => ApiResult<any>;
  updatePassword: (
    id: string,
    data: { oldPassword: string; newPassword: string }
  ) => ApiResult<any>;
  getNotifications: (id: string) => ApiResult<any>;
  getCourses: () => ApiResult<any>;
  getLesson: (lessonId: string) => ApiResult<any>;
  bookClass: (data: Record<string, any>) => ApiResult<any>;

  // Tutor auth
  tutorSignup: (data: Record<string, any>) => ApiResult<any>;
  tutorEmailVerifyCode: (data: Record<string, any>) => ApiResult<any>;
  tutorVerifyEmail: (data: Record<string, any>) => ApiResult<any>;
  tutorPhoneVerifyCode: (data: Record<string, any>) => ApiResult<any>;
  tutorVerifyPhone: (data: Record<string, any>) => ApiResult<any>;
  tutorUploadDocuments: (form: FormData) => ApiResult<any>;
  tutorQualifications: (data: Record<string, any>) => ApiResult<any>;
  tutorVerifyDocuments: (data: Record<string, any>) => ApiResult<any>;

  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ---------------------------
   Hook
   --------------------------- */
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
};

/* ---------------------------
   Provider
   --------------------------- */
type AuthProviderProps = { children: React.ReactNode };

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // import.meta.env typing: cast to any if you don't have Vite types declared
  const API_BASE: string =
    ((import.meta as any).env?.VITE_API_BASE_URL as string) || "";

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("kynda_token") || null
  );
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("kynda_user");
    return raw ? (JSON.parse(raw) as User) : null;
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Axios instance
  const api: AxiosInstance = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  // Attach token automatically from state/localStorage
  api.interceptors.request.use(
    (config) => {
      const t = token ?? localStorage.getItem("kynda_token");
      if (t && config && config.headers) {
        config.headers.Authorization = `Bearer ${t}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  // Standardized error handler
  const handleAxiosError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      const ax = err as AxiosError;
      return ax.response?.data ?? { message: ax.message };
    }
    return { message: "An unknown error occurred" };
  };

  // ---------------------------
  // Student Auth
  // ---------------------------

  /**
   * Signup - Page 1 (no token required)
   * POST /api/students/signup/page1
   */
  // In your signUp function in AuthContext.tsx, add logging:
  // In your AuthContext.tsx, update the signUp function:
  // In your AuthContext.tsx, update the signUp function:

  const signUp = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    [key: string]: any;
  }) => {
    setLoading(true);
    try {
      console.log(
        "🔄 Making API call to:",
        `${API_BASE}/api/students/signup/page1`
      );
      console.log("📦 With data:", data);

      const res = await api.post("/api/students/signup/page1", data);

      console.log("✅ API Response status:", res.status);
      console.log("✅ API Response data:", res.data);

      const responseKeys = Object.keys(res.data);
      console.log("🔑 Response keys:", responseKeys);
      console.log("📋 Response values:", res.data);

      responseKeys.forEach((key) => {
        console.log(`   ${key}:`, res.data[key]);
      });

      const responseData = res.data;

      // Save the studentId from the response
      if (responseData.studentId) {
        console.log("💾 Saving student ID:", responseData.studentId);
        localStorage.setItem("kynda_student_id", responseData.studentId);

        // Also set it in user state
        setUser({
          id: responseData.studentId,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        });

        localStorage.setItem(
          "kynda_user",
          JSON.stringify({
            id: responseData.studentId,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          })
        );
      }

      return responseData;
    } catch (err: unknown) {
      console.error("❌ API Error:", err);
      throw handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };
  /**
   * Signup - Page 2 (token required)
   * POST /api/students/signup/page2
   * Backend expects Authorization: Bearer <token>
   */
  const signupPage2 = async (data: Record<string, any>) => {
    setLoading(true);
    try {
      console.log(
        "🚀 Submitting enrollment data to /api/students/signup/page2"
      );
      console.log("📦 Full enrollment data being sent:", data);

      // Log the exact request we're making
      console.log("🔍 Request details:", {
        url: `${API_BASE}/api/students/signup/page2`,
        method: "POST",
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kynda_token")}`,
          "Content-Type": "application/json",
        },
      });

      const res = await api.post("/api/students/signup/page2", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kynda_token")}`,
        },
      });

      console.log("✅ Enrollment response:", res.data);
      return res.data;
    } catch (err: unknown) {
      console.error("❌ Enrollment error details:");
      if (axios.isAxiosError(err)) {
        console.error("Status:", err.response?.status);
        console.error("Error data:", err.response?.data);
        console.error("Error message:", err.message);
      }
      throw handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }; // Add this to your AuthContext in AuthContext.tsx

  /**
   * Submit enrollment (signup page 2)
   * POST /api/students/signup/page2
   */
  const submitEnrollment = async (data: Record<string, any>) => {
    setLoading(true);
    try {
      const res = await api.post("/api/students/signup/page2", data, {
        headers: {
          Authorization: token
            ? `Bearer ${token}`
            : `Bearer ${localStorage.getItem("kynda_token")}`,
        },
      });
      return res.data;
    } catch (err: unknown) {
      throw handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login
   * POST /api/auth/login
   */
  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", credentials);
      const rToken = res.data?.token ?? null;
      const rUser = res.data?.user ?? null;

      if (rToken) {
        setToken(rToken);
        localStorage.setItem("kynda_token", rToken);
      }
      if (rUser) {
        setUser(rUser);
        localStorage.setItem("kynda_user", JSON.stringify(rUser));
      }
      return res.data;
    } catch (err: unknown) {
      throw handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verify email (OTP)
   * POST /api/auth/verify-email
   */
  const verifyEmail = async (payload: { email: string; otp?: string }) => {
    try {
      const res = await api.post("/api/auth/verify-email", payload);
      return res.data;
    } catch (err: unknown) {
      throw handleAxiosError(err);
    }
  };

  /**
   * Forgot password
   * POST /api/auth/forgot-password
   */
  const forgotPassword = async (email: string) => {
    try {
      const res = await api.post("/api/auth/forgot-password", { email });
      return res.data;
    } catch (err: unknown) {
      throw handleAxiosError(err);
    }
  };

  /**
   * Reset password
   * POST /api/auth/reset-password
   */
  const resetPassword = async (payload: {
    token: string;
    password: string;
  }) => {
    try {
      const res = await api.post("/api/auth/reset-password", payload);
      return res.data;
    } catch (err: unknown) {
      throw handleAxiosError(err);
    }
  };

  // ---------------------------
  // Student Actions
  // ---------------------------

  const bookSection = (data: Record<string, any>) =>
    api.post("/api/students/book-section", data);
  const comment = (data: Record<string, any>) =>
    api.post("/api/students/comment", data);
  const studentDashboard = () => api.get("/api/students/dashboard");
  const getStudentProfile = (id: string) =>
    api.get(`/api/students/profile/${id}`);
  const updatePassword = (
    id: string,
    data: { oldPassword: string; newPassword: string }
  ) => api.put(`/api/students/change-password/${id}`, data);
  const getNotifications = (id: string) =>
    api.get(`/api/students/notifications/${id}`);
  const getCourses = () => api.get("/api/students/get-courses");
  const getLesson = (lessonId: string) =>
    api.get(`/api/students/lesson/${lessonId}`);
  const bookClass = (data: Record<string, any>) =>
    api.post("/api/students/book-class", data);

  // ---------------------------
  // Tutor Auth & Flows
  // ---------------------------

  const tutorSignup = (data: Record<string, any>) =>
    api.post("/api/auth/tutor-signup", data);
  const tutorEmailVerifyCode = (data: Record<string, any>) =>
    api.post("/api/auth/tutor-email-verify-code", data);
  const tutorVerifyEmail = (data: Record<string, any>) =>
    api.post("/api/auth/tutor-verify-email", data);
  const tutorPhoneVerifyCode = (data: Record<string, any>) =>
    api.post("/api/auth/tutor-phone-verify-code", data);
  const tutorVerifyPhone = (data: Record<string, any>) =>
    api.post("/api/auth/tutor-verify-phone", data);

  const tutorUploadDocuments = (form: FormData) =>
    api.post("/api/auth/tutor-upload-documents", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

  const tutorQualifications = (data: Record<string, any>) =>
    api.post("/api/auth/tutor-qualifications", data, {
      headers: {
        Authorization: token
          ? `Bearer ${token}`
          : `Bearer ${localStorage.getItem("kynda_token")}`,
      },
    });

  const tutorVerifyDocuments = (data: Record<string, any>) =>
    api.post("/api/auth/tutor-verify-documents", data, {
      headers: {
        Authorization: token
          ? `Bearer ${token}`
          : `Bearer ${localStorage.getItem("kynda_token")}`,
      },
    });

  // ---------------------------
  // Logout
  // ---------------------------
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("kynda_token");
    localStorage.removeItem("kynda_user");
  };

  // Hydrate token on mount
  useEffect(() => {
    const stored = localStorage.getItem("kynda_token");
    if (stored) setToken(stored);

    // optional: hydrate user profile from server if endpoint exists
    // if (stored) {
    //   api.get('/api/students/profile/me').then(r => setUser(r.data)).catch(() => {});
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: AuthContextType = {
    user,
    token,
    loading,

    signUp,
    signupPage2,
    submitEnrollment,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword,

    bookSection,
    comment,
    studentDashboard,
    getStudentProfile,
    updatePassword,
    getNotifications,
    getCourses,
    getLesson,
    bookClass,

    tutorSignup,
    tutorEmailVerifyCode,
    tutorVerifyEmail,
    tutorPhoneVerifyCode,
    tutorVerifyPhone,
    tutorUploadDocuments,
    tutorQualifications,
    tutorVerifyDocuments,

    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

{
  /*import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../lib/api";

interface User {
  id?: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
    extraFields: any
  ) => Promise<any>;
  sendEmailVerification: (email: string) => Promise<any>;
  verifyOtp: (email: string, otp: string) => Promise<any>;
  submitEnrollment: (data: any) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("kynda_token")
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("kynda_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Save user + token
  const saveAuthData = (userData: User, userToken: string) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("kynda_user", JSON.stringify(userData));
    localStorage.setItem("kynda_token", userToken);
  };

  // ------------------ LOGIN ------------------
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      saveAuthData(res.data.user, res.data.token);
      return res.data;
    } catch (err: any) {
      throw err.response?.data || "Login error";
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------ SIGNUP ------------------
  const signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
    extraFields: any
  ) => {
    setIsLoading(true);
    try {
      const res = await API.post("/api/students/signup/page1", {
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
        ...extraFields,
      });

      saveAuthData(res.data.user, res.data.token);

      await sendEmailVerification(email);

      return res.data;
    } catch (err: any) {
      throw err.response?.data || "Signup error";
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------ EMAIL VERIFICATION ------------------
  const sendEmailVerification = async (email: string) => {
    try {
      return await API.post("/auth/send-verification-email", { email });
    } catch (err: any) {
      throw err.response?.data || "Error sending email";
    }
  };

  // ------------------ VERIFY OTP ------------------
  const verifyOtp = async (email: string, otp: string) => {
    try {
      return await API.post("/auth/verify-otp", { email, otp });
    } catch (err: any) {
      throw err.response?.data || "Invalid OTP";
    }
  };

  // ------------------ ENROLLMENT ------------------
  const submitEnrollment = async (data: any) => {
    try {
      return await API.post("/auth/enrollment", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err: any) {
      throw err.response?.data || "Enrollment submission failed";
    }
  };

  // ------------------ LOGOUT ------------------
  const logout = () => {
    setUser(null);a
    setToken(null);
    localStorage.removeItem("kynda_user");
    localStorage.removeItem("kynda_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        signUp,
        sendEmailVerification,
        verifyOtp,
        submitEnrollment,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🚨 The important export you were missing
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
};
*/
}
