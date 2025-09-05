"use client";

import logo from "@/../public/logoPortada.png";
import modules from "@/data/modules.json";
import { useEffect, useState } from "react";

export default function PreviewManual({ selected }: { selected: string[] }) {
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadContent() {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keys: selected }),
      });
      const data = await res.json();
      setContent(data);
    }
    loadContent();
  }, [selected]);

  const selectedModules = modules.filter(
    (m) => selected.includes(m.key) || !m.isOptional
  );

  const handleExportPDF = async () => {
    const selectedModules = modules.filter(
      (m) => selected.includes(m.key) || !m.isOptional
    );

    // Convertir la imagen a Base64
    const getBase64Image = async (src: string) => {
      const response = await fetch(src);
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const logoBase64 = await getBase64Image(logo.src);
    const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
          .cover { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; background: #fff; }
          .cover h1 { font-size: 36px; color: #2c3e50; }
          .cover h2 { font-size: 20px; color: #555; margin-top: 10px; }
          .index { padding: 40px; }
          .index h2 { font-size: 24px; border-bottom: 2px solid #eee; margin-bottom: 20px; }
          .index ul { list-style: none; padding: 0; }
          .index li { font-size: 16px; margin: 8px 0; }
          .section { page-break-before: always; padding: 40px; }
          .section h2 { font-size: 22px; color: #2c3e50; margin-bottom: 10px; }
          .section p { font-size: 14px; line-height: 1.6; color: #333; }
        </style>
      </head>
      <body>
        <!-- Portada -->
        <div class="cover">
          <h1>Manual de WordPress</h1>
          <h2>Cliente: Mi Primer Cliente</h2>
          <img src="${logoBase64}" alt="Logo" />
          <p>Generado automáticamente</p>
        </div>

        <!-- Índice -->
        <div class="index">
          <h2>Índice</h2>
          <ul>
            ${selectedModules
              .map((m, idx) => `<li>${idx + 1}. ${m.title}</li>`)
              .join("")}
          </ul>
        </div>

        <!-- Secciones -->
        ${selectedModules
          .map(
            (m, idx) => `
              <div class="section">
                <h2>${idx + 1}. ${m.title}</h2>
                ${content[m.key] || `<p>Contenido no disponible</p>`}
              </div>
            `
          )
          .join("")}
      </body>
    </html>
  `;

    const res = await fetch("/api/export-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html }),
    });

    if (!res.ok) {
      alert("Error generando PDF");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manual.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  };
  console.log(selectedModules)
  console.log(content)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manual generado</h1>
      {selectedModules.map((m, idx) => (
        <div key={m.key} className="p-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            {idx + 1}. {m.title}
          </h2>
          <div
            className="prose max-w-none mt-2"
            dangerouslySetInnerHTML={{
              __html: content[m.key] || "<p>Cargando...</p>",
            }}
          />
        </div>
      ))}

      <button
        onClick={handleExportPDF}
        className="px-4 py-2 bg-green-600 text-white rounded-md"
      >
        Exportar PDF
      </button>
    </div>
  );
}
