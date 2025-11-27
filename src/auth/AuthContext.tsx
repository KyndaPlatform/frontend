// src/auth/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import axios, { AxiosError, AxiosInstance } from "axios";

/* ---------------------------
   Types
   --------------------------- */
type User = {
  id?: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  isEmailVerified?: boolean;
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
  verifyEmail: (payload: { email: string; code?: string }) => ApiResult<any>;
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
  const API_BASE: string =
    ((import.meta as any).env?.VITE_API_BASE_URL as string) || "";

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Optimized axios instance creation
  const api: AxiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: API_BASE,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      timeout: 10000, // 10 second timeout
    });

    // Add request interceptor
    instance.interceptors.request.use(
      (config) => {
        const t = token ?? localStorage.getItem("kynda_token");
        if (t && config.headers) {
          config.headers.Authorization = `Bearer ${t}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    return instance;
  }, [API_BASE, token]);

  // Standardized error handler
  const handleAxiosError = useCallback((err: unknown) => {
    if (axios.isAxiosError(err)) {
      const ax = err as AxiosError;
      console.error("API Error:", {
        status: ax.response?.status,
        data: ax.response?.data,
        message: ax.message,
      });

      // Return user-friendly error message
      if (ax.response?.data) {
        return ax.response.data;
      }
      return {
        message:
          ax.code === "ECONNABORTED"
            ? "Request timeout. Please try again."
            : "Network error. Please check your connection.",
      };
    }
    return { message: "An unexpected error occurred" };
  }, []);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem("kynda_token");
        const storedUser = localStorage.getItem("kynda_user");

        if (storedToken) {
          setToken(storedToken);
        }

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Clear corrupted data
        localStorage.removeItem("kynda_token");
        localStorage.removeItem("kynda_user");
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // ---------------------------
  // Student Auth - OPTIMIZED
  // ---------------------------

  const signUp = useCallback(
    async (data: {
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
        console.log("🔄 Making API call to signup");
        const res = await api.post("/api/students/signup/page1", data);

        console.log("✅ Signup response:", res.data);

        // Save the studentId from the response
        if (res.data.studentId) {
          localStorage.setItem("kynda_student_id", res.data.studentId);

          const userData = {
            id: res.data.studentId,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          };

          setUser(userData);
          localStorage.setItem("kynda_user", JSON.stringify(userData));
        }

        return res.data;
      } catch (err: unknown) {
        console.error("❌ Signup error:", err);
        throw handleAxiosError(err);
      } finally {
        setLoading(false);
      }
    },
    [api, handleAxiosError]
  );

  const signupPage2 = useCallback(
    async (data: Record<string, any>) => {
      setLoading(true);
      try {
        console.log("🚀 Submitting enrollment data");
        const res = await api.post("/api/students/signup/page2", data);
        console.log("✅ Enrollment response:", res.data);
        return res.data;
      } catch (err: unknown) {
        console.error("❌ Enrollment error:", err);
        throw handleAxiosError(err);
      } finally {
        setLoading(false);
      }
    },
    [api, handleAxiosError]
  );

  const submitEnrollment = useCallback(
    async (data: Record<string, any>) => {
      setLoading(true);
      try {
        const res = await api.post("/api/students/signup/page2", data);
        return res.data;
      } catch (err: unknown) {
        throw handleAxiosError(err);
      } finally {
        setLoading(false);
      }
    },
    [api, handleAxiosError]
  );

  /**
   * Login - OPTIMIZED with better error handling
   */
  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      setLoading(true);
      try {
        console.log("🔐 Attempting login...");

        const res = await api.post("/api/auth/login", credentials);
        console.log("✅ Login response received:", res.data);

        const responseData = res.data;
        const rToken =
          responseData?.token ||
          responseData?.access_token ||
          responseData?.data?.token;
        const rUser = responseData?.user || responseData?.data?.user;

        if (!rToken) {
          console.error("❌ No token in response:", responseData);
          throw new Error("Authentication failed: No token received");
        }

        if (!rUser) {
          console.error("❌ No user data in response:", responseData);
          throw new Error("Authentication failed: No user data received");
        }

        // Set auth state
        setToken(rToken);
        setUser(rUser);

        // Store in localStorage
        localStorage.setItem("kynda_token", rToken);
        localStorage.setItem("kynda_user", JSON.stringify(rUser));

        console.log("✅ Login successful, user:", rUser);
        return responseData;
      } catch (err: unknown) {
        console.error("❌ Login failed:", err);

        // Clear any potentially corrupted state
        setToken(null);
        setUser(null);
        localStorage.removeItem("kynda_token");
        localStorage.removeItem("kynda_user");

        throw handleAxiosError(err);
      } finally {
        setLoading(false);
      }
    },
    [api, handleAxiosError]
  );

  /**
   * Verify email (OTP)
   */
  const verifyEmail = useCallback(
    async (payload: { email: string; code?: string }) => {
      try {
        const res = await api.post("/api/auth/verify-email", payload);
        return res.data;
      } catch (err: unknown) {
        throw handleAxiosError(err);
      }
    },
    [api, handleAxiosError]
  );

  /**
   * Forgot password
   */
  const forgotPassword = useCallback(
    async (email: string) => {
      try {
        const res = await api.post("/api/auth/forgot-password", { email });
        return res.data;
      } catch (err: unknown) {
        throw handleAxiosError(err);
      }
    },
    [api, handleAxiosError]
  );

  /**
   * Reset password
   */
  const resetPassword = useCallback(
    async (payload: { token: string; password: string }) => {
      try {
        const res = await api.post("/api/auth/reset-password", payload);
        return res.data;
      } catch (err: unknown) {
        throw handleAxiosError(err);
      }
    },
    [api, handleAxiosError]
  );

  // ---------------------------
  // Student Actions - OPTIMIZED
  // ---------------------------

  const bookSection = useCallback(
    (data: Record<string, any>) => api.post("/api/students/book-section", data),
    [api]
  );

  const comment = useCallback(
    (data: Record<string, any>) => api.post("/api/students/comment", data),
    [api]
  );

  const studentDashboard = useCallback(
    () => api.get("/api/students/dashboard"),
    [api]
  );

  const getStudentProfile = useCallback(
    (id: string) => api.get(`/api/students/profile/${id}`),
    [api]
  );

  const updatePassword = useCallback(
    (id: string, data: { oldPassword: string; newPassword: string }) =>
      api.put(`/api/students/change-password/${id}`, data),
    [api]
  );

  const getNotifications = useCallback(
    (id: string) => api.get(`/api/students/notifications/${id}`),
    [api]
  );

  const getCourses = useCallback(
    () => api.get("/api/students/get-courses"),
    [api]
  );

  const getLesson = useCallback(
    (lessonId: string) => api.get(`/api/students/lesson/${lessonId}`),
    [api]
  );

  const bookClass = useCallback(
    (data: Record<string, any>) => api.post("/api/students/book-class", data),
    [api]
  );

  // ---------------------------
  // Tutor Auth & Flows - OPTIMIZED
  // ---------------------------

  const tutorSignup = useCallback(
    (data: Record<string, any>) => api.post("/api/auth/tutor-signup", data),
    [api]
  );

  const tutorEmailVerifyCode = useCallback(
    (data: Record<string, any>) =>
      api.post("/api/auth/tutor-email-verify-code", data),
    [api]
  );

  const tutorVerifyEmail = useCallback(
    (data: Record<string, any>) =>
      api.post("/api/auth/tutor-verify-email", data),
    [api]
  );

  const tutorPhoneVerifyCode = useCallback(
    (data: Record<string, any>) =>
      api.post("/api/auth/tutor-phone-verify-code", data),
    [api]
  );

  const tutorVerifyPhone = useCallback(
    (data: Record<string, any>) =>
      api.post("/api/auth/tutor-verify-phone", data),
    [api]
  );

  const tutorUploadDocuments = useCallback(
    (form: FormData) =>
      api.post("/api/auth/tutor-upload-documents", form, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    [api]
  );

  const tutorQualifications = useCallback(
    (data: Record<string, any>) =>
      api.post("/api/auth/tutor-qualifications", data),
    [api]
  );

  const tutorVerifyDocuments = useCallback(
    (data: Record<string, any>) =>
      api.post("/api/auth/tutor-verify-documents", data),
    [api]
  );

  // ---------------------------
  // Logout
  // ---------------------------
  const logout = useCallback(() => {
    console.log("🚪 Logging out...");
    setToken(null);
    setUser(null);
    localStorage.removeItem("kynda_token");
    localStorage.removeItem("kynda_user");
    localStorage.removeItem("kynda_student_id");
  }, []);

  // Memoized context value to prevent unnecessary re-renders
  const value: AuthContextType = useMemo(
    () => ({
      user,
      token,
      loading: loading || !isInitialized, // Show loading until initialized

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
    }),
    [
      user,
      token,
      loading,
      isInitialized,
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
    ]
  );

  // Show loading until auth is initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
