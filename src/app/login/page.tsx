"use client";

import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { useLoginMutation } from "@/services/api";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginValidate = yup.object().shape({
  email: yup
    .string()
    .email("E-Mail muss eine gültige E-Mail sein")
    .required("Erforderliches Feld"),
  password: yup.string().required("Erforderliches Feld"),
});

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidate,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();
        if (result.success) {
          toast.success("Login erfolgreich");
          router.push("/admin/dashboard");
        } else {
          toast.error(result.message || "Login fehlgeschlagen");
        }
      } catch (error) {
        toast.error("Login fehlgeschlagen");
        console.error("Login error:", error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/logos/logo.png"
            alt="Hardal"
            className="h-12 mx-auto mb-4"
          />
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Willkommen zurück
            </h1>
            <p className="text-gray-600">
              Bitte melden Sie sich in Ihrem Konto an
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={loginForm.handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                E-Mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ihre@email.com"
                  className="pl-10"
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                  value={loginForm.values.email}
                />
              </div>
              {loginForm.errors.email && loginForm.touched.email && (
                <p className="text-sm text-red-500">
                  {loginForm.errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Passwort
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="•••••••"
                  className="pl-10"
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FiEye className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FiEyeOff className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {loginForm.errors.password && loginForm.touched.password && (
                <p className="text-sm text-red-500">
                  {loginForm.errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Passwort vergessen?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!(loginForm.isValid && loginForm.dirty) || isLoading}
              className="w-full bg-first hover:bg-first/20 hover:text-first"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2  rounded-full animate-spin" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Einloggen
                  <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>

          {/* Create Account Link */}
          <div className="mt-8 text-center">
            <span className="text-gray-600">Noch kein Konto?</span>{" "}
            <Link
              href="/create-account"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Jetzt registrieren
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
