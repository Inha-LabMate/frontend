import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
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
  return (
    <html lang="ko">
      <body className={`${malgunFont.variable} antialiased`}>
        <QueryProvider>
          <I18nProvider translations={translations}>
            <div className="min-h-screen">
              {/* Header */}
              <Header />

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
