const countGenerator = function* () {
  console.log('gen: passo 1');
  yield 'a';

  console.log('gen: passo 2');
  yield 'b';

  console.log('gen: passo 3');
  return 'fim';
};

function* cores() {
  yield 'vermelho';
  yield 'verde';
  yield 'azul';
}

function countNormal() {
  return 42;
}

export default function Generators() {

  function renderColors() {
    const list = [];
    for (const cor of cores()) {
      list.push(<li key={cor}>{cor}</li>);
    }
    return list;
  }

  return (
    <div>
      <h1>Generators</h1>

      <button onClick={() => {
        const gen = countGenerator();
        console.log(gen.next());
        console.log(gen.next());
        console.log(gen.next());
        console.log(gen.next());
      }}>
        Generator
      </button>

      <br />

      <button onClick={() => {
        const normal = countNormal();
        console.log(normal);
      }}>
        Normal
      </button>

      <br />

      <h2>Lista de cores</h2>
      <ul>
        {[...cores()].map((cor) => (
          <li key={cor}>{cor}</li>
        ))}
      </ul>
      <br />
      <ul>
        {Array.from(cores()).map((cor) => (
          <li key={cor}>{cor}</li>
        ))}
      </ul>
      <br />
      <ul>
        {renderColors()}
      </ul>
      <br />
      <p>this not work:</p>
      <ul>
        {cores().map((cor) => (
          <li key={cor}>{cor}</li>
        ))}
      </ul>
    </div>
  );
}