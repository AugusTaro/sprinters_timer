import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "スプリンターズタイマー",
  description:
    "ブラウザで動作するタイマーアプリです。スプリンターメソッドに基づき集中力を向上させます。",
  icons:
    "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>🔥</text></svg>",
  keywords: "",
  openGraph: {
    type: "website",
    title: "スプリンターズタイマー",
    description:
      "スプリントメソッドに基づき、集中するためのタイマーアプリです。ブラウザ上で動作しますが、ダウンロードいただけるより快適にご利用いただけます。",
    siteName: "スプリンターズタイマー",
    url: "https://timer.augustaro.com/",
    images: {
      url: "https://timer.augustaro.com/images/sprintersTimer2.jpg",
      type: "image/jpg",
      width: 1200,
      height: 630,
      alt: "image",
    },
  },
  twitter: {
    card: "summary",
    title: "スプリンターズタイマー",
    description:
      "スプリントメソッドに基づき、集中するためのタイマーアプリです。ブラウザ上で動作しますが、ダウンロードいただけるより快適にご利用いただけます。",
    images: {
      url: "https://timer.augustaro.com/images/sprintersTimer2.jpg",
      type: "image/jpg",
      width: 1200,
      height: 630,
      alt: "image",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
