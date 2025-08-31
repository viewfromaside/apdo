"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Dialog, DialogBody, DialogContent, DialogHeader } from "../dialog";
import { PopupProps } from ".";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { closeAllPopupAtom, openPopupsAtom } from "@/store/pop-up";
import { Tag } from "../tag";
import { PaletteIcon } from "lucide-react";
import { Button } from "../button";
import { ColorPicker } from "../color-picker";
import { ColorKey, themeColorsAtom } from "@/store/color";
import { ColorRequest } from "@/services";
import { getUser } from "@/store/user";
import { Color } from "@/services";
import { DE, US, BR } from "country-flag-icons/react/3x2";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { localeReloadAtom } from "@/store/reload";

type PopupAppearenceProps = PopupProps & {};

export const PopupAppearence = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  ...props
}: PopupAppearenceProps) => {
  const router = useRouter();
  const t = useTranslations("general");
  const openPopups = useAtomValue(openPopupsAtom);
  const closeAllPopups = useSetAtom(closeAllPopupAtom);
  const [, setReload] = useAtom(localeReloadAtom);
  const [language, setLanguage] = useState<"de" | "pt" | "en">("en");
  const [themeColors, setThemeColors] = useAtom(themeColorsAtom);
  const [openPickers, setOpenPickers] = useState<Record<ColorKey, boolean>>({
    neutral: false,
    background: false,
    accent: false,
  });

  function changeLanguage(lang: "de" | "pt" | "en") {
    localStorage.setItem("locale", lang);
    setLanguage(lang);
    setReload((prev) => prev + 1);
  }

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
      const locale = localStorage.getItem("locale");
      if (locale === "de" || locale === "pt" || locale === "en") {
        setLanguage(locale);
      } else {
        setLanguage("en");
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
    neutral: t("popups.appearence.attributes.neutral"),
    background: t("popups.appearence.attributes.background"),
    accent: t("popups.appearence.attributes.accent"),
  };

  const languageButtonClassName = "w-full flex flex-row gap-2 justify-center";

  return (
    <Dialog open={open} toggle={toggle} {...props} className={twMerge("")}>
      <DialogBody mainClassName="!bg-[#1e1e1e] border-[#ffb86c]/20">
        <DialogHeader className="bg-[#1e1e1e]">
          <Tag
            icon={PaletteIcon}
            color=""
            label={t("popups.appearence.title")}
          />
        </DialogHeader>
        <DialogContent
          className={twMerge(
            "flex flex-col w-full p-3 bg-[#1e1e1e] gap-5 overflow-auto overflow-x-hidden ",
            contentClassName
          )}
        >
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex flex-col w-full font-mono gap-2">
              <Button
                className={languageButtonClassName}
                onClick={() => changeLanguage("de")}
                variant={language == "de" ? "primary" : "secondary"}
              >
                <DE className="w-5 rounded-md" />
                <span>{t("popups.appearence.attributes.de")}</span>
              </Button>
              <Button
                className={languageButtonClassName}
                onClick={() => changeLanguage("en")}
                variant={language == "en" ? "primary" : "secondary"}
              >
                <US className="w-5 rounded-md" />
                <span>{t("popups.appearence.attributes.en")}</span>
              </Button>
              <Button
                className={languageButtonClassName}
                onClick={() => changeLanguage("pt")}
                variant={language == "pt" ? "primary" : "secondary"}
              >
                <BR className="w-5 rounded-md" />
                <span>{t("popups.appearence.attributes.pt")}</span>
              </Button>
            </div>
          </div>
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
            <Button onClick={handleSubmit}>
              {t("popups.appearence.submit")}
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              {t("popups.appearence.reset")}
            </Button>
          </div>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
