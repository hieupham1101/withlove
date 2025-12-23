"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getLS, setLS } from "@/lib/storage";

type HumHandle = { stop: () => void } | null;

function now(ctx: AudioContext) {
    return ctx.currentTime;
}

export function useSound() {
    const [enabled, setEnabled] = useState(true);
    const ctxRef = useRef<AudioContext | null>(null);
    const humRef = useRef<HumHandle>(null);

    useEffect(() => {
        setEnabled(getLS("soundOn", true));
    }, []);

    useEffect(() => {
        setLS("soundOn", enabled);
    }, [enabled]);

    const ctx = useMemo(() => {
        if (typeof window === "undefined") return null;
        return ctxRef.current;
    }, []);

    function ensureCtx(): AudioContext | null {
        if (typeof window === "undefined") return null;
        if (!ctxRef.current) {
            ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return ctxRef.current;
    }

    function tone(freq: number, dur = 0.08, type: OscillatorType = "sine", gain = 0.06) {
        if (!enabled) return;
        const c = ensureCtx();
        if (!c) return;

        // Resume if suspended (common browser policy)
        if (c.state === "suspended") {
            c.resume().catch(() => { });
        }

        const o = c.createOscillator();
        const g = c.createGain();
        o.type = type;
        o.frequency.setValueAtTime(freq, now(c));
        g.gain.setValueAtTime(0.0001, now(c));
        g.gain.exponentialRampToValueAtTime(gain, now(c) + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, now(c) + dur);

        o.connect(g);
        g.connect(c.destination);

        o.start();
        o.stop(now(c) + dur + 0.02);
    }

    function beep() {
        tone(740, 0.06, "square", 0.04);
    }

    function pop() {
        tone(420, 0.07, "triangle", 0.05);
        setTimeout(() => tone(620, 0.05, "triangle", 0.03), 40);
    }

    function ding() {
        tone(880, 0.10, "sine", 0.05);
        setTimeout(() => tone(1320, 0.08, "sine", 0.035), 70);
    }

    function tingLegend() {
        tone(1040, 0.12, "sine", 0.06);
        setTimeout(() => tone(1560, 0.10, "sine", 0.045), 80);
        setTimeout(() => tone(2080, 0.08, "sine", 0.03), 160);
    }

    function startHum(): HumHandle {
        if (!enabled) return null;
        const c = ensureCtx();
        if (!c) return null;

        if (c.state === "suspended") {
            c.resume().catch(() => { });
        }

        // stop previous
        humRef.current?.stop();

        const o = c.createOscillator();
        const g = c.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(90, now(c));

        g.gain.setValueAtTime(0.0001, now(c));
        g.gain.exponentialRampToValueAtTime(0.025, now(c) + 0.08);

        o.connect(g);
        g.connect(c.destination);
        o.start();

        const handle: HumHandle = {
            stop: () => {
                try {
                    g.gain.exponentialRampToValueAtTime(0.0001, now(c) + 0.10);
                    o.stop(now(c) + 0.12);
                } catch { }
            }
        };
        humRef.current = handle;
        return handle;
    }

    function stopHum() {
        humRef.current?.stop();
        humRef.current = null;
    }

    return {
        enabled,
        setEnabled,
        beep,
        pop,
        ding,
        tingLegend,
        startHum,
        stopHum
    };
}
