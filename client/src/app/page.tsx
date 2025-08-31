"use client";

import { Button, Logo, Panel } from "./components";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { GoSignUp } from "./components/account/go-sign-up";
import { verifyItsLogged } from "./store/user";
import { useRouter } from "next/navigation";

export default function Home() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (verifyItsLogged()) {
      return router.replace("/notes");
    }
    if (!buttonRef.current) return;

    const tl = gsap.timeline({ delay: 0.8 });

    tl.fromTo(
      buttonRef.current,
      {
        y: 30,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      }
    );
  }, []);

  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-5 justify-center items-center">
        <Logo />
        <div className="flex flex-col gap-2">
          <Link href={"/account/sign-in"}>
            <Button ref={buttonRef} className="text-[14px] opacity-0">
              sign in, aight?
            </Button>
          </Link>
          <GoSignUp />
        </div>
      </Panel>
    </div>
  );
}
