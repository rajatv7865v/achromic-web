"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  CreditCard,
  Eye,
  EyeOff,
  Building2,
  Briefcase,
} from "lucide-react";
import { DocumentChartBarIcon } from "@heroicons/react/20/solid";
import { signup, login, SignupData } from "@/services/auth";
import { useAuth } from "@/contexts/AuthContext";
import { createOrder, OrderData } from "@/services/order";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  currency: string
 
}

type ViewType = "login" | "signup" | "forgot-password" | "checkout";

export default function CheckoutModal({
  isOpen,
  onClose,
  totalAmount,
  currency
}: CheckoutModalProps) {
  const { user, token, isLoggedIn, login: authLogin, logout } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSignupConfirmModal, setShowSignupConfirmModal] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signupUserData, setSignupUserData] = useState<any>(null);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Set initial view based on login status
  useEffect(() => {
    if (isOpen && isLoggedIn && user) {
      // Auto-fill checkout form if user is logged in
      setCheckoutForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
        country: user.country || "",
        company: user.company || "",
        designation: user.designation || "",
        gst: "",
      });
      setCurrentView("checkout");
    } else if (isOpen && !isLoggedIn) {
      setCurrentView("login");
    }
  }, [isOpen, isLoggedIn, user]);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Forgot password form state
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: "",
  });

  // Checkout form state
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    company: "",
    designation: "",
    gst: "",
  });

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const response = await login(loginForm.email, loginForm.password);
      console.log("User data:", response.data.data);
      if (response.status) {
        // Store token if provided
        const authToken = response.data.token;
        const userData = response.data.data || {
          firstName: "",
          lastName: "",
          email: loginForm.email,
          phoneNumber: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          company: "",
          designation: "",
        };

        // Use auth context to login
        authLogin(userData, authToken);

        // Auto-fill checkout form with user details
        if (response.data.data) {
          const user = response.data.data;
          setCheckoutForm({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phoneNumber || "",
            address: user.address || "",
            city: user.city || "",
            state: user.state || "",
            zipCode: user.zipCode || "",
            country: user.country || "",
            company: user.company || "",
            designation: user.designation || "",
            gst: "",
          });
        }

        setCurrentView("checkout");

        // Reset login form
        setLoginForm({
          email: "",
          password: "",
        });
      } else {
        setLoginError(
          response.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setLoginError(
        error.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);

    // Validate password match
    if (signupForm.password !== signupForm.confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    setSignupLoading(true);

    const signupData: SignupData = {
      firstName: signupForm.firstName,
      lastName: signupForm.lastName,
      email: signupForm.email,
      phoneNumber: signupForm.phone,
      password: signupForm.password,
      confirmPassword: signupForm.confirmPassword,
    };

    try {
      const response = await signup(signupData);

      if (response.status) {
        // Store user data for potential auto-fill
        setSignupUserData({
          firstName: signupForm.firstName,
          lastName: signupForm.lastName,
          email: signupForm.email,
          phone: signupForm.phone,
        });

        // Show confirmation modal
        setShowSignupConfirmModal(true);
        // Reset form
        setSignupForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setSignupError(response.message || "Signup failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      setSignupError(
        error.response?.data?.message ||
          "An error occurred during signup. Please try again."
      );
    } finally {
      setSignupLoading(false);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement forgot password logic
    console.log("Forgot Password:", forgotPasswordForm);
    alert("Password reset link has been sent to your email!");
    setCurrentView("login");
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement checkout logic
    console.log("Checkout:", checkoutForm);

    // Clear the checkout form after submission
    setCheckoutForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      company: "",
      designation: "",
      gst: "",
    });
  };

  const handlePayU = async () => {
    // TODO: Implement PayU payment
    if (
      !checkoutForm.address ||
      !checkoutForm.city ||
      !checkoutForm.state ||
      !checkoutForm.zipCode ||
      !checkoutForm.country
    ) {
      setPaymentError("Please fill all the address details");
      return;
    }
    setPaymentError(null);
    setPaymentLoading(true);
    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData: OrderData = {
        firstName: checkoutForm.firstName,
        lastName: checkoutForm.lastName,
        email: checkoutForm.email,
        phoneNumber: checkoutForm.phone,
        company: checkoutForm.company,
        designation: checkoutForm.designation,
        billingAddress: {
          streetAddress: checkoutForm.address,
          city: checkoutForm.city,
          state: checkoutForm.state,
          zipCode: checkoutForm.zipCode,
          country: checkoutForm.country,
        },
        gstIN: checkoutForm.gst,
        currency: currency || "INR", // Default to INR for PayU
        paymentMethod: "payu",
        totalAmount: totalAmount,
      };

      const response = await createOrder(orderData);

      if (response.status) {
        // If order creation is successful, redirect to PayU
        console.log("Order created successfully:", response);

        // Extract approval URL from response
        const approvalUrl = response.data?.data?.payment?.paymentUrl;

        if (approvalUrl) {
          // Redirect to PayU approval URL
          window.open(approvalUrl, "_blank", "noopener,noreferrer");

          // Clear the checkout form after successful payment initiation
          setCheckoutForm({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            company: "",
            designation: "",
            gst: "",
          });
        } else {
          setPaymentError("Approval URL not found in response");
        }
      } else {
        setPaymentError(response.message || "Order creation failed");
      }
    } catch (error: any) {
      console.error("PayU payment error:", error);
      setPaymentError(
        error.response?.data?.message ||
          "An error occurred during payment processing"
      );
    } finally {
      setPaymentLoading(false);
      setIsProcessing(false);
    }
  };

  const handlePayPal = async () => {
    if (
      !checkoutForm.address ||
      !checkoutForm.city ||
      !checkoutForm.state ||
      !checkoutForm.zipCode ||
      !checkoutForm.country
    ) {
      setPaymentError("Please fill all the address details");
      return;
    }
    setPaymentError(null);
    setPaymentLoading(true);
    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData: OrderData = {
        firstName: checkoutForm.firstName,
        lastName: checkoutForm.lastName,
        email: checkoutForm.email,
        phoneNumber: checkoutForm.phone,
        company: checkoutForm.company,
        designation: checkoutForm.designation,
        billingAddress: {
          streetAddress: checkoutForm.address,
          city: checkoutForm.city,
          state: checkoutForm.state,
          zipCode: checkoutForm.zipCode,
          country: checkoutForm.country,
        },
        gstIN: checkoutForm.gst,
        currency: "USD", // Default to USD for PayPal
        paymentMethod: "paypal",
        totalAmount: totalAmount,
      };

      const response = await createOrder(orderData);

      if (response.status) {
        // If order creation is successful, redirect to PayPal
        console.log("Order created successfully:", response);

        // Extract approval URL from response
        const approvalUrl = response.data?.data?.payment?.approvalUrl;

        if (approvalUrl) {
          // Redirect to PayPal approval URL
          window.open(approvalUrl, "_blank", "noopener,noreferrer");

          // Clear the checkout form after successful payment initiation
          setCheckoutForm({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            company: "",
            designation: "",
            gst: "",
          });
        } else {
          setPaymentError("Approval URL not found in response");
        }
      } else {
        setPaymentError(response.message || "Order creation failed");
      }
    } catch (error: any) {
      console.error("PayPal payment error:", error);
      setPaymentError(
        error.response?.data?.message ||
          "An error occurred during payment processing"
      );
    } finally {
      setPaymentLoading(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`bg-white rounded-3xl shadow-2xl w-full ${
            currentView === "login" || currentView === "forgot-password"
              ? "max-w-md min-w-[400px] sm:min-w-[450px]"
              : currentView === "signup"
              ? "max-w-2xl"
              : "max-w-3xl"
          } max-h-[95vh] overflow-hidden flex flex-col pointer-events-auto transform transition-all animate-slide-in`}
        >
          {/* Header */}
          <div className="bg-[#2b8ffb] text-white p-6 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                {currentView === "login" && <Lock className="w-6 h-6" />}
                {currentView === "signup" && <User className="w-6 h-6" />}
                {currentView === "forgot-password" && (
                  <Mail className="w-6 h-6" />
                )}
                {currentView === "checkout" && (
                  <CreditCard className="w-6 h-6" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {currentView === "login" && "Welcome Back"}
                  {currentView === "signup" && "Create Account"}
                  {currentView === "forgot-password" && "Reset Password"}
                  {currentView === "checkout" && "Complete Checkout"}
                </h2>
                {currentView === "checkout" && (
                  <p className="text-sm text-white/90 mt-1 font-medium">
                    Total Amount: {currency == "INR" ? "₹" : "$"}{totalAmount.toLocaleString()}
                  </p>
                )}
                {currentView !== "checkout" && (
                  <p className="text-sm text-white/80 mt-1">
                    {currentView === "login" && "Sign in to continue"}
                    {currentView === "signup" && "Join us today"}
                    {currentView === "forgot-password" &&
                      "We'll help you reset it"}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-xl transition-all hover:rotate-90"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-gray-50 to-white">
            {/* Login View */}
            {currentView === "login" && (
              <form
                onSubmit={handleLogin}
                className="max-w-md w-full mx-auto space-y-6"
              >
                {/* Error Message */}
                {loginError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-800 font-medium">
                      ❌ {loginError}
                    </p>
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                      </div>
                      <input
                        type="email"
                        required
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, email: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-14 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#2b8ffb] transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentView("forgot-password")}
                    className="text-sm font-medium text-[#2b8ffb] hover:text-[#2b8ffb]/80 hover:underline transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
                    loginLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white hover:from-[#2b8ffb]/95 hover:to-[#6c7cae]/95"
                  }`}
                >
                  {loginLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-white">Signing In...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gradient-to-b from-gray-50 to-white text-gray-500">
                      or
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setCurrentView("signup")}
                      className="font-semibold text-[#2b8ffb] hover:text-[#2b8ffb]/80 hover:underline transition-colors"
                    >
                      Create Account
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* Signup View */}
            {currentView === "signup" && (
              <form
                onSubmit={handleSignup}
                className="max-w-2xl mx-auto space-y-6"
              >
                {/* Error Message */}
                {signupError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-800 font-medium">
                      ❌ {signupError}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                      First Name
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <User className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                      </div>
                      <input
                        type="text"
                        required
                        value={signupForm.firstName}
                        onChange={(e) =>
                          setSignupForm({
                            ...signupForm,
                            firstName: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                      Last Name
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <User className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                      </div>
                      <input
                        type="text"
                        required
                        value={signupForm.lastName}
                        onChange={(e) =>
                          setSignupForm({
                            ...signupForm,
                            lastName: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                    </div>
                    <input
                      type="email"
                      required
                      value={signupForm.email}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, email: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Phone className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={signupForm.phone}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, phone: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                      placeholder="Enter your phone"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={signupForm.password}
                        onChange={(e) =>
                          setSignupForm({
                            ...signupForm,
                            password: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-14 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                        placeholder="Create password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#2b8ffb] transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={signupForm.confirmPassword}
                        onChange={(e) =>
                          setSignupForm({
                            ...signupForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-14 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                        placeholder="Confirm password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#2b8ffb] transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={signupLoading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
                    signupLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white hover:from-[#2b8ffb]/95 hover:to-[#6c7cae]/95"
                  }`}
                >
                  {signupLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-white">Creating Account...</span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setCurrentView("login")}
                      className="font-semibold text-[#2b8ffb] hover:text-[#2b8ffb]/80 hover:underline transition-colors"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* Forgot Password View */}
            {currentView === "forgot-password" && (
              <form
                onSubmit={handleForgotPassword}
                className="max-w-md w-full mx-auto space-y-6"
              >
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-2">
                  <p className="text-sm text-blue-800">
                    Enter your email address and we'll send you a link to reset
                    your password.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                    </div>
                    <input
                      type="email"
                      required
                      value={forgotPasswordForm.email}
                      onChange={(e) =>
                        setForgotPasswordForm({
                          ...forgotPasswordForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white py-4 px-6 rounded-xl font-semibold hover:from-[#2b8ffb]/95 hover:to-[#6c7cae]/95 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send Reset Link
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setCurrentView("login")}
                    className="text-sm font-semibold text-[#2b8ffb] hover:text-[#2b8ffb]/80 hover:underline transition-colors"
                  >
                    ← Back to Login
                  </button>
                </div>
              </form>
            )}

            {/* Checkout View */}
            {currentView === "checkout" && (
              <form
                onSubmit={handleCheckout}
                className="max-w-3xl mx-auto space-y-6"
              >
                {/* Personal Information Section */}
                <div className="bg-gradient-to-r from-[#2b8ffb]/5 via-[#9c408c]/5 to-[#6c7cae]/5 border border-[#2b8ffb]/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] p-2 rounded-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <User className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                        </div>
                        <input
                          type="text"
                          required
                          value={checkoutForm.firstName}
                          onChange={(e) =>
                            setCheckoutForm({
                              ...checkoutForm,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                          placeholder="First Name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <User className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                        </div>
                        <input
                          type="text"
                          required
                          value={checkoutForm.lastName}
                          onChange={(e) =>
                            setCheckoutForm({
                              ...checkoutForm,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                        </div>
                        <input
                          type="email"
                          required
                          value={checkoutForm.email}
                          onChange={(e) =>
                            setCheckoutForm({
                              ...checkoutForm,
                              email: e.target.value,
                            })
                          }
                          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <Phone className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                        </div>
                        <input
                          type="tel"
                          required
                          value={checkoutForm.phone}
                          onChange={(e) =>
                            setCheckoutForm({
                              ...checkoutForm,
                              phone: e.target.value,
                            })
                          }
                          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                        Company
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <Building2 className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                        </div>
                        <input
                          type="text"
                          value={checkoutForm.company}
                          onChange={(e) =>
                            setCheckoutForm({
                              ...checkoutForm,
                              company: e.target.value,
                            })
                          }
                          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                          placeholder="Company Name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                        Designation
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <Briefcase className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                        </div>
                        <input
                          type="text"
                          value={checkoutForm.designation}
                          onChange={(e) =>
                            setCheckoutForm({
                              ...checkoutForm,
                              designation: e.target.value,
                            })
                          }
                          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                          placeholder="Your Designation"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing Address Section */}
                <div className="bg-gradient-to-r from-[#6c7cae]/5 via-[#9c408c]/5 to-[#2b8ffb]/5 border border-[#6c7cae]/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-[#6c7cae] to-[#2b8ffb] p-2 rounded-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Billing Address
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                      Street Address
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <MapPin className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                      </div>
                      <input
                        type="text"
                        required
                        value={checkoutForm.address}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            address: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                        placeholder="Street Address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutForm.city}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            city: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutForm.state}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            state: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutForm.zipCode}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            zipCode: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                        placeholder="Zip Code"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                      Country
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutForm.country}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          country: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                      placeholder="Country"
                    />
                  </div>
                </div>
                {/* Document Section */}
                <div className="bg-gradient-to-r from-[#6c7cae]/5 via-[#9c408c]/5 to-[#2b8ffb]/5 border border-[#6c7cae]/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-[#6c7cae] to-[#2b8ffb] p-2 rounded-lg">
                      <DocumentChartBarIcon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Document
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                      GST (optional)
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <DocumentChartBarIcon className="w-5 h-5 text-gray-400 group-focus-within:text-[#2b8ffb] transition-colors" />
                      </div>
                      <input
                        type="text"
                        value={checkoutForm.gst}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            gst: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2b8ffb]/20 focus:border-[#2b8ffb] transition-all outline-none text-gray-900 placeholder:text-gray-400"
                        placeholder="GST Number"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] p-2 rounded-lg">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Payment Method
                    </h3>
                  </div>
                  
                  {/* Payment Error Message */}
                  {paymentError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
                      <p className="text-sm text-red-800 font-medium">
                        ❌ {paymentError}
                      </p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={handlePayU}
                      className="group relative bg-gradient-to-r from-[#2b8ffb] to-[#2b8ffb]/90 text-white py-5 px-6 rounded-xl font-semibold hover:from-[#2b8ffb]/95 hover:to-[#2b8ffb]/85 transition-all shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <CreditCard className="w-6 h-6 relative z-10" />
                      <span className="relative z-10">Pay with PayU</span>
                    </button>
                    {
                      currency !== "INR" && (
                          <button
                      type="button"
                      onClick={handlePayPal}
                      className="group relative bg-gradient-to-r from-[#0070ba] to-[#009cde] text-white py-5 px-6 rounded-xl font-semibold hover:from-[#0070ba]/95 hover:to-[#009cde]/95 transition-all shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <CreditCard className="w-6 h-6 relative z-10" />
                      <span className="relative z-10">Pay with PayPal</span>
                    </button>
                      )
                    }
                  
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Processing Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-[90%] max-w-md mx-4 p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 border-4 border-[#2b8ffb] border-t-transparent rounded-full animate-spin"></div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Processing Payment
            </h3>
            <p className="text-gray-600 mb-4">
              Please wait while we process your payment securely.
            </p>

            <div className="bg-gradient-to-r from-[#2b8ffb]/5 to-[#6c7cae]/5 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                Do not close this window or refresh the page.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Signup Confirmation Modal */}
      {showSignupConfirmModal && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center"
          onClick={() => setShowSignupConfirmModal(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <div
            className="relative z-10 bg-white rounded-2xl shadow-2xl w-[90%] max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Icon */}
            <div className="p-8 text-center">
              <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Success Message */}
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Account Created Successfully!
              </h3>
              <p className="text-gray-600 mb-3 text-lg">
                Welcome to Achromic Point!
              </p>
              <p className="text-gray-500 text-sm mb-8">
                Your account has been created successfully. You can now sign in
                to continue with your checkout.
              </p>

              {/* Info Box */}
              <div className="bg-gradient-to-r from-[#2b8ffb]/5 to-[#6c7cae]/5 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Next Step:</span>
                  <br />
                  Please sign in with your credentials to complete your
                  registration.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowSignupConfirmModal(false);
                    setCurrentView("login");
                    // Pre-fill login email if available
                    if (signupUserData?.email) {
                      setLoginForm({
                        email: signupUserData.email,
                        password: "",
                      });
                    }
                  }}
                  className="w-full inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] hover:opacity-95 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Sign In Now
                </button>
                <button
                  onClick={() => setShowSignupConfirmModal(false)}
                  className="w-full inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
