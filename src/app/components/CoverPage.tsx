import Image from "next/image";
import logo from "@/../public/logoPortada.png";
import { useEffect, useState } from "react";

export default function CoverPage({
  clientName,
  logoBase64,
}: {
  clientName: string;
  logoBase64: string;
}) {
  const [logoPortada, setLogoPortada] = useState<string>(logo.src);

  useEffect(() => {
    if (logoBase64) {
      setLogoPortada(logoBase64);
    }
  }, [logoBase64]);

  return (
    <div className="cover">
      {logoBase64 ? (
        <img src={logoBase64} alt="Logo" width={732} />
      ) : (
        <Image src={logoPortada} alt="Logo" width={732} height={288} />
      )}

      <h1>Manual sitio web</h1>
      <h2>{clientName}</h2>
    </div>
  );
}
