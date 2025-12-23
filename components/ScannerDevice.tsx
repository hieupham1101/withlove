"use client";

import { motion, AnimatePresence } from "framer-motion";
import HUDPanel from "./HUDPanel";
import { cn } from "@/lib/utils";
import { SCAN_SUBTITLES, TIPS, pickOne } from "@/lib/copy";
import { useEffect, useState } from "react";

function jitter(base: number) {
    return Math.max(8, Math.min(98, base + Math.floor((Math.random() - 0.5) * 18)));
}

export default function ScannerDevice({
    scanning,
    computing,
    onScan,
    onBack
}: {
    scanning: boolean;
    computing: boolean;
    onScan: () => void;
    onBack: () => void;
}) {
    const active = scanning || computing;

    const metrics = [
        { label: "Bình tĩnh", value: active ? jitter(72) : 72 },
        { label: "Tập trung", value: active ? jitter(76) : 76 },
        { label: "Trúng tủ", value: active ? jitter(58) : 58 },
        { label: "Năng lượng", value: active ? jitter(66) : 66 }
    ];

    const [subtitleIdx, setSubtitleIdx] = useState(0);
    const [tip, setTip] = useState("");

    useEffect(() => {
        setTip(pickOne(TIPS));
    }, []);

    useEffect(() => {
        if (!scanning && !computing) {
            const interval = setInterval(() => {
                setSubtitleIdx((prev) => (prev + 1) % SCAN_SUBTITLES.length);
            }, 3500);
            return () => clearInterval(interval);
        }
    }, [scanning, computing]);

    return (
        <div className="mx-auto w-full max-w-3xl px-4 pb-10 pt-10">
            <div className="mx-auto mb-6 max-w-xl text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-700 via-fuchsia-600 to-sky-600 drop-shadow-sm">
                    Máy Quét Aura Sĩ Tử
                </h2>

                <div className="relative mt-2 h-6 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={subtitleIdx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-sm text-slate-600 md:text-base absolute inset-0 text-center"
                        >
                            {active ? "Đang kết nối vũ trụ..." : SCAN_SUBTITLES[subtitleIdx]}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>

            <div className="mx-auto grid max-w-3xl grid-cols-12 gap-4">
                {/* scanner */}
                <div className="col-span-12 md:col-span-7">
                    <div className="glass relative overflow-hidden rounded-3xl p-5 shadow-glow">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/0" />

                        {/* ring */}
                        <div className="relative mx-auto mt-2 flex aspect-square w-full max-w-[360px] items-center justify-center">
                            {/* outer glow */}
                            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.26),transparent_62%)]" />

                            <motion.div
                                className="absolute inset-4 rounded-full border border-cyan-200/70 bg-white/35 backdrop-blur"
                                animate={scanning ? { rotate: 360 } : { rotate: 0 }}
                                transition={scanning ? { duration: 1.2, repeat: Infinity, ease: "linear" } : { duration: 0.4 }}
                            />

                            <motion.div
                                className="absolute inset-7 rounded-full border-2 border-cyan-400/70 shadow-[0_0_50px_rgba(34,211,238,0.22)]"
                                animate={scanning ? { rotate: -360 } : { rotate: 0 }}
                                transition={scanning ? { duration: 1.0, repeat: Infinity, ease: "linear" } : { duration: 0.4 }}
                            />

                            {/* orb */}
                            <motion.div
                                className={cn(
                                    "relative flex h-[68%] w-[68%] items-center justify-center rounded-full bg-gradient-to-br from-violet-500/25 via-sky-400/20 to-fuchsia-500/20 shadow-soft",
                                    !active && "cursor-pointer hover:bg-white/10"
                                )}
                                onClick={!active ? onScan : undefined}
                                animate={scanning ? { scale: [1, 1.02, 1], rotate: [0, 2, -2, 0] } : { scale: 1, rotate: 0 }}
                                transition={scanning ? { duration: 1.0, repeat: Infinity } : { duration: 0.3 }}
                                whileHover={!active ? { scale: 1.02 } : {}}
                                whileTap={!active ? { scale: 0.98 } : {}}
                            >
                                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.55),transparent_40%)]" />
                                <div className="text-center">
                                    <div className="text-5xl">🪄</div>
                                    <div className="mt-1 text-xs font-semibold text-slate-700">Aura</div>
                                </div>
                            </motion.div>

                            {/* scan beam */}
                            <motion.div
                                className={cn(
                                    "pointer-events-none absolute left-1/2 top-0 h-10 w-[78%] -translate-x-1/2 rounded-full",
                                    "bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent blur-[0.5px]"
                                )}
                                initial={{ y: 0, opacity: 0 }}
                                animate={
                                    scanning
                                        ? { y: ["6%", "78%", "6%"], opacity: [0.0, 0.95, 0.0] }
                                        : { y: "6%", opacity: 0 }
                                }
                                transition={scanning ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
                            />
                        </div>

                        {/* status */}
                        <div className="relative z-10 mt-4 flex items-center justify-between gap-2">
                            <div className="text-xs font-semibold text-slate-700">
                                Trạng thái:{" "}
                                <span className="font-extrabold">
                                    {scanning ? "Đang quét…" : computing ? "Đang tính toán…" : "Sẵn sàng"}
                                </span>
                            </div>

                            <motion.button
                                onClick={onBack}
                                disabled={active}
                                className={cn(
                                    "rounded-2xl border border-slate-200 bg-white/40 px-4 py-2 text-sm font-semibold text-slate-700 shadow-soft backdrop-blur hover:bg-white/60 focus:ring-2 focus:ring-slate-300",
                                    active ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                )}
                                whileHover={!active ? { scale: 1.02, x: -2 } : {}}
                                whileTap={!active ? { scale: 0.98 } : {}}
                            >
                                Xem lại ảnh 😼
                            </motion.button>

                            <motion.button
                                onClick={onScan}
                                disabled={active}
                                className={cn(
                                    "rounded-2xl px-4 py-2 text-sm font-semibold text-white shadow-glow outline-none focus:ring-2 focus:ring-violet-400",
                                    active
                                        ? "bg-slate-400 cursor-not-allowed"
                                        : "cursor-pointer bg-gradient-to-r from-violet-600 via-fuchsia-600 to-sky-600"
                                )}
                                whileHover={!active ? { scale: 1.02 } : {}}
                                whileTap={!active ? { scale: 0.98 } : {}}
                            >
                                {active ? "Đang xử lý…" : "Quét aura sĩ tử"}
                            </motion.button>
                        </div>

                        {/* Helper text */}
                        <div className="mt-3 text-center">
                            <span className="text-[10px] text-slate-500 opacity-80">
                                Tip: bấm vào vòng Aura cũng quét được.
                            </span>
                        </div>

                        {/* progress */}
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"
                                initial={{ width: "12%" }}
                                animate={
                                    scanning
                                        ? { width: ["18%", "65%", "35%", "78%"] }
                                        : computing
                                            ? { width: ["78%", "100%"] }
                                            : { width: "12%" }
                                }
                                transition={scanning ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.8 }}
                            />
                        </div>
                    </div>
                </div>

                {/* HUD */}
                <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-1 gap-3">
                        {metrics.map((m) => (
                            <HUDPanel key={m.label} label={m.label} value={m.value} active={active} />
                        ))}
                    </div>

                    <div className="mt-4 glass rounded-3xl p-4 shadow-soft">
                        <div className="text-xs font-semibold text-slate-600">Mẹo nhanh</div>
                        <div className="mt-2 text-sm text-slate-800">
                            {tip}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
