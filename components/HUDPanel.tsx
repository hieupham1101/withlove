"use client";

import { motion } from "framer-motion";

export default function HUDPanel({
    label,
    value,
    active
}: {
    label: string;
    value: number;
    active: boolean;
}) {
    return (
        <div className="glass rounded-2xl px-3 py-3 shadow-soft">
            <div className="text-[11px] font-semibold text-slate-600">{label}</div>
            <motion.div
                className="mt-1 text-lg font-extrabold text-slate-900"
                animate={active ? { opacity: [0.75, 1, 0.75] } : { opacity: 1 }}
                transition={active ? { duration: 1.2, repeat: Infinity } : {}}
            >
                {value}
                <span className="ml-1 text-xs font-bold text-slate-500">%</span>
            </motion.div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                    initial={{ width: `${value}%` }}
                    animate={active ? { width: [`${value}%`, `${Math.min(100, value + 14)}%`, `${value}%`] } : { width: `${value}%` }}
                    transition={active ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" } : { duration: 0.25 }}
                />
            </div>
        </div>
    );
}
