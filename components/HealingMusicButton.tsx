"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MUSIC_URL = "/bgm.mp3";

export default function HealingMusicButton() {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio
        const audio = new Audio(MUSIC_URL);
        audio.loop = true;
        audio.volume = 0.5;
        audioRef.current = audio;

        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (playing) {
            audioRef.current.pause();
            setPlaying(false);
        } else {
            // User interaction required to play
            audioRef.current.play().catch(err => {
                console.error("Audio play failed", err);
            });
            setPlaying(true);
        }
    };

    return (
        <button
            onClick={toggleMusic}
            className={cn(
                "group relative flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold backdrop-blur transition-all",
                playing
                    ? "bg-violet-100/80 text-violet-700 shadow-glow border border-violet-200"
                    : "bg-white/70 text-slate-700 hover:bg-white border border-white/60 shadow-soft"
            )}
        >
            <div className="relative flex h-4 w-4 items-center justify-center">
                {playing ? (
                    <div className="flex items-end gap-[2px] h-3">
                        <motion.div
                            className="w-1 bg-violet-500 rounded-full"
                            animate={{ height: ["20%", "100%", "20%"] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                        />
                        <motion.div
                            className="w-1 bg-violet-500 rounded-full"
                            animate={{ height: ["40%", "80%", "40%"] }}
                            transition={{ duration: 1.1, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                            className="w-1 bg-violet-500 rounded-full"
                            animate={{ height: ["30%", "90%", "30%"] }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: 0.1 }}
                        />
                    </div>
                ) : (
                    <span className="text-lg leading-none">🎵</span>
                )}
            </div>

            <span>{playing ? "Đang healing..." : "Nhạc chữa lành"}</span>

            {/* Ambient glow when playing */}
            {playing && (
                <motion.div
                    layoutId="glow"
                    className="absolute inset-0 -z-10 rounded-2xl bg-violet-400/20 blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
            )}
        </button>
    );
}
