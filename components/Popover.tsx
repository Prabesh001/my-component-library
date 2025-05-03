"use client";
import React, { useEffect, useRef, useState } from "react";

interface PopoverProps {
  parentContent?: React.ReactNode;
  childrenContent?: React.ReactNode;
  popoverChildClassName?: string;
  popoverParentClassName?: string;
}

const Popover: React.FC<PopoverProps> = ({
  popoverParentClassName,
  popoverChildClassName,
  parentContent,
  childrenContent,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(event.target as Node)) {
      setShowPopover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={popRef} className="relative">
      <div
        className={`${popoverParentClassName} cursor-pointer`}
        onClick={() => setShowPopover((prev) => !prev)}
      >
        {parentContent}
      </div>

      {showPopover && (
        <div className={`absolute z-30 ${popoverChildClassName}`}>
          {childrenContent}
        </div>
      )}
    </div>
  );
};

export default Popover;
