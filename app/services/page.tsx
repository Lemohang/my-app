"use client";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Stethoscope, Pill, Activity, Users } from "lucide-react";

export default function ServicesPage() {
  const services = [
    { name: "General Consultation", icon: Stethoscope, category: "Consultation", popular: true },
    { name: "Vaccinations", icon: Pill, category: "Diagnostics" },
    { name: "Surgery", icon: Activity, category: "Surgery", popular: true },
    { name: "Telehealth", icon: Users, category: "Telehealth" },
    { name: "Lab Tests", icon: Pill, category: "Diagnostics" },
    { name: "Specialist Referral", icon: Stethoscope, category: "Consultation" },
  ];

  const categories = ["All", "Consultation", "Diagnostics", "Surgery", "Telehealth"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredServices = useMemo(() => {
    if (selectedCategory === "All") return services;
    return services.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 to-teal-900 relative overflow-hidden text-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-5xl font-extrabold drop-shadow-[0_0_15px_cyan]">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-cyan-100/80">
            Explore our wide range of healthcare services tailored for your needs.
          </p>
        </div>

        {/* Category Filters */}
        <motion.div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-blue-400 to-teal-400 text-black shadow-lg"
                  : "bg-black/30 text-cyan-200 hover:bg-blue-500 hover:text-white shadow-md"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                className={`relative flex flex-col items-center p-8 rounded-3xl shadow-2xl transition-all duration-300 ${
                  service.popular
                    ? "bg-gradient-to-br from-blue-400 to-teal-400 text-black shadow-[0_0_30px_cyan]"
                    : "bg-black/30 backdrop-blur-md text-white shadow-lg"
                }`}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px cyan" }}
              >
                {service.popular && (
                  <motion.span
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold bg-white text-blue-600 shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Popular
                  </motion.span>
                )}

                <Icon className={`w-12 h-12 mb-4 ${service.popular ? "text-black" : "text-cyan-400"}`} />
                <h3 className="text-xl font-bold drop-shadow-[0_0_10px_cyan]">{service.name}</h3>
                <p className="text-center text-cyan-100/80">
                  {service.category} service to meet your health needs efficiently.
                </p>

                <motion.button
                  className={`mt-6 w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                    service.popular
                      ? "bg-black text-white hover:bg-gray-900 shadow-lg"
                      : "bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg"
                  }`}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,255,0.8)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
