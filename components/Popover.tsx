"use client";
import React, { useEffect, useRef, useState } from "react";

interface PopoverProps {
  parentContent?: React.ReactNode;
  childrenContent?: React.ReactNode;
  popoverChildClassName?: string;
  popoverParentClassName?: string;
}

const Popover = ({
  popoverChildClassName,
  popoverParentClassName,
  parentContent,
  childrenContent,
}: PopoverProps) => {
  const [showPopover, setShowPopover] = useState(false);
  const popRef: React.RefObject<any> = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(event.target as Node)) {
      setShowPopover(false);
      }
    };

    if (showPopover) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopover]);
  return (
    <div ref={popRef} className="p-2 inline-flex relative">
      <div
        className={`${popoverParentClassName} bg-green-500`}
        onClick={() => setShowPopover(!showPopover)}
      >
        {parentContent}
      </div>

      {showPopover && (
        <div
          className={` bg-blue-600 absolute top-8 left-2 ${popoverChildClassName}`}
        >
          {childrenContent}
        </div>
      )}
    </div>
  );
};

export default Popover;
