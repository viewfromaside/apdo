"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { localeReloadAtom } from "@/store/reload";
import { useAtom } from "jotai";

type Locale = "en" | "pt" | "de";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [messages, setMessages] = useState<any>(null);
  const [reload] = useAtom(localeReloadAtom); // depende do atom

  useEffect(() => {
    const stored = localStorage.getItem("locale");
    const validLocale: Locale =
      stored === "pt" || stored === "de" ? stored : "en";
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
