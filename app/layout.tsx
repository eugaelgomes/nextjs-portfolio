import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gael Gomes - Desenvolvedor Full Stack | Portfólio",
    template: "%s | Gael Gomes"
  },
  description: "Desenvolvedor Full Stack especializado em React, Next.js, Node.js e soluções digitais modernas. Transformo ideias em aplicações web elegantes e funcionais. 21 anos, Engenharia de Software.",
  keywords: [
    "Gael Gomes",
    "Desenvolvedor Full Stack",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Desenvolvedor Web",
    "Frontend",
    "Backend",
    "Portfolio",
    "Engenharia de Software",
    "Desenvolvedor Brasil",
    "Web Developer"
  ],
  authors: [{ name: "Gael Gomes", url: "https://gaelgomes.dev" }],
  creator: "Gael Gomes",
  publisher: "Gael Gomes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://gaelgomes.dev"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://gaelgomes.dev",
    siteName: "Gael Gomes - Desenvolvedor Full Stack",
    title: "Gael Gomes - Desenvolvedor Full Stack | Portfólio",
    description: "Desenvolvedor Full Stack especializado em React, Next.js, Node.js e soluções digitais modernas. Transformo ideias em aplicações web elegantes e funcionais.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gael Gomes - Desenvolvedor Full Stack",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gael Gomes - Desenvolvedor Full Stack | Portfólio",
    description: "Desenvolvedor Full Stack especializado em React, Next.js, Node.js e soluções digitais modernas. Transformo ideias em aplicações web elegantes e funcionais.",
    images: ["/og-image.png"],
    creator: "@gaelgomes", // Substitua pelo seu Twitter se tiver
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "1pkKCIrjwfTA3A9DrLGbVw8Sp8JrnZX4RIrSDJra3AA", // Adicione seu código do Google Search Console
    // other: {
    //   "msvalidate.01": "your-bing-verification-code", // Bing Webmaster Tools se necessário
    // },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
