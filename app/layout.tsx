"use client";

import { useTranslation } from "i18nexus";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import Image from "next/image";
import Sidebar from "./components/Sidebar";
import { I18nProvider } from "i18nexus";
import { translations } from "@/locales";

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
}: Readonly<{ children: React.ReactNode }>) {
  const { t } = useTranslation();

  return (
    <html lang="ko">
      <body className={`${malgunFont.variable} antialiased`}>
        <QueryProvider>
          <I18nProvider translations={translations}>
            <div className="min-h-screen">
              {/* Header */}
              <header className="text-gray-800 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                  <Image
                    src="/logo_ins.gif"
                    alt="INHA UNIVERSITY"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <button
                  className="px-4 py-2 rounded text-sm hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                  {t("닫기")}
                </button>
              </header>

              <div className="flex">
                <Sidebar />
                {/* Main Content */}
                <main className="flex-1 bg-white p-8">{children}</main>
              </div>
            </div>
          </I18nProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
