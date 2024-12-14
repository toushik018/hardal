"use client";

import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { useForgotPasswordMutation } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

const validateForgotPassword = Yup.object().shape({
  email: Yup.string()
    .email("E-Mail muss eine gültige E-Mail sein")
    .required("Erforderliches Feld"),
});

const ForgotPassword = () => {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const forgotPasswordForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validateForgotPassword,
    onSubmit: async (values) => {
      try {
        const result = await forgotPassword({ email: values.email }).unwrap();
        if (result.success) {
          toast.success("E-Mail zum Zurücksetzen des Passworts wurde gesendet");
          router.push("/login");
        } else {
          toast.error(result.message || "Fehler beim Senden der E-Mail");
        }
      } catch (error) {
        toast.error("Fehler beim Senden der E-Mail");
        console.error("Forgot password error:", error);
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

        {/* Forgot Password Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Passwort vergessen
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen
          </p>

          <form onSubmit={forgotPasswordForm.handleSubmit} className="space-y-6">
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
                  onChange={forgotPasswordForm.handleChange}
                  onBlur={forgotPasswordForm.handleBlur}
                  value={forgotPasswordForm.values.email}
                />
              </div>
              {forgotPasswordForm.errors.email && forgotPasswordForm.touched.email && (
                <p className="text-sm text-red-500">
                  {forgotPasswordForm.errors.email}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!(forgotPasswordForm.isValid && forgotPasswordForm.dirty) || isLoading}
              className="w-full bg-first hover:bg-first/90"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                "Passwort zurücksetzen"
              )}
            </Button>

            {/* Back to Login Link */}
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mt-4"
            >
              <FiArrowLeft className="w-4 h-4" />
              Zurück zum Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
