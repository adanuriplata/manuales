export const pdfStyles = `
body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
.cover { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; text-align: center; background: #fff; }
.cover h1 { font-size: 36px; color: #2c3e50; margin-bottom: 20px; margin-top: 60px; }
.cover h2 { font-size: 20px; color: #555; margin-top: 10px; }
.cover img { max-width: 600px; margin-top: 20px; }
.cover p { margin-top: 20px; }
.index { padding: 40px; page-break-before: always; }
.index h2 { font-size: 24px; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px; }
.index ul { list-style: none; padding: 0; }
.index li { font-size: 16px; margin: 10px 0; }
.section { page-break-before: always; padding: 40px; width: 100%; max-width: 900px; margin: 0 auto; }
.section h2 { font-size: 22px; color: #2c3e50; border-bottom: 1px solid #ccc; padding-bottom: 8px; margin-bottom: 15px; }
.section p { font-size: 14px; line-height: 1.6; color: #333; }
.section img { max-width: 100%; height: auto; border-radius: 8px; margin: 45px auto; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.page-break { page-break-before: always; break-before: page; }
`;