import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import _ from "lodash";
import { type LoaderProps } from "@/types/props-type";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalizeLetter = (words: string) => {
  return _.startCase(words);
};

export const getColorClass = (color: LoaderProps["color"]) => {
  switch (color) {
    case "white":
      return "text-white";
    case "blue":
      return "text-blue-500";
    case "green":
      return "text-green-500";
    case "red":
      return "text-red-500";
    case "yellow":
      return "text-yellow-500";
    default:
      return "text-black";
  }
};

export const getLoaderSize = (size: LoaderProps["size"]) => {
  switch (size) {
    case "xs":
      return "size-2";
    case "sm":
      return "size-4";
    case "md":
      return "size-6";
    case "lg":
      return "size-8";
    case "xl":
      return "size-10";
  }
};
