// app/components/InteractiveServices.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, } from "framer-motion";
import { Video, Clock, Phone, Heart, Stethoscope, ShieldCheck, Activity, Cpu } from "lucide-react";

const services = [
  { title: "Comprehensive Specialties", icon: <Stethoscope size={28} /> },
  { title: "Research and Development", icon: <Cpu size={28} /> },
  { title: "Emergency Services", icon: <ShieldCheck size={28} /> },
  { title: "Advanced Imaging Services", icon: <Activity size={28} /> },
  { title: "Intensive Care Units (ICUs)", icon: <Heart size={28} /> },
  { title: "Rehabilitation Services", icon: <Video size={28} /> },
  { title: "Telemedicine Facilities", icon: <Clock size={28} /> },
  { title: "Patient-Centric Approach", icon: <Heart size={28} /> },
  { title: "Multidisciplinary Team", icon: <Stethoscope size={28} /> },
  { title: "Health Information Technology", icon: <Cpu size={28} /> },
];

const openHours = [
  { day: "Monday", hours: "09:30 - 07:30" },
  { day: "Tuesday", hours: "09:30 - 07:30" },
  { day: "Wednesday", hours: "09:30 - 07:30" },
  { day: "Thursday", hours: "09:30 - 07:30" },
  { day: "Friday", hours: "09:30 - 07:30" },
  { day: "Saturday", hours: "09:30 - 07:30" },
];

export default function InteractiveServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [tilePositions, setTilePositions] = useState<{ x: number; y: number }[]>([]);
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);

  // Update tile positions for SVG lines
  useEffect(() => {
    const updatePositions = () => {
      const allRefs = [...tileRefs.current, ...cardRefs.current];
      const positions = allRefs.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const parentRect = containerRef.current?.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - (parentRect?.left || 0),
          y: rect.top + rect.height / 2 - (parentRect?.top || 0),
        };
      });
      setTilePositions(positions);
    };
    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  return (
    <section className="relative w-full max-w-6xl mx-auto px-6 py-20">
      <div ref={containerRef} className="relative z-10">
        {/* Open Hours & Video Support */}
        <div className="grid sm:grid-cols-2 gap-8 mb-12">
          <motion.div
            ref={(el) => { cardRefs.current[0] = el; }}
            className="bg-white/10 backdrop-blur-3xl p-8 rounded-[2.5rem] shadow-xl border border-white/20 text-white hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Video size={28} />
              <h3 className="text-2xl font-bold">Video Call Support</h3>
            </div>
            <p className="text-white/80">Connect with our doctors anytime via video calls.</p>
          </motion.div>

          <motion.div
            ref={(el) => { cardRefs.current[1] = el; }}
            className="bg-white/10 backdrop-blur-3xl p-8 rounded-[2.5rem] shadow-xl border border-white/20 text-white hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Clock size={28} />
              <h3 className="text-2xl font-bold">Open Hours</h3>
            </div>
            <ul className="mt-2 space-y-1 text-white/80">
              {openHours.map((item, idx) => (
                <li key={idx} className="flex justify-between border-b border-white/20 py-1">
                  <span>{item.day}</span>
                  <span>{item.hours}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Service Tiles */}
        <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
          {services.map((service, idx) => (
            <motion.div
              ref={(el) => { tileRefs.current[idx] = el; }}
              key={idx}
              className="bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-white hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer relative"
              onHoverStart={() => setHoveredTile(idx)}
              onHoverEnd={() => setHoveredTile(null)}
              whileHover={{ rotateY: 10, rotateX: 5 }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-center font-semibold text-lg">{service.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* SVG Lines with hover particles */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {tilePositions.map((pos, idx) => {
          if (idx === tilePositions.length - 1) return null;
          const nextPos = tilePositions[idx + 1];
          return (
            <g key={idx}>
              <motion.line
                x1={pos.x}
                y1={pos.y}
                x2={nextPos.x}
                y2={nextPos.y}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={2}
                strokeLinecap="round"
              />
              {/* Particle moves only when hovering on connected tile */}
              {hoveredTile === idx || hoveredTile === idx + 1 ? (
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={4}
                  fill="rgba(255,255,255,0.7)"
                  animate={{
                    cx: [pos.x, nextPos.x],
                    cy: [pos.y, nextPos.y],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 1.5,
                    ease: "linear",
                  }}
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      {/* Contact Card */}
      <motion.div
        className="bg-white/10 backdrop-blur-3xl p-8 rounded-[3rem] shadow-xl text-center text-white border border-white/20 hover:scale-105 transition-transform duration-300 relative z-10 mt-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
          <Phone size={28} />
          <span className="text-xl font-bold">Contact us: +1 123 456 7890</span>
        </div>
      </motion.div>
    </section>
  );
}
