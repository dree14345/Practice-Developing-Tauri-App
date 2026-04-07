import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { Item } from "./types/item";

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const loadItems = async () => {
    const result = await invoke<Item[]>("get_items");
    setItems(result);
  };

  const addItem = async () => {
    if (!name.trim()) return;
    await invoke("create_item", { name, description });
    setName("");
    setDescription("");
    loadItems();
  };

  const deleteItem = async (id: number) => {
    await invoke("delete_item", { id });
    loadItems();
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-72 shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col p-5 gap-5">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Control Panel
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description..."
            rows={3}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 resize-none transition"
          />
          <button
            onClick={addItem}
            disabled={!name.trim()}
            className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium py-2 transition-colors"
          >
            Add Item
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="px-8 py-5 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-baseline gap-3">
          <h1 className="text-xl font-semibold">My Items</h1>
          <span className="text-sm text-gray-400 dark:text-gray-500">
            {items.length} {items.length === 1 ? "entry" : "entries"}
          </span>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400 dark:text-gray-600">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              </svg>
              <p className="text-sm">No items yet. Add one to get started.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-4 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-2">
                      {item.description || "No description"}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="shrink-0 text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 rounded-lg px-3 py-1.5 transition-colors"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
