"use client";
import { Button, GoSignUp, Logo, Panel } from "@/app/components";
import { Input } from "@/app/components/input";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function SignInForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const handleClick = () => {
    toast.error("locked in fr", {
      style: {
        // backgroundColor: "#83D448", success
        backgroundColor: "#DE4747", // error
        border: "0px",
        padding: 10,
      },
    });
    router.replace("/notes");
  };

  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-2 justify-center items-center">
        <Logo />
        <div ref={formRef} className="form flex flex-col gap-2 items-center">
          <Input className="opacity-0" placeholder="username" />
          <Input className="opacity-0" placeholder="password" type="password" />
          <Button onClick={handleClick} className="opacity-0 w-full">
            hop on
          </Button>
        </div>
        <GoSignUp />
      </Panel>
    </div>
  );
}
