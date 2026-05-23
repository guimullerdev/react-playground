import "./App.css";
import UserFetch from "./components/AbortController";

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

      <br />

      <UserFetch userId={10}/>
    </section>
  );
}

export default App;
