"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import BackgroundStage from "@/components/BackgroundStage";
import IntroScreen from "@/components/IntroScreen";
import ScannerDevice from "@/components/ScannerDevice";
import ResultCard from "@/components/ResultCard";
import { useScan } from "@/hooks/useScan";
import { useSound } from "@/hooks/useSound";
import HealingMusicButton from "@/components/HealingMusicButton";

export default function Page() {
    const scan = useScan();
    const sound = useSound();

    // keyboard shortcuts
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") {
                if (scan.step === "result") scan.resetToScan();
            }
            if (e.key === "Enter") {
                if (scan.step === "scan" && scan.scanState === "idle") {
                    sound.beep();
                    sound.startHum();
                    scan.startScan().finally(() => sound.stopHum());
                }
            }
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scan.step, scan.scanState]);

    // when scanning completes -> play result sound
    useEffect(() => {
        if (scan.step === "result" && scan.result) {
            sound.stopHum();
            if (scan.result.score >= 95) sound.tingLegend();
            else sound.ding();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scan.step]);

    function goToScan() {
        try {
            sound.pop?.();
        } catch { }
        scan.goScan();
    }

    function handleScanClick() {
        try {
            sound.beep();
            sound.startHum();
        } catch { }

        scan.startScan().finally(() => {
            try {
                sound.stopHum();
            } catch { }
        });
    }

    function rescan() {
        // stay in scan step and run again
        scan.resetToScan();
        setTimeout(() => handleScanClick(), 250);
    }

    return (
        <main className="relative min-h-screen">
            <BackgroundStage />

            {/* Top bar */}
            <div className="relative z-10 mx-auto flex max-w-4xl items-center justify-between px-4 pt-5">
                <div className="text-xs font-semibold text-slate-600">
                    Bội đã quét: <span className="font-extrabold text-slate-900">{scan.count}</span> lần
                </div>

                <div className="flex items-center gap-3">
                    <HealingMusicButton />
                    <button
                        onClick={() => sound.setEnabled(!sound.enabled)}
                        className="cursor-pointer rounded-2xl border border-white/60 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-700 shadow-soft backdrop-blur hover:bg-white"
                    >
                        {sound.enabled ? "🔊 Sound: ON" : "🔇 Sound: OFF"}
                    </button>
                </div>
            </div>

            <div className="relative z-10">
                <AnimatePresence mode="wait">
                    {scan.step === "intro" ? (
                        <IntroScreen key="intro" onContinue={goToScan} />
                    ) : null}

                    {scan.step === "scan" ? (
                        <ScannerDevice
                            key="scan"
                            scanning={scan.scanState === "scanning"}
                            computing={scan.scanState === "computing"}
                            onScan={handleScanClick}
                            onBack={scan.goIntro}
                        />
                    ) : null}

                    {scan.step === "result" && scan.result ? (
                        <ResultCard key="result" result={scan.result} onRescan={rescan} onBack={scan.resetToScan} />
                    ) : null}
                </AnimatePresence>
            </div>
        </main>
    );
}
