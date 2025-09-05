import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";
import { BR, DE, US } from "country-flag-icons/react/3x2";
import { useAtom } from "jotai";
import { localeReloadAtom } from "@/store/reload";

type LanguageSwitcherProps = ComponentProps<"div"> & {};
type Locale = "de" | "pt" | "en";

export const LanguageSwitcher = ({
  className,
  ...props
}: LanguageSwitcherProps) => {
  const [, setReload] = useAtom(localeReloadAtom);
  const [language, setLanguage] = useState<"de" | "pt" | "en">(
    (localStorage.getItem("locale") as Locale) || "en"
  );

  function changeLanguage(lang: "de" | "pt" | "en") {
    localStorage.setItem("locale", lang);
    setLanguage(lang);
    setReload((prev) => prev + 1);
  }

  return (
    <div
      className={twMerge(
        "absolute flex flex-row gap-3 left-1/2 -translate-x-1/2 top-[5%]",
        className
      )}
      {...props}
    >
      <Button
        onClick={() => changeLanguage("de")}
        variant={language == "de" ? "primary" : "outline"}
      >
        <DE className="w-5" />
      </Button>
      <Button
        onClick={() => changeLanguage("en")}
        variant={language == "en" ? "primary" : "outline"}
      >
        <US className="w-5" />
      </Button>
      <Button
        onClick={() => changeLanguage("pt")}
        variant={language == "pt" ? "primary" : "outline"}
      >
        <BR className="w-5" />
      </Button>
    </div>
  );
};
