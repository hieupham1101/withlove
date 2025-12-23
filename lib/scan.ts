import type { ScanResult, Tier, Reason } from "./utils";
import {
    REASON_BANK,
    RESULT_HEADLINES,
    RESULT_CLOSINGS,
    pickOne,
    ReasonDef
} from "./copy";

function clamp(n: number, a: number, b: number) {
    return Math.max(a, Math.min(b, n));
}

function pickWeighted<T>(items: { item: T; w: number }[]): T {
    const total = items.reduce((s, x) => s + x.w, 0);
    let r = Math.random() * total;
    for (const it of items) {
        r -= it.w;
        if (r <= 0) return it.item;
    }
    return items[items.length - 1].item;
}

function tierForScore(score: number): Tier {
    if (score >= 95) return "legend";
    if (score >= 80) return "peak";
    if (score >= 50) return "good";
    return "ok";
}

function randInt(a: number, b: number) {
    return Math.floor(a + Math.random() * (b - a + 1));
}

function parseForce(): { forceScore?: number; forceTier?: Tier } {
    if (typeof window === "undefined") return {};
    const url = new URL(window.location.href);
    const forceScore = url.searchParams.get("forceScore");
    const forceTier = url.searchParams.get("forceTier");
    const out: { forceScore?: number; forceTier?: Tier } = {};
    if (forceScore) out.forceScore = clamp(Number(forceScore), 0, 100);
    if (forceTier === "ok" || forceTier === "good" || forceTier === "peak" || forceTier === "legend") {
        out.forceTier = forceTier;
    }
    return out;
}

function scoreByTier(tier: Tier): number {
    if (tier === "legend") return randInt(95, 100);
    if (tier === "peak") return randInt(80, 94);
    if (tier === "good") return randInt(50, 79);
    return randInt(28, 49);
}

function pickTier(): Tier {
    return pickWeighted<Tier>([
        { item: "legend", w: 5 }, // ~5%
        { item: "peak", w: 35 },
        { item: "good", w: 45 },
        { item: "ok", w: 15 }
    ]);
}

function buildReasons(targetScore: number, tier: Tier): Reason[] {
    const reasons: Reason[] = [];
    const usedLabels = new Set<string>();

    // Filter bank excluding hidden
    const available = REASON_BANK.filter(r => !r.hidden);

    // Pick 3-4 reasons based on weights
    const count = randInt(3, 4);
    for (let i = 0; i < count; i++) {
        const pool = available.filter(r => !usedLabels.has(r.label));
        if (pool.length === 0) break;

        // transform for pickWeighted
        const pickedDef = pickWeighted(pool.map(r => ({ item: r, w: r.w })));
        usedLabels.add(pickedDef.label);

        reasons.push({
            label: pickedDef.label,
            value: randInt(pickedDef.min, pickedDef.max)
        });
    }

    // Calculate sum of chosen reasons
    const currentSum = reasons.reduce((sum, r) => sum + r.value, 0);

    // Add a "filler" reason to make the total score somewhat coherent (though not exact sum)
    // We want total displayed modifiers to suggest why the score is high/low.
    // But result.score is 0-100.
    // Let's just ensure we have "enough" reasons.
    // Actually, let's add a "Luck/Vibe" reason that adjusts towards the score if needed,
    // or just random.

    // Optional hidden meme reason logic
    // Legend: 40% chance, Peak: 15%, others: 5%
    let hiddenChance = 0.05;
    if (tier === "legend") hiddenChance = 0.40;
    else if (tier === "peak") hiddenChance = 0.15;

    if (Math.random() < hiddenChance) {
        const hiddenDef = REASON_BANK.find(r => r.hidden);
        if (hiddenDef) {
            reasons.push({
                label: hiddenDef.label,
                value: hiddenDef.max, // 999
                hidden: true
            });
        }
    }

    // Sort: standard first, hidden last
    return reasons.sort((a, b) => Number(!!a.hidden) - Number(!!b.hidden));
}

export function runScan(): ScanResult {
    const { forceScore, forceTier } = parseForce();

    let score: number;
    let tier: Tier;

    if (typeof forceScore === "number") {
        score = clamp(forceScore, 0, 100);
        tier = tierForScore(score);
    } else if (forceTier) {
        tier = forceTier;
        score = scoreByTier(tier);
    } else {
        tier = pickTier();
        score = scoreByTier(tier);
    }

    const reasons = buildReasons(score, tier);

    return {
        score,
        tier,
        reasons,
        headline: pickOne(RESULT_HEADLINES[tier]),
        closing: pickOne(RESULT_CLOSINGS[tier])
    };
}
