// lib/utils.ts

import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for merging Tailwind + conditional classes.
 *
 * Example:
 *   cn("px-4", condition && "bg-red-500", "text-white")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
