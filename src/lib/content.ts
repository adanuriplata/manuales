import { promises as fs } from "fs";
import path from "path";
import { marked } from "marked";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const PLACEHOLDER_DOMAIN = "chingonera.com";

export async function getModuleContent(key: string, clientDomain?: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), "src/content", `${key}.md`);
    let markdown = await fs.readFile(filePath, "utf-8");

    if (clientDomain) {
      // Normalizar: quitar protocolo si el usuario lo incluyó
      const cleanDomain = clientDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");
      markdown = markdown.replaceAll(PLACEHOLDER_DOMAIN, cleanDomain);
    }

    const html = await marked.parse(markdown);

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