# Web Component POC

A proof of concept comparing a **React component** and a **native Web Component** implementing the same counter UI, side by side in the same React app.

## What it demonstrates

- How to define a custom element using the native Web Components API (`HTMLElement` + `customElements.define`)
- How to use Shadow DOM for style encapsulation inside a Web Component
- How to embed a custom element (`<wc-counter />`) directly in JSX alongside a React component (`<ReactCounter />`)
- The rendering and state management difference between React's virtual DOM and manual DOM re-rendering

## Project structure

```
src/
├── counter-wc.js      # Native Web Component (WcCounter custom element)
├── ReactCounter.jsx   # Equivalent React counter component
├── App.jsx            # Renders both counters side by side
└── main.jsx           # React app entry point
```

## Key concepts

### Native Web Component (`counter-wc.js`)

- Extends `HTMLElement` and registers as `<wc-counter>`
- Uses Shadow DOM (`attachShadow({ mode: 'open' })`) to scope styles
- Manages state with a private class field (`#count`)
- Re-renders by replacing `shadowRoot.innerHTML` on each state change

### React Component (`ReactCounter.jsx`)

- Uses `useState` for count state
- Styled with global CSS classes from `App.css`
- Re-renders efficiently via React's reconciler

## Running the project

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see both counters.
