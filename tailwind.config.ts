import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        },
        grainMove: {
          "0%": { transform: "translate(0,0)" },
          "100%": { transform: "translate(-2%, -2%)" }
        }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 1.2s ease-in-out",
        grainMove: "grainMove 6s linear infinite"
      },
      boxShadow: {
        soft: "0 12px 40px rgba(0,0,0,0.10)",
        glow: "0 0 0 1px rgba(255,255,255,0.35), 0 18px 60px rgba(124,58,237,0.18)"
      }
    }
  },
  plugins: []
};

export default config;
