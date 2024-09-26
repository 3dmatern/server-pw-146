import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...values: string[]) {
    return twMerge(clsx(values));
};