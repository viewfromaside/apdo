"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState("en");
  const [messages, setMessages] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("locale") || "en";
    setLocale(stored);

    import(`./messages/${locale}.json`).then((mod) => {
      setMessages(mod.default);
    });
  }, []);

  if (!messages) return null;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
