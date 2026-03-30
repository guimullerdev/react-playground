# 📊 FortuneSheet React — POC

A proof-of-concept exploring **[@fortune-sheet/react](https://github.com/ruilisi/fortune-sheet)** — a feature-rich, Excel-like spreadsheet component for React applications.

---

## 📁 Files

| File | Description |
|---|---|
| `FortuneSheetExample.tsx` | Simple usage: pre-populated Sales Q1 sheet with headers, data rows, formulas, and two tabs |
| `FortuneSheetStressTest.tsx` | Stress test: renders 1,000 × 1,000 cells (1M total) with live performance metrics |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install @fortune-sheet/react
```

### 2. Import the CSS

This is **required** — omitting it breaks the UI completely.

```ts
import "@fortune-sheet/react/dist/index.css";
```

### 3. Give the container a fixed height

The `<Workbook>` component needs a parent with an explicit height — it will not auto-size.

```tsx
<div style={{ height: "100vh" }}>
  <Workbook data={sheets} onChange={handleChange} />
</div>
```

---

## 🧩 Basic Usage (`FortuneSheetExample.tsx`)

```tsx
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css";

const sheets = [
  {
    name: "Sheet 1",
    celldata: [
      { r: 0, c: 0, v: { v: "Hello", ct: { fa: "General", t: "g" } } },
      { r: 0, c: 1, v: { v: 42,      ct: { fa: "General", t: "n" } } },
    ],
  },
];

export default function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Workbook
        data={sheets}
        onChange={(data) => console.log("updated:", data)}
        onOp={(op) => console.log("op:", op)}
      />
    </div>
  );
}
```

### Cell data structure

```ts
type CellData = {
  r: number;           // row index (0-based)
  c: number;           // column index (0-based)
  v: {
    v: string | number; // the cell value (or a formula string like "=A1+B1")
    ct: {
      fa: string;       // format — "General", "#,##0.00", etc.
      t:  string;       // type — "g" general | "n" number | "f" formula | "s" string
    };
    bl?: number;        // bold — 1 = bold
    fc?: string;        // font color (hex, e.g. "#ffffff")
    bg?: string;        // background color (hex)
  };
};
```

### Key props

| Prop | Type | Description |
|---|---|---|
| `data` | `Sheet[]` | Array of sheet objects |
| `onChange` | `(data: Sheet[]) => void` | Full data snapshot after any change |
| `onOp` | `(op: Op) => void` | Granular operation — ideal for undo stacks or collaboration |
| `row` | `number` | Number of rows in the sheet |
| `column` | `number` | Number of columns in the sheet |

---

## ⚡ Stress Test (`FortuneSheetStressTest.tsx`)

Renders **1,000 rows × 1,000 columns = 1,000,000 cells** and tracks two distinct performance phases:

| Metric | What it captures |
|---|---|
| **Data generation (ms)** | Time to build the 1M-cell JavaScript array in memory |
| **First render (ms)** | Time from passing data to `<Workbook>` until first DOM mutation (via `MutationObserver`) |
| **Ops recorded** | Live counter of every user interaction operation |

### Test data layout

```
     A      B      C    …   ALL
1   [hdr]   1×1    1×2  …   1×999
2   [hdr]   2×1    2×2  …   2×999
…
999 [hdr]  999×1  999×2 …  999×999
```

- **Row 0** — column labels (A → ALL)
- **Column 0** — row numbers (1 → 999)
- **All other cells** — `r × c` integer value

### Expected results

FortuneSheet virtualises the viewport, so the render time should stay low regardless of total cell count. The **data generation** phase (building the JS array) is typically the more significant bottleneck.

---

## ⚠️ Memory Limitations

FortuneSheet starts showing memory pressure at **~1 million cells (1,000 × 1,000)**:

- The JS array alone for 1M cells occupies hundreds of MBs in heap memory
- The browser tab may slow down, become unresponsive, or crash entirely depending on the device
- Observed symptoms: sluggish scrolling, delayed input response, and eventual out-of-memory errors in low-RAM environments

**Recommended limits for stable usage:**

| Scenario | Safe range |
|---|---|
| Interactive editing | up to ~100k cells (e.g. 1,000 × 100) |
| Read-only / display | up to ~500k cells with caution |
| Stress / benchmark only | 1M+ cells — expect instability |

If your use case requires very large datasets, consider paginating the data (loading visible ranges on demand) or pre-filtering server-side before passing data to the component.

---

## 🔍 Key Observations

- ✅ **Virtual rendering** — only visible cells are painted; scrolling through 1M cells remains smooth
- ✅ **Formula engine** — `=SUM(...)`, `=C2*D2`, and other Excel-style formulas work out of the box
- ✅ **Multi-sheet support** — pass multiple objects in the `data` array to get multiple tabs
- ✅ **Rich formatting** — bold, font color, background color, number formats all supported via cell metadata
- ⚠️ **Container height** — must be explicitly set; `height: auto` will result in a zero-height sheet
- ⚠️ **CSS import** — forgetting `@fortune-sheet/react/dist/index.css` will silently break the toolbar and grid

---

## 📚 References

- [FortuneSheet GitHub](https://github.com/ruilisi/fortune-sheet)
- [FortuneSheet Docs](https://ruilisi.github.io/fortune-sheet-docs/)
- [npm package](https://www.npmjs.com/package/@fortune-sheet/react)