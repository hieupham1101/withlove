"use client";

import { useMemo } from "react";

export default function SparklesOverlay({ strong }: { strong?: boolean }) {
    const pieces = useMemo(() => Array.from({ length: strong ? 16 : 10 }, (_, i) => i), [strong]);

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {pieces.map((i) => {
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const size = (strong ? 7 : 5) + Math.random() * (strong ? 12 : 8);
                const dur = (strong ? 6 : 8) + Math.random() * 6;
                const op = (strong ? 0.26 : 0.18) + Math.random() * 0.18;
                return (
                    <div
                        key={i}
                        className="absolute animate-floaty"
                        style={{
                            left: `${left}%`,
                            top: `${top}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                            opacity: op,
                            animationDuration: `${dur}s`
                        }}
                    >
                        <div className="h-full w-full rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.65)]" />
                    </div>
                );
            })}
        </div>
    );
}
