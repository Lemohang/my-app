"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface SlideData {
  title: string;
  subtitle: string;
  button: string;
  src: string;
}

interface CarouselProps {
  slides: SlideData[];
}

export default function SpecialistsCarousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState<number>(0);

  const handlePreviousClick = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextClick = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleSlideClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className="relative w-[70vmin] h-[70vmin] mx-auto">
      <ul
        className="absolute flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * (100 / slides.length)}%)` }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl type="previous" title="Previous" handleClick={handlePreviousClick} />
        <CarouselControl type="next" title="Next" handleClick={handleNextClick} />
      </div>
    </div>
  );
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef<number>(0);
  const yRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      slideRef.current.style.setProperty("--x", `${xRef.current}px`);
      slideRef.current.style.setProperty("--y", `${yRef.current}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    xRef.current = event.clientX - (rect.left + rect.width / 2);
    yRef.current = event.clientY - (rect.top + rect.height / 2);
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
    setHovered(false);
  };

  return (
    <li
      ref={slideRef}
      className={`flex flex-col items-center justify-center relative text-center text-white transition-all duration-500 w-[70vmin] h-[70vmin] mx-[4vmin] z-10 cursor-pointer`}
      onClick={() => handleSlideClick(index)}
      onMouseMove={(e) => {
        handleMouseMove(e);
        setHovered(true);
      }}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          current === index
            ? `scale(1) rotateX(calc(var(--y)/60deg)) rotateY(calc(var(--x)/60deg))`
            : "scale(0.95)",
      }}
    >
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl">
        <Image
          src={slide.src}
          alt={slide.title}
          fill
          className={`object-cover transition-transform duration-700 ${
            hovered && current === index ? "scale-110" : ""
          }`}
        />
        <div
          className={`absolute inset-0 bg-black/25 transition-opacity duration-500 ${
            hovered && current === index ? "bg-black/40" : ""
          }`}
        />
      </div>

      {/* Slide Content */}
      <div
        className={`relative p-8 transition-all duration-500 ${
          hovered && current === index ? "translate-y-0 opacity-100" : "translate-y-6 opacity-90"
        }`}
      >
        <h2 className="text-2xl md:text-4xl font-bold">{slide.title}</h2>
        <p className="mt-2 text-sm md:text-base text-white/90">{slide.subtitle}</p>
        {hovered && current === index && (
          <button className="mt-6 px-5 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-xl text-black font-semibold flex items-center gap-2 transition shadow-lg">
            {slide.button} <ArrowRight size={16} />
          </button>
        )}
      </div>
    </li>
  );
};

interface CarouselControlProps {
  type: "previous" | "next";
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({ type, title, handleClick }: CarouselControlProps) => (
  <button
    title={title}
    onClick={handleClick}
    className={`w-10 h-10 flex items-center justify-center mx-2 rounded-full bg-neutral-200 hover:bg-neutral-300 transition transform ${
      type === "previous" ? "rotate-180" : ""
    }`}
  >
    <ArrowRight className="text-neutral-600" />
  </button>
);
