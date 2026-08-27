import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cerimonial360 — Gestão do cerimonial litúrgico",
  description:
    "Plataforma completa para gestão de escalas, formação e coordenação do cerimonial litúrgico paroquial.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#4F46E5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-dvh">
        {children}
      </body>
    </html>
  );
}
