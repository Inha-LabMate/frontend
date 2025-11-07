"use client";
import { useTranslation } from "i18nexus";

import { ReactNode } from "react";
import Image from "next/image";

interface SectionProps {
  title: string;
  icon?: string;
  onAdd?: () => void;
  children: ReactNode;
  collapsible?: boolean;
}

export default function Section({
  title,
  icon = "▶",
  onAdd,
  children,
}: SectionProps) {
  const { t } = useTranslation();

  // SVG 파일인지 확인 (경로로 시작하는지 체크)
  const isSvgPath = icon.includes("/") || icon.endsWith(".svg");

  return (
    <div className="mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-black flex items-center gap-2">
          <span className="w-8 h-8 bg-inha-blue rounded-full flex items-center justify-center shadow-md">
            {isSvgPath ? (
              <Image
                src={icon}
                alt=""
                width={20}
                height={20}
                className="brightness-0 invert"
              />
            ) : (
              <span className="text-white text-sm font-bold">{icon}</span>
            )}
          </span>
          {title}
        </h2>
        {onAdd && (
          <button
            onClick={onAdd}
            className="w-8 h-8 bg-inha-blue text-white rounded flex items-center justify-center hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-xl font-bold"
            title={t("추가")}>
            +
          </button>
        )}
      </div>

      {/* Section Content */}
      <div className="border border-gray-300 rounded">{children}</div>
    </div>
  );
}
