"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { usePathname } from "next/navigation";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";

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

  // Define menu items with a type to distinguish between scroll and route navigation
  const menus = [
    { name: "Home", path: "/", type: "route" },
    { name: "Online Bestellen", path: "menu-section", type: "scroll" },
    { name: "Reservation", path: "reservation-section", type: "scroll" },
    { name: "Catering", path: "catering-section", type: "scroll" },
    { name: "Galeria", path: "gallery-section", type: "scroll" },
    { name: "Referenzen", path: "references-section", type: "scroll" },
  ];

  const renderMenuItem = (menu: { name: string; path: string; type: string }, index: number) => {
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
        className={`${commonClasses} ${pathname === menu.path ? "text-first after:w-full" : ""}`}
      >
        {menu.name}
      </Link>
    );
  };

  const renderMobileMenuItem = (menu: { name: string; path: string; type: string }, index: number) => {
    const commonClasses = `
      flex w-full items-center px-4 py-3 text-[15px] 
      font-medium text-gray-600 hover:text-first rounded-xl 
      hover:bg-first/5 transition-all duration-200
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
        onClick={() => setIsMenuOpen(false)}
      >
        {menu.name}
      </ScrollLink>
    ) : (
      <Link
        key={index}
        href={menu.path}
        onClick={() => setIsMenuOpen(false)}
        className={commonClasses}
      >
        {menu.name}
      </Link>
    );
  };

  return (
    <nav className={`left-0 right-0 z-50 w-full
      ${isHomePage ? "bg-transparent" : "bg-white/90 backdrop-blur-lg border-b border-gray-100"}
      transition-all duration-300
    `}>
      <div className="container mx-auto">
        <div className={`
          relative flex items-center justify-between px-4 lg:px-8
          ${scrolled ? "h-16" : "h-24"}
          transition-all duration-300
        `}>
          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-500 hover:bg-first/5 hover:text-first focus:outline-none transition-all duration-200"
            >
              {isMenuOpen ? (
                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HiOutlineBars3 className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Logo and Navigation */}
          <div className="flex flex-1 items-center justify-between sm:justify-start">
            {/* Logo */}
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <img
                  alt="Hardal Catering"
                  src="/logos/logo.png"
                  className={`
                    w-auto transition-all duration-300
                    ${scrolled ? "h-10" : "h-14"}
                  `}
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:ml-16 sm:flex sm:space-x-12">
              {menus.map((menu, index) => renderMenuItem(menu, index))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className={`
                relative inline-flex items-center justify-center px-8 
                overflow-hidden font-medium transition-all bg-first 
                rounded-xl hover:bg-first/90 group
                ${scrolled ? "py-2.5" : "py-3"}
              `}
            >
              <span className="relative text-[#0A2533] font-semibold">
                Eintragen
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`
        sm:hidden transition-all duration-300 ease-in-out
        ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}
        ${isHomePage ? "bg-[#FFF8E8]" : "bg-white/90 backdrop-blur-lg"}
      `}>
        <div className="space-y-1.5 px-4 pb-5 pt-3">
          {menus.map((menu, index) => renderMobileMenuItem(menu, index))}
          <div className="h-px bg-gray-100 my-3" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
