"use client";

import Image from "next/image";
import replaceableImages from "@/data/replaceable-images.json";

interface ImageReplacerProps {
  activeModules: string[];
  replacements: Record<string, string>;
  onChange: (replacements: Record<string, string>) => void;
}

export default function ImageReplacer({ activeModules, replacements, onChange }: ImageReplacerProps) {
  const images = replaceableImages.filter((img) => activeModules.includes(img.module));

  if (!images.length) return null;

  const handleFile = (key: string, src: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ ...replacements, [src]: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (src: string) => {
    const next = { ...replacements };
    delete next[src];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">Imágenes personalizables (opcional)</h3>
      <div className="space-y-3">
        {images.map((img) => {
          const replaced = replacements[img.src];
          return (
            <div key={img.key} className="flex items-center gap-3 p-3 border rounded-md bg-gray-50">
              <div className="w-16 h-12 relative flex-shrink-0 border rounded overflow-hidden bg-white">
                <Image
                  src={replaced ?? img.src}
                  alt={img.label}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{img.label}</p>
                {replaced && (
                  <p className="text-xs text-green-600">Imagen personalizada</p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <label className="cursor-pointer px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  {replaced ? "Cambiar" : "Subir"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(img.key, img.src, file);
                    }}
                  />
                </label>
                {replaced && (
                  <button
                    onClick={() => handleRemove(img.src)}
                    className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Quitar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
