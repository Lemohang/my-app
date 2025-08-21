"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const faqsList = [
    {
      q: "What are some random questions to ask?",
      a: "That's exactly the reason we created this random question generator. There are hundreds of random questions to choose from so you're able to find the perfect random question.",
    },
    {
      q: "Do you include common questions?",
      a: "This generator doesn't include most common questions. The thought is that you can come up with common questions on your own so most of the questions in this generator.",
    },
    {
      q: "Can I use this for 21 questions?",
      a: "Yes! there are two ways that you can use this question generator depending on what you're after. You can indicate that you want 21 questions generated.",
    },
    {
      q: "Are these questions for girls or for boys?",
      a: "The questions in this generator are gender neutral and can be used to ask either male or female (or any other gender the person identifies with).",
    },
    {
      q: "What do you wish you had more talent doing?",
      a: "If you've been searching for a way to get random questions, you've landed on the correct webpage. We created the Random Question Generator to ask you as many random questions as your heart desires.",
    },
    {
      q: "What are some random questions to ask?",
      a: "That's exactly the reason we created this random question generator. There are hundreds of random questions to choose from so you're able to find the perfect random question to ask friends.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12 mx-4 md:mx-8 leading-relaxed">
      {/* Heading */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-semibold text-cyan-50">
          Frequently Asked Questions
        </h1>
        <p className="text-blue-500 max-w-lg mx-auto">
          Answered all frequently asked questions. Can’t find the answer you’re looking for? Feel free to contact us.
        </p>
      </div>

      {/* FAQ Cards Container */}
      <div className="relative mt-10 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl sm:mx-auto p-6 rounded-xl bg-blue-50 dark:bg-blue-900">
        <div className="grid gap-2 md:grid-cols-2">
          {faqsList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border-b border-blue-200 dark:border-blue-700 py-3"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                    {item.q}
                  </span>
                  <span className="text-blue-400 text-xl">{isOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-2 text-blue-600 dark:text-blue-200"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
