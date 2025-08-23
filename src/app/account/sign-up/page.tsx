"use client";
import { Button, GoSignIn, GoSignUp, Logo, Panel } from "@/app/components";
import { Input } from "@/app/components";
import { togglePopupAtom } from "@/app/store/pop-up";
import gsap from "gsap";
import { useSetAtom } from "jotai";
import { useEffect, useRef } from "react";

export default function SignUpForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const togglePopup = useSetAtom(togglePopupAtom);

  useEffect(() => {
    if (!formRef.current) return;

    const elements = formRef.current.children;

    gsap.fromTo(
      elements,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.2,
      }
    );
  }, []);

  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-2 justify-center items-center">
        <Logo />
        <div ref={formRef} className="form flex flex-col gap-2 items-center">
          <Input className="opacity-0" placeholder="username" />
          <Input className="opacity-0" placeholder="email" />
          <Input className="opacity-0" placeholder="password" type="password" />
          <Input
            className="opacity-0"
            placeholder="confirm password"
            type="password"
          />
          <Button
            onClick={() => togglePopup("confirmEmail")}
            className="w-full opacity-0"
          >
            hop on
          </Button>
        </div>
        <GoSignIn />
      </Panel>
    </div>
  );
}
