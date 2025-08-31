"use client";

import gsap from "gsap";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef } from "react";

export const GoSignIn = () => {
  const t = useTranslations("form");
  const linkRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (!linkRef.current) return;

    const tl = gsap.timeline({ delay: 0.8 });

    tl.fromTo(
      linkRef.current,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "0.1"
    );
  }, []);
  return (
    <Link
      ref={linkRef}
      className="text-[13px] duration-300 opacity-0 hover:text-accent text-dark-secondary font-mono tracking-wide transform transition-all hover:translate-x-1"
      href={"/account/sign-in"}
    >
      {t("goSignIn")}
    </Link>
  );
};
