import { invoke } from '@tauri-apps/api/core';
import { useState, useEffect } from 'react';

interface Item {
  id: number;
  name: string;
  description: string | null;
}

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const loadItems = async () => {
    const result = await invoke<Item[]>('get_items');
    setItems(result);
  };

  const addItem = async () => {
    await invoke('create_item', { name, description });
    setName('');
    setDescription('');
    loadItems();
  };

  const deleteItem = async (id: number) => {
    await invoke('delete_item', { id });
    loadItems();
  };

  useEffect(() => { loadItems(); }, []);

  return (
    <div>
      <h1>My Items</h1>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button onClick={addItem}>Add</button>

      {items.map(item => (
        <div key={item.id}>
          <strong>{item.name}</strong> — {item.description}
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}