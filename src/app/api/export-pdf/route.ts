import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: Request) {
  try {
    const { html } = await req.json();

    // Lanzar navegador headless
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Cargar contenido HTML
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Generar PDF en buffer
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=manual.pdf",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error generando PDF" }, { status: 500 });
  }
}