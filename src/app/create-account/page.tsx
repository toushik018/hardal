"use client";

import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiBriefcase,
  FiUsers,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useRegisterMutation } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

const validateCreateAccount = Yup.object().shape({
  firstname: Yup.string().required("Erforderliches Feld"),
  lastname: Yup.string().required("Erforderliches Feld"),
  email: Yup.string()
    .email("E-Mail muss eine gültige E-Mail sein")
    .required("Erforderliches Feld"),
  password: Yup.string().required("Erforderliches Feld"),
  confirmPassword: Yup.string()
    .required("Erforderliches Feld")
    .oneOf([Yup.ref("password")], "Passwörter müssen übereinstimmen"),
  telephone: Yup.string().required("Erforderliches Feld"),
});

const CreateAccount = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();

  const createAccountForm = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      company: "",
      department: "",
      email: "",
      telephone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validateCreateAccount,
    onSubmit: async (values) => {
      try {
        const result = await register({
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          telephone: values.telephone,
          password: values.password,
          company: values.company,
          department: values.department,
        }).unwrap();

        if (result.success) {
          toast.success("Registrierung erfolgreich");
          router.push("/admin/dashboard");
        } else {
          toast.error(result.message || "Registrierung fehlgeschlagen");
        }
      } catch (error) {
        toast.error("Registrierung fehlgeschlagen");
        console.error("Registration error:", error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logos/logo.png" alt="Hardal" className="h-12 mx-auto" />
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Konto erstellen
          </h2>

          <form onSubmit={createAccountForm.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Vorname
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="Vorname"
                    className="pl-10"
                    onChange={createAccountForm.handleChange}
                    onBlur={createAccountForm.handleBlur}
                    value={createAccountForm.values.firstname}
                  />
                </div>
                {createAccountForm.errors.firstname && createAccountForm.touched.firstname && (
                  <p className="text-sm text-red-500">{createAccountForm.errors.firstname}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Nachname
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Nachname"
                    className="pl-10"
                    onChange={createAccountForm.handleChange}
                    onBlur={createAccountForm.handleBlur}
                    value={createAccountForm.values.lastname}
                  />
                </div>
                {createAccountForm.errors.lastname && createAccountForm.touched.lastname && (
                  <p className="text-sm text-red-500">{createAccountForm.errors.lastname}</p>
                )}
              </div>

              {/* Contact Information */}
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
                    onChange={createAccountForm.handleChange}
                    onBlur={createAccountForm.handleBlur}
                    value={createAccountForm.values.email}
                  />
                </div>
                {createAccountForm.errors.email && createAccountForm.touched.email && (
                  <p className="text-sm text-red-500">{createAccountForm.errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Telefon
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    placeholder="+49"
                    className="pl-10"
                    onChange={createAccountForm.handleChange}
                    onBlur={createAccountForm.handleBlur}
                    value={createAccountForm.values.telephone}
                  />
                </div>
                {createAccountForm.errors.telephone && createAccountForm.touched.telephone && (
                  <p className="text-sm text-red-500">{createAccountForm.errors.telephone}</p>
                )}
              </div>

              {/* Password Fields */}
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
                    placeholder="••••••••"
                    className="pl-10"
                    onChange={createAccountForm.handleChange}
                    onBlur={createAccountForm.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {createAccountForm.errors.password && createAccountForm.touched.password && (
                  <p className="text-sm text-red-500">{createAccountForm.errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Passwort bestätigen
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    onChange={createAccountForm.handleChange}
                    onBlur={createAccountForm.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {createAccountForm.errors.confirmPassword && createAccountForm.touched.confirmPassword && (
                  <p className="text-sm text-red-500">{createAccountForm.errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!(createAccountForm.isValid && createAccountForm.dirty) || isLoading}
              className="w-full bg-first hover:bg-first/90"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                "Registrieren"
              )}
            </Button>

            {/* Login Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600">Bereits ein Konto?</span>{" "}
              <Link
                href="/login"
                className="font-medium text-first hover:text-first/80 transition-colors"
              >
                Jetzt anmelden
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
