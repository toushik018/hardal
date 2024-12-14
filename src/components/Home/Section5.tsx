"use client";

import ReferencesSlider from "@/components/ReferancesSlider/ReferancesSlider";

const Section5 = () => {
  return (
    <section id="references-section" className="relative py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#FFFAF5] -z-20" />
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="relative max-w-[800px] mx-auto text-center mb-24">
          <span className="relative inline-block text-lg font-semibold text-first mb-6 px-4 py-2 bg-first/5 rounded-full">
            Was Kunden sagen
          </span>
          <div className="relative">
            <h2 className="text-[3.5rem] md:text-[4.5rem] font-bold leading-[1.1]">
              <span className="text-gray-900">Exquisites Catering,</span>
              <br />
              <span className="text-first relative">unvergessliche</span>
              <br />
              <span className="text-first">Erinnerungen</span>
            </h2>
          </div>
        </div>

        {/* Testimonials Container */}
        <div className="relative max-w-[1400px] mx-auto z-10">
          {/* Decorative Elements */}
          <div className="absolute -left-8 -top-8 w-24 h-24 bg-first/5 rounded-full blur-2xl" />
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-first/5 rounded-full blur-2xl" />

          {/* Main Content */}
          <div
            className="relative bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12
                        border border-white/20 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]"
          >
            <div className="absolute -left-3 top-12 w-24 h-24 bg-first/10 rounded-full mix-blend-multiply blur-2xl" />
            <div className="absolute -right-3 bottom-12 w-24 h-24 bg-first/10 rounded-full mix-blend-multiply blur-2xl" />

            <ReferencesSlider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5;
