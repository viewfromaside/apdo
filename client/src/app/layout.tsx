"use client";

import { Inter, Fira_Code } from "next/font/google";
import { Layout } from "./components";
import { ThemeProvider } from "./components/shadcn-ui/theme-provider";
import "@/assets/globals.css";
import { CookiesProvider } from "react-cookie";
import { useEffect } from "react";
import { getUser } from "../store/user";
import { ColorRequest } from "@/services/requests/color";
import I18nProvider from "@/i18n/I18nProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    async function getData() {
      let user = getUser();
      if (!user) return;
      const colorRequest = new ColorRequest(localStorage.getItem("jwt") || "");
      const response = await colorRequest.sendFindOne(user.username);

      if (response) {
        let root = document.documentElement;
        Object.entries(response).map(([key, color]) => {
          root.style.setProperty(
            `--color-dark-${key.replace("_color", "")}`,
            color
          );
          root.style.setProperty(`--color-${key.replace("_color", "")}`, color);
        });
      }
    }
    getData();
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>apdo</title>
      </head>
      <body className={`${inter.variable} ${firaCode.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CookiesProvider>
            <I18nProvider>
              <Layout>{children}</Layout>
            </I18nProvider>
          </CookiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
