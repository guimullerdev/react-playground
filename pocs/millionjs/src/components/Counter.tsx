import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center gap-4">
      <span className="text-6xl font-bold text-indigo-600">{count}</span>
      <div className="flex gap-3">
        <button
          onClick={() => setCount(c => c - 1)}
          className="px-5 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 active:scale-95 transition"
        >
          -1
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-5 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 active:scale-95 transition"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-5 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 active:scale-95 transition"
        >
          +1
        </button>
      </div>
    </div>
  );
}

export default Counter;
