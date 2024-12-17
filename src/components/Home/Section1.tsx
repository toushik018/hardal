"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { HiArrowLongRight } from "react-icons/hi2";
import { useRef } from "react";
import { Link } from "react-scroll";
import Image from "next/image";

const Section1 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Background with enhanced Parallax Effect */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src="/background.jpg"
          alt="Elegant Catering"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={100}
        />
        <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-r from-black/60 to-black/30" />
        <div className="absolute inset-0 bg-white/20" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative container mx-auto px-4 min-h-screen"
      >
        <div className="grid lg:grid-cols-2 gap-12 min-h-screen items-center">
          {/* Left Content with Stagger Effect */}
          <motion.div style={{ y: y1 }} className="max-w-2xl">
            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-full mb-8"
            >
              <div className="size-2 rounded-full bg-first animate-pulse" />
              <span className="text-white/90 text-sm font-medium tracking-wide">
                Möllner Landstraße 3, 22111 Hamburg
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Hardal
                <span className="text-first block mt-3">Restaurant</span>
                <span className="block mt-3">& Catering</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-white/80 max-w-2xl mb-12 leading-relaxed"
            >
              Erleben Sie erstklassiges türkisches Catering für Ihre
              Veranstaltungen. Von exklusiven Firmenfeiern bis zu
              unvergesslichen Hochzeiten - wir bieten authentische
              Geschmackserlebnisse.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-5"
            >
              <a
                href="tel:+4940847082"
                className="group px-8 py-4 bg-first rounded-xl font-medium hover:bg-first/90 transition-all"
              >
                <span className="flex items-center gap-3 text-white">
                  Jetzt Anrufen
                  <HiArrowLongRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
                <Link
                to="menu-section"
                spy={true}
                smooth={true}
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium 
                     hover:bg-white/20 transition-all border border-white/20 cursor-pointer
                     flex items-center gap-3"
                >
                Online Bestellen
                <HiArrowLongRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-20 grid grid-cols-3 gap-12 max-w-2xl"
            >
              {[
                { number: "15+", label: "Jahre Erfahrung" },
                { number: "1000+", label: "Zufriedene Kunden" },
                { number: "4.9", label: "Google Bewertung" },
              ].map((stat, index) => (
                <div key={index} className="relative">
                  <div className="absolute -top-3 -left-3 size-12 rounded-lg bg-first/10" />
                  <div className="relative">
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Floating Cards with Enhanced Animation */}
          <div className="hidden lg:block">
            <motion.div
              style={{ y: y2 }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-full h-96"
              >
                <Image
                  src="/images/main.jpg"
                  alt="Turkish Catering"
                  fill
                  className="object-cover rounded-2xl shadow-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={100}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Section1;
