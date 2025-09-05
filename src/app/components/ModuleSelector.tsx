"use client";

import { useState } from "react";
import modules from "@/data/modules.json";

export default function ModuleSelector({ onSelect }: { onSelect: (keys: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleModule = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };
console.log('selecionado', selected)
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Selecciona las secciones</h2>
      <ul className="space-y-2">
        {modules.map((m) => (
          <li key={m.key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selected.includes(m.key)}
              onChange={() => toggleModule(m.key)}
            />
            <span>{m.title}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onSelect(selected)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Generar Manual
      </button>
    </div>
  );
}