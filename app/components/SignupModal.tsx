"use client";

import React, { useState, useEffect } from "react";
import { XIcon, EyeIcon, EyeOffIcon } from "./Icons";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [validationSuccess, setValidationSuccess] = useState(false);

  // Prevent background scrolling and handle Escape key
  const handleClose = React.useCallback(() => {
    setErrors({});
    setValidationSuccess(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Full Name validation
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name.";
    }

    // 2. Email Address validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // 3. Phone Number validation
    const phoneClean = phone.replace(/[\s\-\(\)\+]/g, "");
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (phoneClean.length < 10 || !/^\d+$/.test(phoneClean)) {
      newErrors.phone = "Please enter a valid phone number (at least 10 digits).";
    }

    // 4. Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    // 5. Re-enter Password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please re-enter your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setValidationSuccess(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-modal-title"
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#D1D5DB] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-900 text-white border-b border-slate-800">
          <div>
            <h3 id="signup-modal-title" className="font-bold text-base sm:text-lg tracking-tight">
              Create an Account
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Sign up with AutoPro to manage your services
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close signup dialog"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6">
          {validationSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto border border-blue-200">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">
                  Validation Successful
                </h4>
                <div className="p-3 bg-amber-50 text-amber-800 rounded-xl text-xs font-medium border border-amber-200 text-left">
                  Form validation successful. Account registration is not connected yet.
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* 1. Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Asad Ali"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  className={`w-full text-sm border rounded-xl p-2.5 bg-white text-slate-900 focus:outline-none transition-colors ${
                    errors.fullName
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-[#D1D5DB] focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* 2. Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full text-sm border rounded-xl p-2.5 bg-white text-slate-900 focus:outline-none transition-colors ${
                    errors.email
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-[#D1D5DB] focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
                )}
              </div>

              {/* 3. Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="0300 1234567"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  className={`w-full text-sm border rounded-xl p-2.5 bg-white text-slate-900 focus:outline-none transition-colors ${
                    errors.phone
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-[#D1D5DB] focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>
                )}
              </div>

              {/* 4. Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    className={`w-full text-sm border rounded-xl p-2.5 pr-10 bg-white text-slate-900 focus:outline-none transition-colors ${
                      errors.password
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-[#D1D5DB] focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.password}</p>
                )}
              </div>

              {/* 5. Re-enter Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Re-enter Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                    }}
                    className={`w-full text-sm border rounded-xl p-2.5 pr-10 bg-white text-slate-900 focus:outline-none transition-colors ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-[#D1D5DB] focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
