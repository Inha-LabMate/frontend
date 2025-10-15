import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const malgunFont = localFont({
  src: [
    {
      path: "../public/malgun.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-malgun",
  display: "swap",
});

export const metadata: Metadata = {
  title: "인하대학교 학사행정",
  description: "인하대학교 학사행정 포털",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${malgunFont.variable} antialiased `}>{children}</body>
    </html>
  );
}
