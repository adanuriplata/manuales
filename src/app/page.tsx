"use client";

import { useState } from "react";
import ModuleSelector from "./components/ModuleSelector";
import PreviewManual from "./components/PreviewManual";

export default function Page() {
  const [selected, setSelected] = useState<string[]>([]);
  const [clientName, setClientName] = useState("");
  const [clientDomain, setClientDomain] = useState("");
  const [imageReplacements, setImageReplacements] = useState<Record<string, string>>({});

  const handleSelect = (keys: string[], name: string, domain: string, images: Record<string, string>) => {
    setSelected(keys);
    setClientName(name);
    setClientDomain(domain);
    setImageReplacements(images);
  };

  return (
    <main className="max-w-4xl mx-auto py-8">
      {!selected.length ? (
        <ModuleSelector onSelect={handleSelect} />
      ) : (
        <PreviewManual selected={selected} clientName={clientName} clientDomain={clientDomain} imageReplacements={imageReplacements} />
      )}
    </main>
  );
}