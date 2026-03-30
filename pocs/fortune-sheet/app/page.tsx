'use client';

import { useState, useRef, useCallback, useEffect } from "react";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css";

const ROWS = 1_000;
const COLS = 1_000;

type CellData = {
  r: number;
  c: number;
  v: {
    v: string | number;
    ct: { fa: string; t: string };
    bl?: number;
    bg?: string;
    fc?: string;
  };
};

type Sheet = {
  name: string;
  row: number;
  column: number;
  celldata: CellData[];
};

function colLabel(index: number): string {
  let label = "";
  let n = index + 1;
  while (n > 0) {
    const rem = (n - 1) % 26;
    label = String.fromCharCode(65 + rem) + label;
    n = Math.floor((n - 1) / 26);
  }
  return label;
}

function generateSheet(): { sheet: Sheet; elapsed: number } {
  const t0 = performance.now();
  const celldata: CellData[] = [];

  for (let c = 0; c < COLS; c++) {
    celldata.push({
      r: 0,
      c,
      v: {
        v: colLabel(c),
        bl: 1,
        bg: "#1e3a5f",
        fc: "#ffffff",
        ct: { fa: "General", t: "g" },
      },
    });
  }

  for (let r = 1; r < ROWS; r++) {
    celldata.push({
      r,
      c: 0,
      v: {
        v: r,
        bl: 1,
        bg: "#1e3a5f",
        fc: "#ffffff",
        ct: { fa: "General", t: "n" },
      },
    });
  }

  for (let r = 1; r < ROWS; r++) {
    for (let c = 1; c < COLS; c++) {
      celldata.push({
        r,
        c,
        v: {
          v: r * c,
          ct: { fa: "General", t: "n" },
        },
      });
    }
  }

  const elapsed = performance.now() - t0;
  const sheet: Sheet = {
    name: `${ROWS}×${COLS} Stress`,
    row: ROWS,
    column: COLS,
    celldata,
  };
  return { sheet, elapsed };
}

function Metric({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 8,
        padding: "8px 16px",
        minWidth: 130,
      }}
    >
      <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: color ?? "#7dd3fc" }}>
        {value}
        {unit && <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.7, marginLeft: 3 }}>{unit}</span>}
      </div>
    </div>
  );
}

export default function StressTest() {
  const [phase, setPhase] = useState<"idle" | "generating" | "rendering" | "done">("idle");
  const [genMs, setGenMs] = useState<number | null>(null);
  const [renderMs, setRenderMs] = useState<number | null>(null);
  const [ops, setOps] = useState(0);
  const [sheetData, setSheetData] = useState<Sheet[] | null>(null);
  const renderStart = useRef<number | null>(null);
  const firstRender = useRef(true);

  const totalCells = ROWS * COLS;

  const handleStart = useCallback(() => {
    setPhase("generating");
    setGenMs(null);
    setRenderMs(null);
    setOps(0);
    firstRender.current = true;

    setTimeout(() => {
      const { sheet, elapsed } = generateSheet();
      setGenMs(Math.round(elapsed));
      setSheetData([sheet]);
      setPhase("rendering");
      renderStart.current = performance.now();
    }, 50);
  }, []);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (phase !== "rendering" || !wrapperRef.current) return;

    const observer = new MutationObserver(() => {
      if (firstRender.current && renderStart.current !== null) {
        firstRender.current = false;
        const ms = Math.round(performance.now() - renderStart.current);
        observer.disconnect();
        setTimeout(() => {
          setRenderMs(ms);
          setPhase("done");
        }, 0);
      }
    });

    observer.observe(wrapperRef.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [phase]);

  const statusColor =
    phase === "idle" ? "#94a3b8"
      : phase === "generating" ? "#fbbf24"
        : phase === "rendering" ? "#38bdf8"
          : "#4ade80";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#0f172a", color: "#e2e8f0", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>

      <header style={{ padding: "10px 20px", background: "#0f172a", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 8 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#7dd3fc" }}>⚡ FortuneSheet Stress Test</span>
          <span style={{ fontSize: 12, background: "rgba(125,211,252,0.12)", color: "#7dd3fc", padding: "2px 8px", borderRadius: 20, border: "1px solid rgba(125,211,252,0.25)" }}>
            {ROWS.toLocaleString()} rows × {COLS.toLocaleString()} cols
          </span>
        </div>

        <Metric label="Total cells" value={totalCells.toLocaleString()} />
        {genMs !== null && <Metric label="Data generation" value={genMs} unit="ms" color="#fbbf24" />}
        {renderMs !== null && <Metric label="First render" value={renderMs} unit="ms" color="#4ade80" />}
        <Metric label="Ops recorded" value={ops} color="#c4b5fd" />

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
          <span style={{ fontSize: 12, color: statusColor, textTransform: "uppercase", letterSpacing: 1 }}>
            {phase === "idle" ? "● idle"
              : phase === "generating" ? "◌ generating…"
                : phase === "rendering" ? "◌ rendering…"
                  : "● done"}
          </span>
          <button
            onClick={handleStart}
            disabled={phase === "generating" || phase === "rendering"}
            style={{
              padding: "7px 18px",
              borderRadius: 6,
              border: "none",
              background: phase === "done" ? "#1d4ed8" : "#2563eb",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              cursor: phase === "generating" || phase === "rendering" ? "not-allowed" : "pointer",
              opacity: phase === "generating" || phase === "rendering" ? 0.5 : 1,
              transition: "opacity 0.2s",
              fontFamily: "inherit",
            }}
          >
            {phase === "done" ? "↺ Re-run" : "▶ Run test"}
          </button>
        </div>
      </header>

      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>


        {phase === "idle" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, opacity: 0.6 }}>
            <div style={{ fontSize: 64 }}>📊</div>
            <div style={{ fontSize: 16 }}>Press <strong>Run test</strong> to generate and render {totalCells.toLocaleString()} cells</div>
          </div>
        )}


        {(phase === "generating" || phase === "rendering") && !sheetData && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12 }}>
            <div style={{ fontSize: 40, animation: "spin 1s linear infinite" }}>⚙️</div>
            <div style={{ fontSize: 15, color: "#fbbf24" }}>
              {phase === "generating" ? "Generating 1 million cells…" : "Handing data to FortuneSheet…"}
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {sheetData && (
          <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
            <Workbook
              data={sheetData}
              onChange={() => { }}
              onOp={() => setTimeout(() => setOps((n) => n + 1), 0)}
            />
          </div>
        )}
      </div>
    </div>
  );
}