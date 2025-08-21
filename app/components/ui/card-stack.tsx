"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

interface CardStackProps {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
  cardClassName?: string; // optional extra class
}

export const CardStack: React.FC<CardStackProps> = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
  cardClassName = "",
}) => {
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!); // move last to front
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className={`absolute h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 flex flex-col justify-between shadow-lg border border-blue-200 bg-white text-blue-700 ${cardClassName}`}
          style={{
            transformOrigin: "top center",
          }}
          animate={{
            top: index * -offset,
            scale: 1 - index * scaleFactor,
            zIndex: cards.length - index,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="font-normal text-blue-700">{card.content}</div>
          <div>
            <p className="text-blue-600 font-medium">{card.name}</p>
            <p className="text-blue-500 font-normal">{card.designation}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
