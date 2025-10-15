import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusVariant = (status: string) => {
  switch (status) {
    case "Əmr var":
      return "success";
    case "Əmr gözləyir":
      return "warning";
    default:
      return "error";
  }
};
