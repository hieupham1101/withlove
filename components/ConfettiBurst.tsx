"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

export default function ConfettiBurst({ show }: { show: boolean }) {
    const confetti = useMemo(() => {
        return Array.from({ length: 34 }, (_, i) => ({
            id: i,
            x: (Math.random() - 0.5) * 320,
            y: 280 + Math.random() * 240,
            r: (Math.random() - 0.5) * 220,
            d: 0.8 + Math.random() * 0.5,
            s: 6 + Math.random() * 8
        }));
    }, []);

    if (!show) return null;

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {confetti.map((c) => (
                <motion.div
                    key={c.id}
                    className="absolute left-1/2 top-[22%] rounded-sm bg-gradient-to-r from-yellow-300 via-fuchsia-400 to-sky-400 shadow-soft"
                    style={{ width: c.s, height: c.s * 0.6 }}
                    initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
                    animate={{ x: c.x, y: c.y, rotate: c.r, opacity: [0, 1, 0.9, 0] }}
                    transition={{ duration: c.d, ease: "easeOut" }}
                />
            ))}
        </div>
    );
}
