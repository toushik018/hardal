"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import CartWidget from "./CartWidget";

interface NavItemProps {
  title: string;
  items?: Array<{ name: string; href: string }>;
}

const NavItem: React.FC<NavItemProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth > 768) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {items ? (
        <>
          <button
            className="text-gray-700 group-hover:text-green-600 px-3 py-2 text-sm font-medium inline-flex items-center"
            onClick={handleClick}
          >
            {title}
            <svg
              className={`w-4 h-4 ml-1 transition-transform duration-200 ease-in-out ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            ref={dropdownRef}
            className={`absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out ${
              isOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="py-1">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-600 transition-colors duration-150"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Link
          href={`/${title.toLowerCase()}`}
          className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-150"
        >
          {title}
        </Link>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-green-600">
              Grindel Backhus
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
            <NavItem
              title="Catering"
              items={[
                { name: "Option 1", href: "/catering/option1" },
                { name: "Option 2", href: "/catering/option2" },
              ]}
            />
            <NavItem title="Deutschlandweit" />
            <NavItem
              title="Anlässe"
              items={[
                { name: "Option 1", href: "/anlasse/option1" },
                { name: "Option 2", href: "/anlasse/option2" },
              ]}
            />
            <NavItem title="Über uns" />
            <NavItem title="Kontakt" />
          </div>

          <div className="flex items-center justify-between">
            <button className="bg-gray-200 p-2 rounded-full text-gray-600 hover:text-gray-800 transition-colors duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <CartWidget />
            <div className="md:hidden ml-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              >
                <span className="sr-only">Hauptmenü öffnen</span>
                {isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavItem
            title="Catering"
            items={[
              { name: "Option 1", href: "/catering/option1" },
              { name: "Option 2", href: "/catering/option2" },
            ]}
          />
          <NavItem title="Deutschlandweit" />
          <NavItem
            title="Anlässe"
            items={[
              { name: "Option 1", href: "/anlasse/option1" },
              { name: "Option 2", href: "/anlasse/option2" },
            ]}
          />
          <NavItem title="Über uns" />
          <NavItem title="Kontakt" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
