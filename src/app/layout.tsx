import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Александр Новиков - Fullstack разработчик",
  description: "Веб-разработчик из Донецка. Умею писать сайты с нуля с использованием современных технологий веб-разработки",
  keywords: "fullstack, fullstuck, front-end, back-end, frontend, backend, фронтенд, бекенд, разработчик, developer, dev, программист, react, jquery, spring, java, javascript, python, djano, bootstrap, aiogramm, bot, telegramm, typescript, telebot, веб-работчик, web-developer, web, веб, sass, mysql, sql, db, databases, rest api, redux",
  icons: [
    {
      url: "/favicons/favicon.ico",
      type: "image/x-icon",
      rel: "icon",
    },
    {
      url: "/favicons/apple-touch-icon.png",
      sizes: "180x180",
      type: "apple-touch-icon",
      rel: "icon",
    },
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
      rel: "icon",
    },
    {
      url: "/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
      rel: "icon",
    },
    {
      url: "/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
      rel: "icon",
    },
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
