"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Contact() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 to-teal-900 text-gray-200 flex items-center justify-center px-6 py-24 relative overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full">
        
        {/* Left side with form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black/30 border border-cyan-400/50 rounded-3xl shadow-2xl p-8 backdrop-blur-md"
        >
          <h2 className="text-4xl font-extrabold text-white drop-shadow-[0_0_10px_cyan] mb-6">
            Get in Touch
          </h2>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-cyan-400/50 text-white placeholder-cyan-200/60 shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-cyan-400/50 text-white placeholder-cyan-200/60 shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-cyan-400/50 text-white placeholder-cyan-200/60 shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            ></textarea>
            <motion.button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold bg-cyan-500 text-black hover:bg-cyan-400 active:bg-cyan-600 transition shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,255,0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Right side with stethoscope image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center"
        >
          <Image
            src="/sthescope.png" // 👈 put the stethoscope image in /public
            alt="Stethoscope"
            width={450}
            height={450}
            className="rounded-3xl shadow-[0_0_30px_cyan] border-2 border-cyan-400/80"
          />
        </motion.div>
      </div>
    </section>
  );
}
