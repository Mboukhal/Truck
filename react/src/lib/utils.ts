import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatTimeString = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':');
  return `${hours}:${minutes}`;
}

export const dateFormater = (date: Date | string | null) => {
  if (!date) return "Unknown";
  if (!(date instanceof Date))
    date = new Date(date);

  if (date instanceof Date)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  return date;
};
