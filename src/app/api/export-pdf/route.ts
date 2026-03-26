import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

// export async function POST(req: Request) {
//   try {
//     const { html } = await req.json();

//     // Lanzar navegador headless
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     // Cargar contenido HTML
//     await page.setContent(html, { waitUntil: "networkidle0" });

//     // Generar PDF en buffer
//     const pdfBuffer = await page.pdf({
//       format: "A4",
//       printBackground: true,
//       margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
//     });

//     await browser.close();

//     return new NextResponse(pdfBuffer, {
//       status: 200,
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": "attachment; filename=manual.pdf",
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Error generando PDF" }, { status: 500 });
//   }
// }

// api/export-pdf/route.ts

export async function POST(req: Request) {
  try {
    const { html, logoBase64, clientName } = await req.json();
    console.log('logoBase64', logoBase64)


    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: { top: "80px", bottom: "60px", left: "20mm", right: "20mm" },
      // margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
      displayHeaderFooter: true,
      headerTemplate: `
        <style>
          .header-content {
            width: 100%;
            font-size: 10px;
            padding: 8px 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        </style>
        <div class="header-content">
          <div style="width: 30%; text-align: left;">
            ${logoBase64 ? `<img src="${logoBase64}" style="height: 35px;" />` : ''}
          </div>
          <div style="width: 40%; text-align: center;">
            <!-- <strong>Manual de WordPress</strong> -->
          </div>
          <div style="width: 30%; text-align: right;">
           <!-- Pág. <span class="pageNumber"></span>/<span class="totalPages"></span> -->
          </div>
        </div>
      `,
      footerTemplate: `
        <style>
          .footer-content {
            width: 100%;
            font-size: 9px;
            padding: 8px 0;
            /*border-top: 1px solid #ddd;*/
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        </style>
        <div class="footer-content">
          <!--<span>${clientName || 'Cliente'}</span>-->
         <!-- <span>${new Date().toLocaleDateString()}</span>-->
          <!--<span>Confidencial</span>-->
        </div>
      `,
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="manual-${clientName || 'cliente'}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: "Error generando PDF" }, { status: 500 });
  }
}