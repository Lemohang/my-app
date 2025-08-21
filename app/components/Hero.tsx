"use client";

import { useState, useEffect } from "react";
import { Search, CalendarCheck, } from "lucide-react";
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
    <main className="min-h-screen flex flex-col items-center justify-start p-6 bg-blue-900 text-white">

      {/* Hero Section */}
      <motion.section
        className="relative w-full max-w-6xl text-center py-20 px-6
                   bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500
                   rounded-[3rem] overflow-hidden shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-orange-400">YourCare</span><br />
          Book Smarter. Live Better.
        </motion.h1>

        <motion.p
          className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Search for doctors, clinics, or services, and book appointments in seconds. Hassle-free. Anytime. Anywhere.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center w-full max-w-sm sm:max-w-md bg-white/20 backdrop-blur-xl rounded-[3rem] shadow-2xl overflow-hidden mt-8 mx-auto"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.div className="flex items-center px-4 py-3 w-full sm:w-72 relative">
            <Search size={20} className="text-white/70 mr-3" />
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-white placeholder-white/50 text-base sm:text-lg font-medium"
              placeholder={typedText}
            />
          </motion.div>

          {/* Centered Search Button */}
          <div className="flex justify-center items-center mt-3 sm:mt-0">
            <motion.button
              className="bg-gradient-to-r from-yellow-400 via-pink-400 to-orange-400 
                         hover:from-yellow-500 hover:via-pink-500 hover:to-orange-500 
                         px-6 py-3 flex items-center space-x-2 text-white font-semibold 
                         rounded-[2.5rem] transition-transform transform hover:scale-105 
                         shadow-lg"
            >
              
              
            </motion.button>
          </div>
        </motion.div>

        {/* Quick Book Button */}
        <motion.div className="pt-6 flex justify-center">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-[3rem] flex items-center space-x-3 transition-transform transform hover:scale-105 shadow-xl mt-4">
            <CalendarCheck size={20} />
            <span>Quick Book Appointment</span>
          </button>
        </motion.div>
      </motion.section>

      {/* Info Cards Section */}
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
            <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
            <p className="text-white/80">{item.desc}</p>
          </motion.div>
        ))}
      </motion.section>
    </main>
  );
}
