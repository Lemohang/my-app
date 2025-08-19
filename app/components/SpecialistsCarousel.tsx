// app/components/SpecialistsCarousel.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Sample specialist data with images
const specialists = [
  {
    name: "Nashid Martines",
    specialty: "Cardiac Surgery",
    image: "/images/specialists/nashid.jpg",
  },
  {
    name: "Emilio Duarte",
    specialty: "Pediatric Clinic",
    image: "/images/specialists/emilio.jpg",
  },
  {
    name: "Rihana Roy",
    specialty: "Gynecology",
    image: "/images/specialists/rihana.jpg",
  },
  {
    name: "Aiden Smith",
    specialty: "Neurology",
    image: "/images/specialists/aiden.jpg",
  },
  {
    name: "Sophia Lee",
    specialty: "Orthopedics",
    image: "/images/specialists/sophia.jpg",
  },
];

export default function SpecialistsCarousel() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative w-full max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        We Employ Only <span className="text-yellow-400">Specialists</span>
      </h2>

      <div className="flex overflow-x-auto gap-6 scrollbar-hide snap-x snap-mandatory px-2">
        {specialists.map((spec, idx) => (
          <motion.div
            key={idx}
            className="relative flex-shrink-0 w-64 sm:w-72 snap-center bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] shadow-xl cursor-pointer overflow-hidden"
            onHoverStart={() => setHovered(idx)}
            onHoverEnd={() => setHovered(null)}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Specialist Image */}
            <div className="relative h-40 w-full overflow-hidden rounded-t-[2.5rem]">
              <Image
                height={160}
                width={256}
                src={spec.image}
                alt={spec.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              {/* Overlay gradient for text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Specialist Info */}
            <div className="p-4 flex flex-col justify-between h-36">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">{spec.name}</h3>
                <p className="text-white/80">{spec.specialty}</p>
              </div>

              {/* Appointment Button */}
              {hovered === idx && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 w-full bg-gradient-to-r from-yellow-400 via-pink-400 to-orange-400 px-4 py-2 rounded-full text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg"
                >
                  Appointment Now <ArrowRight size={16} />
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
