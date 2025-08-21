"use client";

import { CardStack } from "./ui/card-stack";
import { cn } from "./ui/lib/utils";

// Utility to highlight part of a text
export const Highlight: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

// Card data
const CARDS = [
  {
    id: 0,
    name: "Manu Arora",
    designation: "Senior Software Engineer",
    content: (
      <p>
        These cards are amazing, <Highlight>I want to use them</Highlight> in my
        project. Framer motion is a godsend 🙏
      </p>
    ),
  },
  {
    id: 1,
    name: "Elon Musk",
    designation: "Senior Shitposter",
    content: (
      <p>
        I don&apos;t like this Twitter thing, <Highlight>deleting it right away</Highlight>. Instead, I
        would like to call it <Highlight>X.com</Highlight>.
      </p>
    ),
  },
  {
    id: 2,
    name: "Tyler Durden",
    designation: "Manager Project Mayhem",
    content: (
      <p>
        The first rule of <Highlight>Fight Club</Highlight> is that you do not talk about it. The
        second rule of <Highlight>Fight Club</Highlight> is that you DO NOT TALK about it.
      </p>
    ),
  },
];

const CustomerReviews: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">Our Customers</h2>
      
      </div>
      <div className="flex justify-center">
        <CardStack items={CARDS} />
      </div>
      <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mx-auto block">
  Leave a Review
</button>

    </section>
  );
};

export default CustomerReviews;
