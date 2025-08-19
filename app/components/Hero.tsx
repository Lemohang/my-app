// app/page.tsx or pages/index.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, CalendarCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const placeholderText = "Search doctors, clinics, services...";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + placeholderText[i]);
      i++;
      if (i >= placeholderText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="text-white min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">

      {/* Hero Section with wavy background */}
      <motion.section
        className="relative w-full max-w-6xl text-center py-20 px-6
                   bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500
                   rounded-[3rem] overflow-hidden shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Top wave SVG */}
        <svg
          className="absolute top-0 left-0 w-full h-24"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64 C360,120 1080,0 1440,64 L1440,0 L0,0 Z"
            fill="url(#waveGradient)"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-orange-400">
            YourCare
          </span>
          <br /> Book Smarter. Live Better.
        </motion.h1>

        <motion.p
          className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed relative z-10 mt-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Your health journey starts here — search for doctors, clinics, or services, 
          and book appointments in seconds.  
          Hassle-free. Anytime. Anywhere.
        </motion.p>

        {/* Animated & Responsive Search Bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-center w-full max-w-sm sm:max-w-md bg-white/20 backdrop-blur-xl rounded-[3rem] shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-500 mt-8 relative z-10"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.div
            className="flex items-center px-4 py-3 w-full sm:w-72 group relative"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-white/70 mr-3"
              whileHover={{ scale: 1.2, color: "#fff" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Search size={20} />
            </motion.div>

            <motion.input
              type="text"
              className="flex-1 bg-transparent outline-none text-white text-base sm:text-lg font-medium"
              whileFocus={{ backgroundColor: "rgba(255,255,255,0.15)", scale: 1.02 }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            />

            <motion.span
              className="absolute left-12 text-white/70 pointer-events-none text-base sm:text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {typedText}
            </motion.span>
          </motion.div>

          <motion.button
            className="bg-gradient-to-r from-yellow-400 via-pink-400 to-orange-400 hover:from-yellow-500 hover:via-pink-500 hover:to-orange-500 px-6 py-3 flex items-center space-x-2 text-white font-semibold rounded-[2.5rem] transition-transform transform hover:scale-105 shadow-lg mt-3 sm:mt-0"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.08 }}
          >
            <span>Search</span>
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>

        {/* Quick Book Appointment */}
        <motion.div
          className="pt-6 relative z-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-[3rem] flex items-center space-x-3 transition-transform transform hover:scale-105 shadow-xl">
            <CalendarCheck size={20} />
            <span>Quick Book Appointment</span>
          </button>
        </motion.div>

        {/* Bottom wave SVG */}
        <svg
          className="absolute bottom-0 left-0 w-full h-24"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64 C360,0 1080,120 1440,64 L1440,120 L0,120 Z"
            fill="url(#waveGradientBottom)"
          />
          <defs>
            <linearGradient id="waveGradientBottom" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </motion.section>

      {/* Sub Section */}
      <motion.section
        className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.3 } } }}
      >
        {[
          { title: "Find Top Specialists", desc: "Browse thousands of verified doctors and clinics in your area." },
          { title: "Book in Seconds", desc: "Schedule appointments with just a few clicks — no phone calls." },
          { title: "24/7 Access", desc: "Manage your bookings anytime, from anywhere, on any device." }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="p-6 bg-white/10 backdrop-blur-lg rounded-[2rem] shadow-lg"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-white/80">{item.desc}</p>
          </motion.div>
        ))}
      </motion.section>
    </main>
  );
}
