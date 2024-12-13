"use client";

import { useFormik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";

type FormValues = {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  activity: string;
  message: string;
};

const Section6 = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Erforderlich'),
    lastName: Yup.string().required('Erforderlich'),
    email: Yup.string().email('Ungültige E-Mail').required('Erforderlich'),
    phoneNumber: Yup.string().required('Erforderlich'),
    activity: Yup.string().required('Bitte wählen Sie eine Option'),
    message: Yup.string().required('Erforderlich'),
  });

  const contactForm = useFormik<FormValues>({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      activity: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("Form submitted:", values);
        // Reset form after successful submission
        contactForm.resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const inputStyle = (fieldName: keyof FormValues) => `
    w-full px-4 py-3 bg-white rounded-lg border
    ${contactForm.touched[fieldName] && contactForm.errors[fieldName]
      ? 'border-red-300 focus:border-red-500'
      : 'border-gray-200 focus:border-first'}
    focus:outline-none focus:ring-1 focus:ring-first/20
    transition-all duration-200
  `;

  return (
    <section className="py-24 bg-[#FFFAF5]">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-first/5 rounded-full 
                         text-sm font-medium text-first tracking-wide mb-4">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lassen Sie uns Ihre Veranstaltung planen
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Teilen Sie uns Ihre Wünsche mit, und wir melden uns innerhalb von 24 Stunden bei Ihnen
          </p>
        </div>

        {/* Form */}
        <form 
          onSubmit={contactForm.handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Name Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                  Vorname
                </label>
                <input
                  type="text"
                  id="name"
                  {...contactForm.getFieldProps('name')}
                  className={inputStyle('name')}
                  placeholder="John"
                />
                {contactForm.touched.name && contactForm.errors.name && (
                  <p className="mt-1 text-sm text-red-500">{contactForm.errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="lastName">
                  Nachname
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...contactForm.getFieldProps('lastName')}
                  className={inputStyle('lastName')}
                  placeholder="Doe"
                />
                {contactForm.touched.lastName && contactForm.errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{contactForm.errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Contact Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  {...contactForm.getFieldProps('email')}
                  className={inputStyle('email')}
                  placeholder="john@example.com"
                />
                {contactForm.touched.email && contactForm.errors.email && (
                  <p className="mt-1 text-sm text-red-500">{contactForm.errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phoneNumber">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  {...contactForm.getFieldProps('phoneNumber')}
                  className={inputStyle('phoneNumber')}
                  placeholder="+49 123 456 789"
                />
                {contactForm.touched.phoneNumber && contactForm.errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">{contactForm.errors.phoneNumber}</p>
                )}
              </div>
            </div>

            {/* Full Width Fields */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="activity">
                Art der Veranstaltung
              </label>
              <select
                id="activity"
                {...contactForm.getFieldProps('activity')}
                className={inputStyle('activity')}
              >
                <option value="">Bitte wählen Sie</option>
                <option value="hochzeit">Hochzeit</option>
                <option value="firmenfeier">Firmenfeier</option>
                <option value="geburtstag">Geburtstag</option>
                <option value="konferenz">Konferenz</option>
                <option value="andere">Andere</option>
              </select>
              {contactForm.touched.activity && contactForm.errors.activity && (
                <p className="mt-1 text-sm text-red-500">{contactForm.errors.activity}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">
                Ihre Nachricht
              </label>
              <textarea
                id="message"
                rows={6}
                {...contactForm.getFieldProps('message')}
                className={`${inputStyle('message')} resize-none`}
                placeholder="Beschreiben Sie Ihre Veranstaltung..."
              />
              {contactForm.touched.message && contactForm.errors.message && (
                <p className="mt-1 text-sm text-red-500">{contactForm.errors.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={!contactForm.isValid || !contactForm.dirty || isSubmitting}
              onClick={() => contactForm.handleSubmit()}
              className="w-full bg-first text-black font-medium px-8 py-4 rounded-lg
                       transition-all duration-200  
                       hover:bg-first/90 hover:shadow-lg
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2 relative"
            >
              {isSubmitting ? (
                <>
                  <svg 
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Wird gesendet...
                </>
              ) : (
                <>
                  Nachricht senden
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Section6;
