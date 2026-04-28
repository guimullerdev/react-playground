import './App.css';

import ArrowFunction from './components/ArrowFunctions';
import Destructuring from './components/Destructuring';
import SpreadOperator from './components/SpreadOperator';
import TemplateLiterals from './components/TemplateLiterals';
import DefaultParameters from './components/DefaultParameters';
import ArrayMethods from './components/ArrayMethods';
import Promises from './components/Promises';
import ShortCircuit from './components/ShortCircuit';

function App() {
  return (
    <>
      <section className="center">
        <ArrowFunction />
        <br />
        <Destructuring name="Dohn" />
        <br />
        <SpreadOperator />
        <br />
        <TemplateLiterals active={true} />
        <br />
        <DefaultParameters />
        <br />
        <DefaultParameters name="John" />
        <br />
        <ArrayMethods />
        <br />
        <Promises />
        <br />
        <ShortCircuit active={true} />
        <br />
        <ShortCircuit active={false} />
      </section>
    </>
  )
}

export default App
