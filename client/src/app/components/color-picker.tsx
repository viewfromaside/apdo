"use client";

import { useEffect, useRef } from "react";
import { Button } from "./button";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { CheckIcon } from "lucide-react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const ColorPicker = ({
  color,
  onChange,
  label,
  isOpen,
  onToggle,
}: ColorPickerProps) => {
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        if (isOpen) onToggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={pickerRef}>
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded border-2 border-gray-300/10"
            style={{ backgroundColor: color }}
          />
          <span>{label}</span>
        </div>
        <span className="text-xs font-mono text-gray-500">{color}</span>
      </Button>

      {isOpen && (
        <div className="absolute w-full z-50 mt-2 p-3 bg-[#1e1e1e] border border-gray-400/10 rounded-lg shadow-lg">
          <div className="space-y-3">
            <HexColorPicker
              color={color}
              onChange={onChange}
              style={{ width: "200px", height: "150px" }}
            />

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">#</span>
              <HexColorInput
                color={color}
                onChange={onChange}
                className="flex-1 px-2 py-1 text-sm border rounded font-mono"
                placeholder="ffffff"
              />
              <Button onClick={onToggle} className="p-1 h-7 w-7">
                <CheckIcon size={14} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
