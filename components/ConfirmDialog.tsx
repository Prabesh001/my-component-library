import React from "react";
import Popup from "./Popup";

interface ConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onConfirm: () => void;
}
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}: ConfirmProps) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      popupClassName="bg-gray-200 text-gray-800 h-40"
      content={
        <div className="flex flex-col items-end justify-center h-full">
          <p className="text-center text-lg font-medium">{message}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 duration-300 aspect-video bg-red-600 shadow hover:shadow-gray-900 text-white rounded hover:bg-red-500"
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 duration-300 aspect-video bg-gray-300 rounded shadow border-1 border-gray-400 hover:shadow-gray-900 hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      }
    />
  );
};

export default ConfirmDialog;
