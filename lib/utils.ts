import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type Step = "intro" | "scan" | "result";
export type ScanState = "idle" | "scanning" | "computing" | "done";
export type Tier = "ok" | "good" | "peak" | "legend";

export type Reason = {
    label: string;
    value: number; // displayed as +value
    hidden?: boolean;
};

export type ScanResult = {
    score: number; // 0..100
    tier: Tier;
    reasons: Reason[];
    headline: string;
    closing: string;
};
