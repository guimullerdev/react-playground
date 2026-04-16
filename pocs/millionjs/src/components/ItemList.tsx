import { useState, useCallback } from 'react';
import { For } from 'million/react';

interface Item {
  id: number;
  label: string;
  done: boolean;
}

let nextId = 1;

function createItem(): Item {
  return { id: nextId++, label: `Task #${nextId - 1}`, done: false };
}

function ItemRow({ item, onToggle, onRemove }: {
  item: Item;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <li className="flex items-center justify-between px-4 py-2 bg-white rounded-xl shadow-sm">
      <span
        className={`cursor-pointer select-none ${item.done ? 'line-through text-gray-400' : 'text-gray-700'}`}
        onClick={() => onToggle(item.id)}
      >
        {item.label}
      </span>
      <button
        onClick={() => onRemove(item.id)}
        className="text-xs text-red-400 hover:text-red-600 transition"
      >
        Remove
      </button>
    </li>
  );
}

function ItemList() {
  const [items, setItems] = useState<Item[]>(() =>
    Array.from({ length: 10 }, createItem)
  );

  const addItem = useCallback(() => {
    setItems(prev => [...prev, createItem()]);
  }, []);

  const toggleItem = useCallback((id: number) => {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, done: !item.done } : item)
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700">
          Task List <span className="text-indigo-400">({items.length})</span>
        </h2>
        <button
          onClick={addItem}
          className="px-4 py-1.5 bg-indigo-500 text-white text-sm rounded-xl hover:bg-indigo-600 active:scale-95 transition"
        >
          + Add Task
        </button>
      </div>

      <ul className="flex flex-col gap-2 max-h-72 overflow-y-auto">
        <For each={items}>
          {(item) => (
            <ItemRow
              key={item.id}
              item={item}
              onToggle={toggleItem}
              onRemove={removeItem}
            />
          )}
        </For>
      </ul>
    </div>
  );
}

export default ItemList;
