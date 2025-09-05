import { promises as fs } from "fs";
import path from "path";
import { marked } from "marked";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export async function getModuleContent(key: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), "src/content", `${key}.md`);
    const markdown = await fs.readFile(filePath, "utf-8");
    
    // Primero parsear el markdown y luego reemplazar las URLs
    const html = await marked.parse(markdown);
    
    // Reemplazar URLs relativas de imágenes
    return html.replace(
      /<img src="([^"]+)"/g, 
      (match, src) => {
        const fullSrc = src.startsWith('http') ? src : `${baseUrl}${src}`;
        return `<img src="${fullSrc}"`;
      }
    );
  } catch (error) {
    return `<p>⚠️ No se encontró contenido para <strong>${key}</strong></p>`;
  }
}