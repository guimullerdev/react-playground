import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                dark: {
                    primary: "#6366f1",
                    secondary: "#8b5cf6",
                    accent: "#f59e0b",
                    neutral: "#1e1b2e",
                    "base-100": "#0f0e17",
                    "base-200": "#1a1828",
                    "base-300": "#252336",
                    "base-content": "#e2e8f0",
                    info: "#38bdf8",
                    success: "#34d399",
                    warning: "#fbbf24",
                    error: "#f87171",
                },
                light: {
                    primary: "#4f46e5",
                    "primary-content": "#ffffff",
                    secondary: "#7c3aed",
                    "secondary-content": "#ffffff",
                    accent: "#d97706",
                    "accent-content": "#ffffff",
                    neutral: "#e5e7eb",
                    "base-100": "#f8f7ff",
                    "base-200": "#eeedf8",
                    "base-300": "#e0deef",
                    "base-content": "#1e1b2e",
                    info: "#0284c7",
                    "info-content": "#ffffff",
                    success: "#059669",
                    "success-content": "#ffffff",
                    warning: "#d97706",
                    "warning-content": "#ffffff",
                    error: "#dc2626",
                    "error-content": "#ffffff",
                },
            },
        ],
        defaultTheme: "dark",
    },
};

export default config;