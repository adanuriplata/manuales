"use client";

import { useState } from "react";
import ModuleSelector from "./components/ModuleSelector";
import PreviewManual from "./components/PreviewManual";

export default function Page() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <main className="max-w-4xl mx-auto py-8">
      {!selected.length ? (
        <ModuleSelector onSelect={setSelected} />
      ) : (
        <PreviewManual selected={selected} />
      )}
    </main>
  );
}