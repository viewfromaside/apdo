"use client";

import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { Layout } from "./components";
import { ThemeProvider } from "./components/shadcn-ui/theme-provider";
import "@/app/assets/globals.css";
import { Logo } from "./components/logo";
import { CookiesProvider } from "react-cookie";

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
            <Layout>{children}</Layout>
          </CookiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
