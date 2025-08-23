"use client";

import { ComponentProps, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Dialog, DialogBody, DialogContent, DialogHeader } from "../dialog";
import { PopupProps } from ".";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { closeAllPopupAtom, openPopupsAtom } from "@/app/store/pop-up";
import { Card } from "../notes";
import { Tag } from "../tag";
import { PaletteIcon, SearchIcon } from "lucide-react";
import { notesAtom } from "@/app/store";
import { Note } from "@/app/services";
import { Button } from "../button";
import { ColorPicker } from "../color-picker";
import { ColorKey, themeColorsAtom } from "@/app/store/color";

type PopupAppearenceProps = PopupProps & {};

export const PopupAppearence = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  ...props
}: PopupAppearenceProps) => {
  const openPopups = useAtomValue(openPopupsAtom);
  const closeAllPopups = useSetAtom(closeAllPopupAtom);
  const [themeColors, setThemeColors] = useAtom(themeColorsAtom);
  const [openPickers, setOpenPickers] = useState<Record<ColorKey, boolean>>({
    primary: false,
    secondary: false,
    neutral: false,
    background: false,
    accent: false,
  });

  useEffect(() => {
    if (openPopups.notes) {
      console.log("o popup de notes acaba de executar um fetch");
    }
  }, [openPopups]);

  const handleColorChange = (colorKey: ColorKey, newColor: string) => {
    setThemeColors((prev) => ({
      ...prev,
      [colorKey]: newColor,
    }));
  };

  const togglePicker = (colorKey: ColorKey) => {
    setOpenPickers((prev) => ({
      ...prev,
      [colorKey]: !prev[colorKey],
    }));
  };

  const colorLabels: Record<ColorKey, string> = {
    primary: "primary color",
    secondary: "secondary color",
    neutral: "neutral color",
    background: "background color",
    accent: "accent color",
  };

  return (
    <Dialog open={open} toggle={toggle} {...props} className={twMerge("")}>
      <DialogBody>
        <DialogHeader>
          <Tag icon={PaletteIcon} color="" label="appearence" />
        </DialogHeader>
        <DialogContent
          className={twMerge(
            "flex flex-col w-full p-3 gap-5 overflow-auto overflow-x-hidden",
            contentClassName
          )}
        >
          <div className="flex flex-col gap-2">
            {Object.entries(themeColors).map(([key, color]) => (
              <ColorPicker
                key={key}
                color={color}
                onChange={(newColor) =>
                  handleColorChange(key as ColorKey, newColor)
                }
                label={colorLabels[key as ColorKey]}
                isOpen={openPickers[key as ColorKey]}
                onToggle={() => togglePicker(key as ColorKey)}
              />
            ))}
          </div>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
