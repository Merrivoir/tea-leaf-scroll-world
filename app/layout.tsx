import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const title = "Поставки из Китая в Европу — от фабрики до склада";
  const description = "Поиск поставщиков, переговоры с фабриками, инспекция, консолидация, авиадоставка и таможенное оформление.";

  return {
    title,
    description,
    metadataBase: new URL("https://merrivoir.github.io/tea-leaf-scroll-world"),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
