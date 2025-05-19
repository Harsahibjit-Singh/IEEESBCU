import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind CSS class names conditionally and merges them smartly.
 * Example:
 * cn("p-2", isActive && "bg-blue-500") => "p-2 bg-blue-500"
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
