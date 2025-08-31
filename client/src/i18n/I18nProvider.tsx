"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { localeReloadAtom } from "@/store/reload";
import { useAtom } from "jotai";

type Locale = "en" | "pt" | "de";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [messages, setMessages] = useState<any>(null);
  const [reload] = useAtom(localeReloadAtom);

  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null;

    let validLocale: Locale;

    if (stored === "pt" || stored === "de") {
      validLocale = stored;
    } else {
      const browserLang = navigator.language.slice(0, 2);
      validLocale =
        browserLang === "pt" || browserLang === "de"
          ? (browserLang as Locale)
          : "en";
    }

    setLocale(validLocale);

    import(`./messages/${validLocale}.json`).then((mod) => {
      setMessages(mod.default || mod);
    });
  }, [reload]);

  if (!messages) return null;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
