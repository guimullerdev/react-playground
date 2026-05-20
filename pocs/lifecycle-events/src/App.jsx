import "./App.css";

import Child from "./components/Child";
import Class from "./components/Class";
import Closure from "./components/staleClosure";

function App() {
  return (
    <section id="center">
      {/* <Child name="Guilherme" /> */}
      {/* <Class /> */}

      <br />

      <Closure />
    </section>
  );
}

export default App;
