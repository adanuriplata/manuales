import CoverPage from "./CoverPage";

interface Module {
  key: string;
  title: string;
  isOptional?: boolean;
}

interface PdfTemplateProps {
  selectedModules: Module[];
  content: Record<string, string>;
  clientName: string;
  logoBase64: string;
}

export default function PdfTemplate({
  selectedModules,
  content,
  clientName,
  logoBase64,
}: PdfTemplateProps) {


  return (
    <div>
      <CoverPage logoBase64={logoBase64} clientName={clientName} />

      <div className="index">
        <h2>Índice</h2>
        <ul>
          {selectedModules.map((m, idx) => (
            <li key={m.key}>{`${idx + 1}. ${m.title}`}</li>
          ))}
        </ul>
      </div>

      {selectedModules.map((m, idx) => (
        <div>
            <div key={m.key} className="section" dangerouslySetInnerHTML={{ __html: content[m.key] || `<p>Contenido para ${m.title} no disponible.</p>` }} />
        </div>
      ))}
    </div>
  );
}