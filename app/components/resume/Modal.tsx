"use client";

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-inha-blue text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-inha-blue text-sm">◎</span>
            </span>
            {title}
          </h3>
        </div>

        {/* Required Field Notice */}
        <div className="px-6 py-2 text-right text-xs text-red-500">
          *필수는 필수입력 항목입니다.
        </div>

        {/* Modal Content */}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
