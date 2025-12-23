"use client";

import { useEffect, useMemo, useState } from "react";
import { animate, motion } from "framer-motion";
import type { ScanResult } from "@/lib/utils";
import SparklesOverlay from "./SparklesOverlay";
import ConfettiBurst from "./ConfettiBurst";
import { cn } from "@/lib/utils";

function tierLabel(score: number) {
    if (score >= 95) return "Huyền thoại";
    if (score >= 80) return "Đỉnh";
    if (score >= 50) return "Ngon rồi";
    return "Ổn áp";
}

export default function ResultCard({
    result,
    onRescan,
    onBack
}: {
    result: ScanResult;
    onRescan: () => void;
    onBack: () => void;
}) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        setDisplay(0);
        const controls = animate(0, result.score, {
            duration: 0.85,
            ease: "easeOut",
            onUpdate: (v) => setDisplay(Math.round(v))
        });
        return () => controls.stop();
    }, [result.score]);

    const legend = result.score >= 95;
    const sparkle = result.score >= 80;

    const chip = useMemo(() => tierLabel(result.score), [result.score]);

    const tierGlow = useMemo(() => {
        switch (result.tier) {
            case "legend": return "shadow-[0_0_60px_rgba(234,179,8,0.4)] border-yellow-200";
            case "peak": return "shadow-[0_0_60px_rgba(168,85,247,0.35)] border-violet-200";
            case "good": return "shadow-[0_0_50px_rgba(59,130,246,0.25)] border-blue-200";
            default: return "shadow-[0_12px_40px_rgba(0,0,0,0.08)] border-slate-200";
        }
    }, [result.tier]);

    const buffTitle = useMemo(() => {
        const titles = [
            "Phân tích các buff đang kích hoạt",
            "Buff log: những thứ đang cộng điểm",
            "Checklist buff điểm (đọc cho vui thôi 😼)",
            "Các buff đang gánh team",
            "Buff list: cộng đâu ra đó"
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }, []);

    return (
        <motion.div
            className="mx-auto w-full max-w-3xl px-4 pb-10 pt-10"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
        >
            <div className="mx-auto mb-6 max-w-xl text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-700 via-fuchsia-600 to-sky-600 drop-shadow-sm">
                    Kết quả quét aura ✨
                </h2>
                <p className="mt-2 text-sm text-slate-600 md:text-base">{result.headline}</p>
            </div>

            <div className="relative mx-auto max-w-3xl">
                <ConfettiBurst show={legend} />

                <div className={cn("glass shimmer-sweep relative overflow-hidden rounded-3xl p-6 transition-all duration-700", tierGlow)}>
                    {sparkle && <SparklesOverlay strong={legend} />}

                    {/* Close icon */}
                    <button
                        onClick={onBack}
                        className="absolute right-3 top-3 cursor-pointer rounded-xl bg-white/70 px-3 py-2 text-sm font-bold text-slate-700 shadow-soft backdrop-blur hover:bg-white"
                        aria-label="Đóng"
                    >
                        ✕
                    </button>

                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 shadow-soft backdrop-blur">
                            <span>🏷️</span>
                            <span>{chip}</span>
                        </div>

                        <div className="mt-1">
                            <div className="text-sm font-semibold text-slate-600">Độ đỉnh bài thi</div>
                            <div className="mt-1 text-6xl font-extrabold tracking-tight text-slate-900">
                                {display}
                                <span className="ml-1 text-2xl font-extrabold text-slate-700">%</span>
                            </div>
                        </div>

                        <div className="mt-2 w-full max-w-xl">
                            <div className="text-xs font-semibold text-slate-600">{buffTitle}</div>

                            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {result.reasons.map((r, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-left text-sm text-slate-800 shadow-soft backdrop-blur"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.08 + idx * 0.06 }}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="font-semibold">
                                                {r.label}
                                                {r.hidden ? <span className="ml-2 text-xs text-slate-500">(bí mật)</span> : null}
                                            </div>
                                            <div className={cn("font-extrabold", r.hidden ? "text-violet-700" : "text-slate-900")}>
                                                +{r.value}
                                            </div>
                                        </div>
                                        {r.hidden ? (
                                            <div className="mt-1 text-xs text-slate-600">Buff này hiếm lắm đó 😼</div>
                                        ) : null}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-4 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-glow">
                                {result.closing}
                            </div>

                            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <motion.button
                                    onClick={onRescan}
                                    className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-glow outline-none focus:ring-2 focus:ring-violet-400 sm:w-auto"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Quét lại ✨
                                </motion.button>
                                <button
                                    onClick={onBack}
                                    className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 shadow-soft backdrop-blur hover:bg-white sm:w-auto"
                                >
                                    Quay lại máy quét
                                </button>
                            </div>

                            <div className="mt-5 text-center text-xs text-slate-500">from: người luôn đứng phe em</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
