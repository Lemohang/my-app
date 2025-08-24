"use client";
import { useState, useMemo } from "react";
import { motion } from "motion/react";

export default function AIRecommendationsPricing() {
  const plans = [
    {
      name: "Free",
      basePrice: 0,
      features: ["Basic Health Dashboard", "Patient Overview", "Limited Appointments"],
      typeOptions: ["Clinic", "Hospital", "Research Center"],
      regionOptions: ["Africa", "Europe", "Asia", "Americas"],
      sizeOptions: ["Small", "Medium"],
      loadOptions: ["Low", "Medium"],
    },
    {
      name: "Standard",
      basePrice: 35,
      features: ["Advanced Dashboard", "Unlimited Appointments", "AI Recommendations", "Patient Analytics"],
      typeOptions: ["Hospital", "Research Center"],
      regionOptions: ["Europe", "Asia", "Americas"],
      sizeOptions: ["Medium", "Large"],
      loadOptions: ["Medium", "High"],
      popular: true,
    },
    {
      name: "Premium",
      basePrice: 60,
      features: ["Full Analytics & Insights", "Custom Reports", "AI-Powered Patient Care", "Priority Support", "Integrations & API Access"],
      typeOptions: ["Hospital", "Specialized Care"],
      regionOptions: ["Global"],
      sizeOptions: ["Large"],
      loadOptions: ["High"],
    },
  ];

  const [selectedType, setSelectedType] = useState("Hospital");
  const [selectedRegion, setSelectedRegion] = useState("Europe");
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [selectedLoad, setSelectedLoad] = useState("Medium");

  // Assign weight scores for sizes & loads
  const sizeScoreMap: Record<string, number> = { Small: 10, Medium: 20, Large: 30 };
  const loadScoreMap: Record<string, number> = { Low: 5, Medium: 15, High: 25 };

  // Dynamic AI scoring & pricing
  const scoredPlans = useMemo(() => {
    return plans.map(plan => {
      let score = 0;
      let dynamicPrice = plan.basePrice;

      if (plan.typeOptions.includes(selectedType)) score += 50;
      if (plan.regionOptions.includes(selectedRegion)) score += 30;
      if (plan.sizeOptions.includes(selectedSize)) {
        score += sizeScoreMap[selectedSize];
        dynamicPrice += sizeScoreMap[selectedSize] * 0.5;
      }
      if (plan.loadOptions.includes(selectedLoad)) {
        score += loadScoreMap[selectedLoad];
        dynamicPrice += loadScoreMap[selectedLoad] * 0.7;
      }

      // Popular plans get extra bump
      if (plan.popular) score += 15;

      return { ...plan, score, price: dynamicPrice };
    });
  }, [selectedType, selectedRegion, selectedSize, selectedLoad]);

  // Determine best recommendation
  const recommendedPlan = useMemo(() => {
    return scoredPlans.reduce((prev, curr) => (curr.score > prev.score ? curr : prev), scoredPlans[0]);
  }, [scoredPlans]);

  const allTypes = [...new Set(plans.flatMap(p => p.typeOptions))];
  const allRegions = [...new Set(plans.flatMap(p => p.regionOptions))];
  const allSizes = ["Small", "Medium", "Large"];
  const allLoads = ["Low", "Medium", "High"];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 to-teal-900 relative overflow-hidden">
      <div className="relative max-w-screen-xl mx-auto px-6 md:px-8 text-gray-200">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-5xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]">
            AI-Powered Health Pricing
          </h2>
          <p className="mt-4 text-lg text-cyan-100/80">
            Interactive pricing that recommends the best plan for your hospital type, region, size, and patient load.
          </p>
        </div>

        {/* Filters with multi-card style */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[
            { label: "Hospital Type", value: selectedType, setValue: setSelectedType, options: allTypes },
            { label: "Region", value: selectedRegion, setValue: setSelectedRegion, options: allRegions },
            { label: "Size", value: selectedSize, setValue: setSelectedSize, options: allSizes },
            { label: "Patient Load", value: selectedLoad, setValue: setSelectedLoad, options: allLoads },
          ].map((filter, idx) => (
            <div key={idx} className="bg-black/30 border border-cyan-400/50 rounded-3xl shadow-xl p-6 backdrop-blur-md">
              <label className="text-cyan-300 font-semibold mb-2 block">{filter.label}</label>
              <select
                value={filter.value}
                onChange={e => filter.setValue(e.target.value)}
                className="p-3 rounded-xl border border-cyan-400 bg-black/20 text-white shadow-md backdrop-blur-sm focus:ring-2 focus:ring-cyan-400 w-full"
              >
                {filter.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {scoredPlans.map((plan, idx) => {
            const isRecommended = plan.name === recommendedPlan.name;
            return (
              <motion.div
                key={idx}
                className={`relative flex flex-col p-8 rounded-3xl border shadow-2xl bg-black/30 backdrop-blur-md text-white ${
                  isRecommended ? "border-cyan-400 shadow-[0_0_30px_cyan]" : "border-cyan-400/50"
                }`}
                whileHover={{ scale: 1.05, boxShadow: isRecommended ? "0 0 50px cyan" : "0 0 20px rgba(0,255,255,0.5)" }}
                transition={{ duration: 0.3 }}
              >
                {isRecommended && (
                  <motion.span
                    className="absolute top-4 right-4 inline-block px-3 py-1 text-sm font-semibold rounded-full bg-cyan-500 text-black shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Recommended
                  </motion.span>
                )}

                <h4 className="text-xl font-bold drop-shadow-[0_0_10px_cyan]">{plan.name}</h4>
                <div className="mt-4 text-3xl font-extrabold drop-shadow-[0_0_10px_cyan]">
                  ${plan.price.toFixed(0)} <span className="text-lg font-medium">/mo</span>
                </div>

                <ul className="py-6 space-y-3 flex-1">
                  {plan.features.map((f, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.4 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 flex-shrink-0 text-cyan-400 drop-shadow-[0_0_5px_cyan]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {f}
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  className="mt-auto w-full py-3 rounded-lg font-semibold bg-cyan-500 text-black hover:bg-cyan-400 active:bg-cyan-600 transition shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,255,0.8)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
