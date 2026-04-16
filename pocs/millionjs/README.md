# Million.js POC

> A hands-on benchmark comparing **Million.js** (block virtual DOM) against plain **React 18** — including an honest look at when it helps and when it doesn't.

---

## What is Million.js?

Million.js is a drop-in performance layer for React. Instead of running React's standard virtual DOM diffing on every re-render, it compiles components into **blocks** — functions that patch only the parts of the DOM that actually changed.

```
Standard React VDOM                  Million.js block VDOM
────────────────────────             ──────────────────────────────
Re-creates full VDOM tree            Compiles static structure once
Diffs entire subtree                 Only patches "holes" (dynamic values)
Allocates new objects every render   Reuses compiled patch functions
```

The gain comes from skipping work that was never necessary in the first place.

---

## Running the POC

```bash
yarn install
yarn start    # → http://localhost:5120
yarn build    # production bundle → dist/
```

---

## How Million.js is applied

### 1 — Compiler (auto mode)

The webpack plugin scans your components at build time and automatically wraps eligible ones in `block()`. No code changes needed.

```js
// webpack.config.js
import million from 'million/compiler';

plugins: [
  million.webpack({ auto: true }),
]
```

### 2 — Manual `block()`

Wrap specific components explicitly for full control.

```tsx
import { block } from 'million/react';

const StockCard = block(function StockCard({ price, change, name }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <span className="price">{price}</span>
      <span className="change">{change}</span>
    </div>
  );
});
```

### 3 — `<For>` list primitive

Replaces `Array.map()` for keyed lists. Minimises reconciliation cost when items are added, removed, or reordered.

```tsx
import { For } from 'million/react';

<For each={items}>
  {(item) => <Row key={item.id} item={item} />}
</For>
```

---

## When Million.js wins

The block VDOM only pays off when a component has a **high static-to-dynamic ratio**: lots of stable HTML structure with few changing values.

### Good candidate — complex card, few dynamic holes

```tsx
// 15+ elements, only 2 update on re-render → block() skips 13
const MetricCard = block(function MetricCard({ value, trend }) {
  return (
    <article className="card">
      <header>
        <Icon name="chart" />
        <h2>Revenue</h2>          {/* static */}
        <Badge text="Live" />     {/* static */}
      </header>
      <section>
        <Sparkline />             {/* static */}
        <p className="value">{value}</p>    {/* hole */}
        <p className="trend">{trend}</p>    {/* hole */}
      </section>
      <footer>
        <span>Updated every 5s</span>      {/* static */}
        <HelpIcon />                       {/* static */}
      </footer>
    </article>
  );
});
```

### Bad candidate — mostly dynamic, little to skip

```tsx
// Almost everything changes → block() overhead exceeds savings
const Row = block(function Row({ color, label, value, status }) {
  return (
    <div className={color}>       {/* dynamic */}
      <span>{label}</span>        {/* dynamic */}
      <span>{value}</span>        {/* dynamic */}
      <span>{status}</span>       {/* dynamic */}
    </div>
  );
});
```

---

## Use case guide

| Use case | Benefit | Reason |
|---|---|---|
| Live data dashboard (metrics, stocks) | High | Same card layout, only numbers change at high frequency |
| Large data table with stable columns | High | Column structure is static, only cell values update |
| Chat / feed with rich message bubbles | High | Avatar, name, timestamp layout static; only content changes |
| Virtualized list with complex items | High | High re-render frequency amortises block setup cost |
| Simple list rows (2–3 dynamic fields) | None / negative | `block()` overhead exceeds VDOM diff savings |
| Components that rarely re-render | None | No frequency to amortise the setup cost |
| Conditional / dynamic structure | None | `block()` bails out — requires stable JSX shape |
| Initial render | Slight negative | Block compilation adds overhead on mount |

---

## Why results are inconsistent between runs

Running the same benchmark multiple times often gives different numbers. This is expected:

- **JIT warm-up** — V8 compiles your code on the first run. Subsequent runs are faster for both sides.
- **Garbage collection** — GC can pause either side at any point.
- **React 18 scheduler** — React may batch and defer work across frames.
- **Measurement timing** — `useEffect` fires after React commits to the DOM but before the browser paints. The recorded time is JS reconciliation + DOM mutation, not full wall-clock render time.

> Always run each side 3+ times and compare medians, not single samples.

---

## Stress benchmark (in-app)

Open the **Stress Benchmark** section in the running app:

1. Pick a row count — **500 / 1,000 / 2,000 / 5,000**.
2. Click **Run** on the Million.js panel and wait.
3. Click **Run** on the Plain React panel and wait.
4. The results table shows `updateMs` per variant and the % difference.

The measured phase is the **update pass**: after rows are rendered, all dynamic values are randomised simultaneously. This is where block VDOM difference is most observable.

---

## Disabling Million.js to compare

Comment out the plugin in `webpack.config.js` and restart the dev server:

```js
plugins: [
  // million.webpack({ auto: true }),   ← disabled
  new MiniCssExtractPlugin({ ... }),
  new HtmlWebpackPlugin({ ... }),
]
```

The `block()` and `<For>` imports still compile — they fall back to standard React behaviour — so no other code needs to change.

---

## Real-world expectations

The benchmark numbers cited in Million.js marketing (up to 70% faster) are measured against a specific table pattern with complex rows and only 2–3 dynamic cells per component — the ideal scenario.

In practice:

- **10–30% improvement** in high-frequency update scenarios with the right component shape
- **Near zero** for components that re-render infrequently
- **Negative** for simple or mostly-dynamic components

Million.js is not a silver bullet. It is a precise tool for a specific bottleneck: components with stable structure that re-render often.

---

## Stack

| Tool | Version |
|---|---|
| React | 18 |
| Million.js | 3 |
| Webpack | 5 |
| SWC | latest |
| Tailwind CSS | 4 |
