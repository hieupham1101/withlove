"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { INTRO_CAPTIONS, pickN, pickOne } from "@/lib/copy";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Photo = { src: string; caption: string };

export default function IntroScreen({
    onContinue
}: {
    onContinue: () => void;
}) {
    // Client-side randomized content
    const [captions, setCaptions] = useState<string[]>([]);
    const [bubbles, setBubbles] = useState<string[]>([]);

    useEffect(() => {
        // Pick 4 unique captions
        setCaptions(pickN(INTRO_CAPTIONS, 4));
        // Pick 3 unique bubbles
        // setBubbles(pickN(INTRO_BUBBLES, 3));
    }, []);

    const photos: Photo[] = [
        { src: "/dim/1.jpg", caption: captions[0] || "..." },
        { src: "/dim/2.jpg", caption: captions[1] || "..." },
        { src: "/dim/3.jpg", caption: captions[2] || "..." },
        { src: "/dim/4.jpg", caption: captions[3] || "..." }
    ];

    return (
        <motion.div
            className="mx-auto w-full max-w-3xl px-4 pb-10 pt-10"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
        >
            <div className="mx-auto mb-5 max-w-xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs text-slate-700 shadow-soft backdrop-blur">
                    <span>😼</span>
                    <span>Hệ thống thi tốt</span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-transparent md:text-4xl bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-600 to-sky-600 drop-shadow-sm">
                    Trước khi thi… cho xem cái này đã
                </h1>
                <p className="mt-2 text-sm text-slate-600 md:text-base">
                    Phân tích tâm lý sĩ tử :)))
                </p>
            </div>

            {/* Collage */}
            <div className="mx-auto grid max-w-3xl grid-cols-12 gap-3">
                <motion.div
                    className="col-span-12 md:col-span-7 glass relative overflow-hidden rounded-3xl shadow-glow"
                    initial={{ opacity: 0, rotate: -2, y: 10 }}
                    animate={{ opacity: 1, rotate: 0, y: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    whileHover={{ y: -4 }}
                >
                    <div className="relative aspect-[4/3] w-full bg-slate-100">
                        {/* Placeholder gradient (visible if image fails) */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-100 to-fuchsia-100">
                            <span className="text-4xl opacity-50">😼</span>
                        </div>

                        <Image
                            src={photos[0].src}
                            alt="Ảnh dìm 1"
                            fill
                            className="object-cover transition-opacity duration-300"
                            onError={(e: any) => {
                                e.currentTarget.style.opacity = "0";
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                            <div className="inline-flex rounded-full bg-white/75 px-3 py-1 text-xs text-slate-800 shadow-soft backdrop-blur">
                                {photos[0].caption}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="col-span-12 grid grid-cols-12 gap-3 md:col-span-5">
                    {[1, 2, 3].map((idx, i) => (
                        <motion.div
                            key={idx}
                            className={cn(
                                "glass relative overflow-hidden rounded-3xl shadow-soft",
                                i === 0 ? "col-span-12" : "col-span-6"
                            )}
                            initial={{ opacity: 0, rotate: i === 0 ? 2 : i === 1 ? -3 : 3, y: 10 }}
                            animate={{ opacity: 1, rotate: i === 0 ? 0.5 : i === 1 ? -1 : 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.05 * i }}
                            whileHover={{ y: -4 }}
                        >
                            <div className="relative aspect-[4/3] w-full bg-slate-100">
                                {/* Placeholder gradient */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100">
                                    <span className="text-2xl opacity-40">📸</span>
                                </div>

                                <Image
                                    src={photos[idx].src}
                                    alt={`Ảnh dìm ${idx + 1}`}
                                    fill
                                    className="object-cover transition-opacity duration-300"
                                    onError={(e: any) => {
                                        e.currentTarget.style.opacity = "0";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                                <div className="absolute bottom-2 left-2 right-2">
                                    <div className="inline-flex rounded-full bg-white/75 px-2 py-1 text-[11px] text-slate-800 shadow-soft backdrop-blur">
                                        {photos[idx].caption}
                                    </div>
                                </div>
                            </div>

                            {/* if image missing, gradient placeholder still looks fine */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-200/40 via-sky-200/30 to-pink-200/40" />
                            <div className="pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-multiply" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bubbles */}
            <div className="mx-auto mt-6 max-w-2xl space-y-3">
                {bubbles.map((t, i) => (
                    <motion.div
                        key={i}
                        className={cn(
                            "max-w-[92%] rounded-3xl px-4 py-3 text-sm shadow-soft",
                            i === 0 ? "glass ml-0 mr-auto" : i === 1 ? "ml-auto mr-0 bg-violet-600 text-white" : "glass ml-0 mr-auto"
                        )}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.06 * i }}
                    >
                        {t}
                    </motion.div>
                ))}
            </div>

            {/* Buttons */}
            <div className="mx-auto mt-7 flex max-w-xl flex-col items-center justify-center gap-3 sm:flex-row">
                <motion.button
                    onClick={onContinue}
                    className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-glow outline-none focus:ring-2 focus:ring-violet-400 sm:w-auto"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Ok, vào quét aura ✨
                </motion.button>
                <button
                    onClick={onContinue}
                    className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 shadow-soft backdrop-blur hover:bg-white sm:w-auto"
                >
                    Bỏ qua
                </button>
            </div>
        </motion.div>
    );
}
