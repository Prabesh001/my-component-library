"use client";
import React, { useEffect } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
  closeOnOverlayClick?: boolean;
  overlayClassName?: string;
  popupClassName?: string;
  crossClassName?: string;
}

const Popup = ({
  isOpen,
  onClose,
  content,
  closeOnOverlayClick = true,
  overlayClassName = "",
  popupClassName = "",
  crossClassName,
}: PopupProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[1px] bg-black/50 ${overlayClassName}`}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        className={`relative rounded-md p-6 shadow-lg overflow-hidden ${popupClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
        <button
          onClick={onClose}
          className={`${crossClassName} absolute text-2xl h-8 aspect-square top-0 right-0 text-gray-500 hover:bg-red-600 transition-all duration-300 hover:text-gray-200`}
          aria-label="Close popup"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Popup;
