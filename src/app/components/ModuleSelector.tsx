"use client";

import { useState } from "react";
import modules from "@/data/modules.json";
import ImageReplacer from "./ImageReplacer";

export default function ModuleSelector({
  onSelect,
}: {
  onSelect: (keys: string[], clientName: string, clientDomain: string, imageReplacements: Record<string, string>) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [clientName, setClientName] = useState("");
  const [clientDomain, setClientDomain] = useState("");
  const [imageReplacements, setImageReplacements] = useState<Record<string, string>>({});

  const toggleModule = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Selecciona las secciones</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Nombre del cliente</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Ej: Mi Empresa S.A."
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Dominio del sitio</label>
        <input
          type="text"
          value={clientDomain}
          onChange={(e) => setClientDomain(e.target.value)}
          placeholder="Ej: miempresa.com"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
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
      <ImageReplacer
        activeModules={selected}
        replacements={imageReplacements}
        onChange={setImageReplacements}
      />
      <button
        onClick={() => onSelect(selected, clientName, clientDomain, imageReplacements)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Generar Manual
      </button>
    </div>
  );
}
