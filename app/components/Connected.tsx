"use client";
import { WorldMap } from "./ui/world-map";
import { motion } from "motion/react";

export function WorldMapDemo() {
  return (
    <div className="py-40 w-full">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading with heartbeat + glow */}
        <motion.p
          className="font-bold text-xl md:text-4xl text-black dark:text-white"
          style={{
            textShadow: "0 0 4px rgba(20,184,166,0.6), 0 0 6px rgba(20,184,166,0.4)",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        >
          Global{" "}
          <span className="text-teal-500">
            {"Health Connectivity".split("").map((letter, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                style={{
                  textShadow: "0 0 6px rgba(20,184,166,0.7), 0 0 8px rgba(20,184,166,0.5)",
                }}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </motion.p>

        {/* Subtext */}
        <p
          className="text-sm md:text-lg text-gray-800 dark:text-gray-200 max-w-2xl mx-auto py-4"
          style={{ textShadow: "0 0 3px rgba(0,0,0,0.2), 0 0 4px rgba(255,255,255,0.1)" }}
        >
          Connecting clinics, hospitals, and patients worldwide with seamless
          digital health solutions. Break barriers and bring care closer,
          wherever you are.
        </p>
      </div>

      {/* Transparent World Map */}
      <WorldMap
        lineColor="#14b8a6"
        glow
        bordered
        showLabels
        dots={[
          {
            start: { lat: -26.2041, lng: 28.0473, label: "Johannesburg Clinic" },
            end: { lat: 52.52, lng: 13.405, label: "Berlin Lab" },
          },
          {
            start: { lat: -29.3167, lng: 27.4833, label: "Maseru Hospital" },
            end: { lat: -33.9249, lng: 18.4241, label: "Cape Town Center" },
          },
          {
            start: { lat: 40.7128, lng: -74.006, label: "New York Hospital" },
            end: { lat: 51.5074, lng: -0.1278, label: "London Research" },
          },
          {
            start: { lat: 28.6139, lng: 77.209, label: "Delhi Care" },
            end: { lat: 1.3521, lng: 103.8198, label: "Singapore Health" },
          },
        ]}
      />
    </div>
  );
}

export default WorldMapDemo;
