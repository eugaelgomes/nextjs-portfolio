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
    default: "Gael Gomes | Portfólio",
    template: "%s | Gael Gomes"
  },
  description: "Estudante de Engenharia de Software com foco em React, Next.js, Node.js e soluções digitais modernas. Transformo ideias em aplicações web elegantes e funcionais. 21 anos, Engenharia de Software.",
  keywords: [
    "Gael Gomes",
    "Estudante Full Stack",
    "Desenvolvedor Full Stack",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Estudante Web",
    "Desenvolvedor Frontend",
    "Desenvolvedor Backend",
    "Portfolio Web",
    "Engenharia de Software",
    "Estudante Brasil",
    "Web Developer",
    "Desenvolvedor React",
    "Desenvolvedor Next.js",
    "Full Stack Developer Portfolio",
    "Portfólio Desenvolvedor",
    "Desenvolvedor JavaScript",
    "Software Engineer Student",
    "Web Development Portfolio",
    "Modern Web Development",
    "Responsive Web Design",
    "UI/UX Development",
    "API Development",
    "Database Design",
    "Git GitHub",
    "Agile Development",
    "Clean Code",
    "Best Practices Development"
  ],
  authors: [{ name: "Gael Gomes", url: "https://gaelgomes.dev" }],
  creator: "Gael Gomes",
  publisher: "Gael Gomes",
  category: "Technology",
  classification: "Portfolio Website",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://gaelgomes.dev"),
  alternates: {
    canonical: "/",
    languages: {
      'pt-BR': '/',
      'en': '/',
    },
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: 'Gael Gomes - RSS Feed' },
      ],
      'application/feed+json': [
        { url: '/feed.json', title: 'Gael Gomes - JSON Feed' },
      ],
    },
  },
  referrer: 'origin-when-cross-origin',
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
    siteName: "Gael Gomes - Estudante Full Stack",
    title: "Gael Gomes | Portfólio",
    description: "Estudante de Engenharia de Software com foco em React, Next.js, Node.js e soluções digitais modernas. Transformo ideias em aplicações web elegantes e funcionais.",
    emails: ["hello@gaelgomes.dev"],
    countryName: "Brasil",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gael Gomes Estudante Full Stack",
        type: "image/png",
      },
    ],
  },
  applicationName: "Gael Gomes Portfolio",
  appleWebApp: {
    capable: true,
    title: "Gael Gomes",
    statusBarStyle: "black-translucent",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gael Gomes | Portfólio",
    description: "Estudante de Engenharia de Software com foco em React, Next.js, Node.js e soluções digitais modernas. Transformo ideias em aplicações web elegantes e funcionais.",
    images: ["/og-image.png"],
    creator: "@gaelgomes",
    site: "@gaelgomes",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
    "theme-color": "#000000",
    "color-scheme": "dark light",
    "content-type": "text/html; charset=utf-8",
    "pragma": "no-cache",
    "cache-control": "no-cache, no-store, must-revalidate",
    "expires": "0",
    "revisit-after": "7 days",
    "coverage": "Worldwide",
    "distribution": "Global",
    "rating": "General",
    "target": "all",
    "HandheldFriendly": "True",
    "MobileOptimized": "320",
    "audience": "Developers, Recruiters, Tech Professionals",
    "page-topic": "Technology, Software Development, Web Development",
    "page-type": "Portfolio",
    "language": "Portuguese, English",
    "geo.region": "BR",
    "geo.placename": "Brasil",
    "ICBM": "-15.7801, -47.9292",
    "DC.title": "Gael Gomes - Estudante Full Stack",
    "DC.creator": "Gael Gomes",
    "DC.subject": "Web Development, Full Stack Development, React, Next.js, Node.js",
    "DC.description": "Estudante de Engenharia de Software com foco em React, Next.js, Node.js e soluções digitais modernas.",
    "DC.publisher": "Gael Gomes",
    "DC.contributor": "Gael Gomes",
    "DC.date": new Date().toISOString(),
    "DC.type": "Text.Homepage.Personal",
    "DC.format": "text/html",
    "DC.identifier": "https://gaelgomes.dev",
    "DC.language": "pt-BR",
    "DC.coverage": "World",
    "DC.rights": "Copyright 2025 Gael Gomes",
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
