"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { usePathname } from "next/navigation";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import CartWidget from "./CartWidget";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const menus = [
    { name: "Home", path: "/", type: "route" },
    { name: "Online Bestellen", path: "menu-section", type: "scroll" },
    { name: "Galerie", path: "gallery-section", type: "scroll" },
    { name: "Rezensionen", path: "references-section", type: "scroll" },
    { name: "Kontakt", path: "reservation-section", type: "scroll" },
  ];

  const renderMenuItem = (
    menu: { name: string; path: string; type: string },
    index: number
  ) => {
    const commonClasses = `
      relative py-2 text-[15px] font-medium text-gray-600 hover:text-first 
      transition-all duration-200 cursor-pointer
      after:content-[''] after:absolute after:-bottom-2 after:left-0 
      after:w-0 after:h-0.5 after:rounded-full after:bg-first 
      after:transition-all after:duration-300 hover:after:w-full
    `;

    return menu.type === "scroll" ? (
      <ScrollLink
        key={index}
        to={menu.path}
        spy={true}
        smooth={true}
        offset={-100}
        duration={500}
        className={commonClasses}
        activeClass="text-first after:w-full"
      >
        {menu.name}
      </ScrollLink>
    ) : (
      <Link
        key={index}
        href={menu.path}
        className={`${commonClasses} ${
          pathname === menu.path ? "text-first after:w-full" : ""
        }`}
      >
        {menu.name}
      </Link>
    );
  };

  const renderMobileMenuItem = (
    menu: { name: string; path: string; type: string },
    index: number
  ) => {
    const commonClasses = `
      w-full px-6 py-3.5 text-[15px] font-medium
      flex items-center justify-between
      border-b border-gray-100 last:border-0
      hover:bg-gray-50 transition-all duration-200
    `;

    const menuContent = (
      <>
        <span className="text-gray-700">{menu.name}</span>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </>
    );

    return menu.type === "scroll" ? (
      <ScrollLink
        key={index}
        to={menu.path}
        spy={true}
        smooth={true}
        offset={-100}
        duration={500}
        className={commonClasses}
        onClick={() => setIsMenuOpen(false)}
      >
        {menuContent}
      </ScrollLink>
    ) : (
      <Link
        key={index}
        href={menu.path}
        onClick={() => setIsMenuOpen(false)}
        className={commonClasses}
      >
        {menuContent}
      </Link>
    );
  };

  return (
    <nav
      className={`left-0 right-0 z-50 w-full transition-all duration-300
        ${scrolled ? "h-16" : "h-24"}
        ${
          isHomePage
            ? scrolled
              ? "bg-white/90 border-b border-gray-100"
              : "bg-transparent"
            : "bg-white/90 backdrop-blur-lg border-b border-gray-100"
        }
      `}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <Image
              src="/logos/logo.png"
              alt="Hardal Catering"
              width={scrolled ? 100 : 120}
              height={scrolled ? 40 : 48}
              className="transition-all duration-300"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-12">
            {menus.map((menu, index) => renderMenuItem(menu, index))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <CartWidget />
            {/* <Link
              href="/login"
              className={`
                relative hidden md:inline-flex items-center justify-center px-6 
                overflow-hidden font-medium transition-all bg-first 
                rounded-xl hover:bg-first/90 group
                ${scrolled ? "py-2" : "py-2.5"}
              `}
            >
              <span className="relative text-[#0A2533] font-semibold">
                Eintragen
              </span>
            </Link> */}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <HiOutlineXMark className="h-6 w-6" />
              ) : (
                <HiOutlineBars3 className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl lg:hidden z-50"
            >
              {/* Menu Header */}
              <div className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 bg-white border-b border-gray-100">
                <Image
                  src="/logos/logo.png"
                  alt="Hardal Catering"
                  width={100}
                  height={40}
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <HiOutlineXMark className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Menu Items Container */}
              <div className="h-[calc(100vh-64px)] overflow-y-auto">
                {/* Navigation Links */}
                <div className="py-2">
                  {menus.map((menu, index) =>
                    renderMobileMenuItem(menu, index)
                  )}
                </div>

                {/* Action Buttons & Info */}
                <div className="px-6 py-8 bg-gray-50 mt-4">
                  {/* <Link
                    href="/login"
                    className="flex items-center justify-center w-full px-6 py-3.5
                             bg-first text-[#0A2533] rounded-xl font-medium 
                             hover:bg-first/90 transition-all duration-200
                             shadow-sm hover:shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Eintragen
                  </Link> */}

                  {/* Contact Info */}
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 mb-2">
                      Brauchen Sie Hilfe?
                    </p>
                    <a
                      href="tel:+4940847082"
                      className="text-first font-medium text-lg hover:underline"
                    >
                      +49 408 470 82
                    </a>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-400">
                      © {new Date().getFullYear()} Hardal Catering
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
