# Million.js POC

Proof of concept comparing **Million.js** (block virtual DOM) against **plain React** rendering performance.

## Stack

- React 18 + Million.js 3
- Webpack 5 + SWC (TypeScript / TSX)
- Tailwind CSS v4

---

## Running

```bash
yarn install
yarn start     # dev server at http://localhost:5120
yarn build     # production bundle → dist/
```

---

## What's in the app

| Component | What it shows |
|-----------|--------------|
| `Counter` | Simple stateful component — automatically optimised by the compiler (auto mode) |
| `ItemList` | Dynamic list using Million.js `<For>` instead of `Array.map()` |
| `Benchmark` | Side-by-side stress test: Million.js vs plain React |

---

## How Million.js is applied

### 1. Auto mode (compiler plugin)

In `webpack.config.js` the webpack plugin is enabled with `auto: true`:

```js
import million from 'million/compiler';

plugins: [
  million.webpack({ auto: true }),
  // ...
]
```

This makes the compiler **automatically wrap eligible components** in `block()` at build time — no code changes needed.

### 2. Manual block (explicit, used in Benchmark)

```tsx
import { block } from 'million/react';

const OptimizedRow = block(function OptimizedRow({ row }) {
  return <div>{row.label} — {row.value}</div>;
});
```

### 3. `<For>` list primitive

Replaces `Array.map()` for keyed lists. Skips full reconciliation when items are added, removed, or reordered.

```tsx
import { For } from 'million/react';

<For each={items}>
  {(item) => <Row key={item.id} item={item} />}
</For>
```

---

## Stress benchmark

Open the **Benchmark** section in the running app:

1. Pick a row count (500 / 1000 / 2000 / 5000).
2. Click **Run** on the **Million.js** panel → wait for it to finish.
3. Click **Run** on the **Plain React** panel → wait for it to finish.
4. The **Results** table shows `updateMs` for each variant and the % difference.

The measured phase is the **update pass** — after rows are already rendered, all values are randomised simultaneously. This is where the block VDOM difference is most visible.

> **Tip:** run each side 2–3 times and compare the median. The first run includes JIT warm-up noise.

---

## Comparing with/without Million.js (webpack)

To get a pure React baseline with the **same code**:

1. Open `webpack.config.js`.
2. Comment out the plugin:

```js
plugins: [
  // million.webpack({ auto: true }),   ← disabled
  new MiniCssExtractPlugin({ ... }),
  new HtmlWebpackPlugin({ ... }),
],
```

3. Restart the dev server (`yarn start`).

Now the compiler no longer transforms any component. The `<For>` and `block()` imports still work (they fall back to standard React behaviour), so the code compiles without changes.

---

## Profiling with browser tools

### React DevTools Profiler

1. Install [React DevTools](https://react.dev/learn/react-developer-tools) browser extension.
2. Open **Profiler** tab → click Record → interact with the benchmark → stop.
3. Inspect per-component render times in the flame graph.

### Chrome Performance tab

1. Open DevTools → **Performance** → Record.
2. Click **Run** on one of the benchmark panels.
3. Stop recording and look at the **Main** thread timeline.
4. Scripting time is lower for Million.js-optimised components because static parts of the VDOM are compiled away.

---

## How Million.js speeds things up

```
Standard React VDOM          Million.js block VDOM
─────────────────────        ──────────────────────────
Diff entire subtree          Only diff "holes" (dynamic parts)
Every render recreates       Static structure compiled once
  the full VDOM tree           at build time; skipped at runtime
```

The gain is most visible on:
- **Large flat lists** with frequent value updates (use `<For>`)
- **Complex leaf components** that re-render often but have little actual change
- **Tables / data grids** with many rows

It has minimal effect on:
- Components that already re-render infrequently
- Components whose entire output changes on every update
