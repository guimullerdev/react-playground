import { useState, useRef, useCallback, useEffect } from 'react';
import { block, For } from 'million/react';

interface Row {
  id: number;
  value: number;
  delta: number;
  label: string;
  color: string;
  status: 'active' | 'idle' | 'pending';
}

const COLORS = ['bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100'];
const STATUSES: Row['status'][] = ['active', 'idle', 'pending'];
const STATUS_COLORS: Record<Row['status'], string> = {
  active: 'text-green-600',
  idle: 'text-gray-400',
  pending: 'text-yellow-500',
};

function makeRows(count: number): Row[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    value: Math.floor(Math.random() * 100_000),
    delta: Math.floor(Math.random() * 200) - 100,
    label: `Item #${String(i).padStart(4, '0')}`,
    color: COLORS[i % COLORS.length],
    status: STATUSES[i % STATUSES.length],
  }));
}

const OptimizedRow = block(function OptimizedRow({ row }: { row: Row }) {
  return (
    <div className={`grid grid-cols-4 items-center px-3 py-1.5 rounded text-xs gap-2 ${row.color}`}>
      <span className="font-medium truncate">{row.label}</span>
      <span className={`font-semibold text-center ${STATUS_COLORS[row.status]}`}>{row.status}</span>
      <span className="font-mono text-right">{row.value.toLocaleString()}</span>
      <span className={`font-mono text-right ${row.delta >= 0 ? 'text-green-600' : 'text-red-500'}`}>
        {row.delta >= 0 ? '+' : ''}{row.delta}
      </span>
    </div>
  );
});

function PlainRow({ row }: { row: Row }) {
  return (
    <div className={`grid grid-cols-4 items-center px-3 py-1.5 rounded text-xs gap-2 ${row.color}`}>
      <span className="font-medium truncate">{row.label}</span>
      <span className={`font-semibold text-center ${STATUS_COLORS[row.status]}`}>{row.status}</span>
      <span className="font-mono text-right">{row.value.toLocaleString()}</span>
      <span className={`font-mono text-right ${row.delta >= 0 ? 'text-green-600' : 'text-red-500'}`}>
        {row.delta >= 0 ? '+' : ''}{row.delta}
      </span>
    </div>
  );
}

interface Result {
  label: string;
  renderMs: number;
  updateMs: number;
  rows: number;
}

const ROW_COUNTS = [500, 1000, 2000, 5000];

function BenchmarkPanel({
  label,
  accentClass,
  useOptimized,
  rowCount,
  onResult,
}: {
  label: string;
  accentClass: string;
  useOptimized: boolean;
  rowCount: number;
  onResult: (r: Result) => void;
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [running, setRunning] = useState(false);
  const renderStart = useRef(0);
  const phase = useRef<'idle' | 'initial' | 'update'>('idle');

  useEffect(() => {
    if (phase.current === 'idle') return;

    const elapsed = performance.now() - renderStart.current;

    if (phase.current === 'initial') {
      phase.current = 'update';
      const updateStart = performance.now();
      renderStart.current = updateStart;
      setRows(prev => prev.map(r => ({
          ...r,
          value: Math.floor(Math.random() * 100_000),
          delta: Math.floor(Math.random() * 200) - 100,
          status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
        })));
    } else if (phase.current === 'update') {
      phase.current = 'idle';
      onResult({ label, renderMs: 0, updateMs: elapsed, rows: rowCount });
      setRunning(false);
    }
  });

  const run = useCallback(() => {
    setRunning(true);
    phase.current = 'initial';
    renderStart.current = performance.now();
    setRows(makeRows(rowCount));
  }, [rowCount, label]);

  const clear = useCallback(() => {
    setRows([]);
    phase.current = 'idle';
  }, []);

  return (
    <div className="flex-1 min-w-0 border rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className={`font-semibold text-sm ${accentClass}`}>{label}</h3>
        <div className="flex gap-2">
          <button
            onClick={run}
            disabled={running}
            className="px-3 py-1 text-xs bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-40 transition"
          >
            {running ? 'Running…' : 'Run'}
          </button>
          <button
            onClick={clear}
            disabled={running}
            className="px-3 py-1 text-xs bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:opacity-40 transition"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-0.5 overflow-y-auto max-h-64">
        {useOptimized ? (
          <For each={rows}>
            {(row) => <OptimizedRow key={row.id} row={row} />}
          </For>
        ) : (
          rows.map(row => <PlainRow key={row.id} row={row} />)
        )}
      </div>

      {rows.length === 0 && (
        <p className="text-xs text-gray-400 text-center py-4">Press Run to render {rowCount} rows</p>
      )}
    </div>
  );
}

function ResultsTable({ results }: { results: Result[] }) {
  if (results.length === 0) return null;

  const million = results.find(r => r.label.includes('Million'));
  const react = results.find(r => r.label.includes('React'));
  const faster = million && react
    ? ((react.updateMs - million.updateMs) / react.updateMs * 100).toFixed(1)
    : null;

  return (
    <div className="mt-4 bg-gray-50 rounded-xl p-4 text-sm">
      <h3 className="font-semibold text-gray-700 mb-3">Results (update pass)</h3>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="text-left pb-1">Variant</th>
            <th className="text-right pb-1">Update (ms)</th>
            <th className="text-right pb-1">Rows</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="py-1">{r.label}</td>
              <td className="text-right py-1 font-mono">{r.updateMs.toFixed(2)}</td>
              <td className="text-right py-1 font-mono">{r.rows}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {faster && (
        <p className="mt-2 text-indigo-600 font-semibold text-xs">
          Million.js was {Number(faster) > 0 ? `~${faster}% faster` : `~${Math.abs(Number(faster))}% slower`} on updates
        </p>
      )}
    </div>
  );
}

function Benchmark() {
  const [rowCount, setRowCount] = useState(1000);
  const [results, setResults] = useState<Result[]>([]);

  const handleResult = useCallback((r: Result) => {
    setResults(prev => {
      const next = prev.filter(x => x.label !== r.label);
      return [...next, r];
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold text-gray-700">Stress Benchmark</h2>
        <div className="flex items-center gap-2 text-sm">
          <label className="text-gray-500">Rows:</label>
          {ROW_COUNTS.map(n => (
            <button
              key={n}
              onClick={() => { setRowCount(n); setResults([]); }}
              className={`px-3 py-1 rounded-lg text-xs transition ${rowCount === n
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {n.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400">
        Both panels render {rowCount.toLocaleString()} rows. Click <strong>Run</strong> on each side, then
        compare the update time in the results table below.
      </p>

      <div className="flex gap-4">
        <BenchmarkPanel
          label="Million.js (block + For)"
          accentClass="text-indigo-600"
          useOptimized
          rowCount={rowCount}
          onResult={handleResult}
        />
        <BenchmarkPanel
          label="Plain React"
          accentClass="text-gray-600"
          useOptimized={false}
          rowCount={rowCount}
          onResult={handleResult}
        />
      </div>

      <ResultsTable results={results} />
    </div>
  );
}

export default Benchmark;
