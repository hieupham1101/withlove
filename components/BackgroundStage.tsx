"use client";

import { useMemo } from "react";

type Spark = { x: number; y: number; s: number; d: number; o: number };

export default function BackgroundStage() {
    const sparks = useMemo<Spark[]>(() => {
        const arr: Spark[] = [];
        for (let i = 0; i < 12; i++) {
            arr.push({
                x: Math.random() * 100,
                y: Math.random() * 100,
                s: 6 + Math.random() * 12,
                d: 8 + Math.random() * 10,
                o: 0.18 + Math.random() * 0.18
            });
        }
        return arr;
    }, []);

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* base */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#F3E5F5_100%)]" />

            {/* glows */}
            <div className="absolute inset-0">
                <div className="absolute left-1/2 top-[18%] h-[540px] w-[780px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22),transparent_62%)]" />
                <div className="absolute left-1/2 top-[48%] h-[520px] w-[740px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16),transparent_62%)]" />
                <div className="absolute left-1/2 top-[72%] h-[520px] w-[740px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.12),transparent_65%)]" />
            </div>

            {/* subtle noise */}
            <div
                className="absolute inset-0 opacity-[0.06] mix-blend-multiply animate-grainMove"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")"
                }}
            />

            {/* sparkles */}
            <div className="absolute inset-0">
                {sparks.map((p, idx) => (
                    <div
                        key={idx}
                        className="absolute animate-floaty"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.s}px`,
                            height: `${p.s}px`,
                            opacity: p.o,
                            animationDuration: `${p.d}s`
                        }}
                    >
                        <div className="h-full w-full rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.55)]" />
                    </div>
                ))}
            </div>
        </div>
    );
}
