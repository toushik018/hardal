"use client";

import { Link } from "react-scroll";
import { motion } from "framer-motion";

const Section4 = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-end">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-section4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundAttachment: "fixed", // Parallax effect
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative w-full md:w-[650px] mx-10">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
        >
          {/* Text Content */}
          <motion.h2
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl md:text-5xl font-semibold text-white leading-tight mb-8"
          >
            Sind Sie bereit, das <span className="text-first">Catering</span>{" "}
            für Ihre <span className="text-first">Veranstaltung</span> zu
            buchen?
          </motion.h2>

          {/* CTA Button */}
          <Link
            to="online-bestellen"
            smooth
            className="group inline-flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-first text-black rounded-xl px-8 py-4 text-lg md:text-xl 
                         font-semibold transition-all duration-300
                         hover:shadow-[0_0_30px_rgba(255,167,69,0.3)]
                         flex items-center gap-3"
            >
              Jetzt buchen
              <svg
                className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.button>
          </Link>

          {/* Optional: Additional Info */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 text-white/70 text-sm md:text-base"
          >
            Lassen Sie uns gemeinsam Ihre Veranstaltung zu einem kulinarischen
            Erlebnis machen
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Section4;
