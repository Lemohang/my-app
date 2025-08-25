"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlassHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="backdrop-blur-lg bg-white/30 border-b border-white/40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-200 rounded-full shadow-md border border-white/50" />
            <span className="text-xl font-semibold text-white drop-shadow-md">
              HealthCare MVP
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/dashboard" className="text-white hover:text-blue-200 transition font-medium">
              Dashboard
            </Link>
            <Link href="/features" className="text-white hover:text-blue-200 transition font-medium">
              Features
            </Link>
            <Link href="/services" className="text-white hover:text-blue-200 transition font-medium">
              Services
            </Link>
            <Link href="/pricing" className="text-white hover:text-blue-200 transition font-medium">
              Pricing
            </Link>
            <Link href="/contact" className="text-white hover:text-blue-200 transition font-medium">
              Contact
            </Link>
          </nav>

          {/* Desktop Sign In / Sign Up */}
          <div className="hidden md:flex space-x-3">
            <Link
              href="/sign-in"
              className="px-4 py-2 border border-white/50 text-white font-medium rounded-full hover:bg-white/20 transition"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 bg-gradient-to-br from-blue-400 to-blue-200 text-gray-900 font-semibold rounded-full shadow-md hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu with Framer Motion */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/20 backdrop-blur-md border-t border-white/30 shadow-inner"
            >
              <nav className="flex flex-col space-y-2 px-6 py-4">
                <Link href="/dashboard" className="text-white hover:text-blue-200 font-medium">
                  Dashboard
                </Link>
                <Link href="/features" className="text-white hover:text-blue-200 font-medium">
                  Features
                </Link>
                <Link href="/services" className="text-white hover:text-blue-200 font-medium">
                  Services
                </Link>
                <Link href="/pricing" className="text-white hover:text-blue-200 font-medium">
                  Pricing
                </Link>
                <Link href="/contact" className="text-white hover:text-blue-200 font-medium">
                  Contact
                </Link>

                <div className="flex flex-col space-y-2 mt-4">
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 border border-white/50 text-white font-medium rounded-full hover:bg-white/20 transition text-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-4 py-2 bg-gradient-to-br from-blue-400 to-blue-200 text-gray-900 font-semibold rounded-full shadow-md hover:opacity-90 transition text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
