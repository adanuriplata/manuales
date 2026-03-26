"use client";

import modules from "@/data/modules.json";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import PdfTemplate from "./PdfTemplate";
import { pdfStyles } from "../styles/pdf-styles";

export default function PreviewManual({ selected }: { selected: string[] }) {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isExporting, setIsExporting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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
    setIsExporting(true);

    // Generar el base64 del logo primero
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

    const logoBase64 = await getBase64Image("/logoPortada.png"); // Ajusta la ruta
    const logoHeaderBase64 = await getBase64Image("/logoEncabezado.png"); // Ajusta la ruta
    console.log('logoHeaderBase64', logoHeaderBase64)

    const bodyHtml = ReactDOMServer.renderToString(
      <PdfTemplate
        selectedModules={selectedModules}
        content={content}
        clientName="https://chingonera.com.mx"
        logoBase64={logoBase64}
      />
    );

    const html = `
      <html>
        <head>
          <style>${pdfStyles}</style>
        </head>
        <body>${bodyHtml}</body>
      </html>
    `;

    const res = await fetch("/api/export-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html, logoBase64: logoHeaderBase64, clientName: "https://chingonera.com.mx" }),
    });
    setIsExporting(false);

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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manual generado</h1>
      {showPreview ? (
        <div className="p-4 border rounded-lg shadow-lg bg-white">
          <style>{pdfStyles}</style>
          <PdfTemplate
            selectedModules={selectedModules}
            content={content}
            clientName="https://chingonera.com"
            logoBase64={""}
          />
        </div>
      ) : (
        <> </>
      )}
      {!showPreview &&
        selectedModules.map((m, idx) => (
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
        className="px-4 py-2 bg-green-600 text-white rounded-md disabled:bg-gray-400"
        disabled={isExporting}
      >
        {isExporting ? "Exportando..." : "Exportar PDF"}
      </button>
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="px-4 py-2 bg-green-600 text-white rounded-md disabled:bg-gray-400"
      >
        {showPreview ? "Cerrar Preview" : "Ver Preview"}
      </button>
    </div>
  );
}
