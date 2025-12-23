"use client";

import { useEffect, useState } from "react";
import type { ScanResult, ScanState, Step } from "@/lib/utils";
import { runScan } from "@/lib/scan";
import { getLS, setLS } from "@/lib/storage";

export function useScan() {
    const [step, setStep] = useState<Step>("intro");
    const [scanState, setScanState] = useState<ScanState>("idle");
    const [result, setResult] = useState<ScanResult | null>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(getLS("scanCount", 0));
    }, []);

    function incCount() {
        setCount((c) => {
            const next = c + 1;
            setLS("scanCount", next);
            return next;
        });
    }

    async function startScan() {
        if (scanState !== "idle") return;
        setScanState("scanning");
        incCount();

        // scanning 1.2s
        await new Promise((r) => setTimeout(r, 1200));
        setScanState("computing");

        // computing 1.0s
        await new Promise((r) => setTimeout(r, 1000));

        const out = runScan();
        setResult(out);
        setScanState("done");
        setStep("result");
    }

    function goIntro() {
        setScanState("idle");
        setStep("intro");
    }

    function goScan() {
        setScanState("idle");
        setStep("scan");
    }

    function resetToScan() {
        setScanState("idle");
        setStep("scan");
    }

    return {
        step,
        setStep,
        scanState,
        result,
        count,
        startScan,
        goIntro,
        goScan,
        resetToScan
    };
}
