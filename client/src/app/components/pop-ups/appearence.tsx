"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Dialog, DialogBody, DialogContent, DialogHeader } from "../dialog";
import { PopupProps } from ".";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { closeAllPopupAtom, openPopupsAtom } from "@/app/store/pop-up";
import { Tag } from "../tag";
import { PaletteIcon } from "lucide-react";
import { Button } from "../button";
import { ColorPicker } from "../color-picker";
import { ColorKey, themeColorsAtom } from "@/app/store/color";
import { ColorRequest } from "@/app/services/requests/color";
import { getUser } from "@/app/store/user";
import { Color } from "@/app/services/models/color";

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
    neutral: false,
    background: false,
    accent: false,
  });

  useEffect(() => {
    if (openPopups.appearence) {
      async function getData() {
        let user = getUser();
        if (!user) throw new Error("internal client error");
        const colorRequest = new ColorRequest(
          localStorage.getItem("jwt") || ""
        );
        const response = await colorRequest.sendFindOne(user.username);
        if (!response) return;

        let asColor = new Color(response);

        setThemeColors((prev) => {
          return {
            ...prev,
            background: asColor.backgroundColor,
            neutral: asColor.neutralColor,
            accent: asColor.accentColor,
          };
        });
      }
      getData();
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

  const handleReset = () => {
    const defaultThemeColors = {
      neutral: "#ffffff",
      background: "#1e1e1e",
      accent: "#ffb86c",
    };
    setThemeColors(defaultThemeColors);
  };

  const handleSubmit = async () => {
    let user = getUser();
    if (!user) throw new Error("internal client error");
    const colorRequest = new ColorRequest(localStorage.getItem("jwt") || "");
    const response = await colorRequest.sendFindOne(user.username);
    if (!response) return;

    let root = document.documentElement;
    Object.entries(themeColors).map(([key, color]) => {
      root.style.setProperty(`--color-dark-${key}`, color);
      root.style.setProperty(`--color-${key}`, color);
    });

    colorRequest.sendEdit(response.id, {
      background_color: themeColors.background,
      neutral_color: themeColors.neutral,
      accent_color: themeColors.accent,
      user_id: user.username,
    });
  };

  const colorLabels: Record<ColorKey, string> = {
    neutral: "neutral color",
    background: "background color",
    accent: "accent color",
  };

  return (
    <Dialog open={open} toggle={toggle} {...props} className={twMerge("")}>
      <DialogBody mainClassName="!bg-[#1e1e1e] border-[#ffb86c]/20">
        <DialogHeader className="bg-[#1e1e1e]">
          <Tag icon={PaletteIcon} color="" label="appearence" />
        </DialogHeader>
        <DialogContent
          className={twMerge(
            "flex flex-col w-full p-3 bg-[#1e1e1e] gap-5 overflow-auto overflow-x-hidden ",
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
            <Button onClick={handleSubmit}>save it</Button>
            <Button variant="secondary" onClick={handleReset}>
              i want that back
            </Button>
          </div>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
