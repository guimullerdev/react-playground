import { ReactCounter } from './ReactCounter'
import './counter-wc.js'

import './App.css'

function App() {
  return (
    <>
      <section id="center">
        <div>
          <h1>React and Web Component</h1>
        </div>
        <div className="counters-row">
          <ReactCounter />
          <div className="counters-divider" />
          <wc-counter />
        </div>
      </section>
    </>
  )
}

export default App
