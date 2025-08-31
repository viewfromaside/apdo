"use client";
import { Button, GoSignUp, Logo, Panel } from "@/app/components";
import { Input } from "@/app/components/input";
import { User } from "@/app/services/models/user";
import { AccountRequest } from "@/app/services/requests/account";
import { showAlertPopupAtom, togglePopupAtom } from "@/app/store/pop-up";
import { saveUser, verifyItsLogged } from "@/app/store/user";
import gsap from "gsap";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SignInForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const togglePopup = useSetAtom(togglePopupAtom);
  const showAlertPopup = useSetAtom(showAlertPopupAtom);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (verifyItsLogged()) {
      return router.replace("/notes");
    }
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

  const handleClick = async () => {
    if (!username || !password) return showAlertPopup("fields missing");
    const request = new AccountRequest();
    const response = await request.sendLogin({ username, password });

    if (response?.status == 200) {
      let data = response.data;
      if (data.data.active) {
        togglePopup("confirmEmail");
        return;
      }
      localStorage.setItem("jwt", data.jwt);
      saveUser(data.data);
      router.replace("/notes");
    } else {
      showAlertPopup("incorrect credencials");
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-2 justify-center items-center">
        <Logo />
        <div ref={formRef} className="form flex flex-col gap-2 items-center">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="opacity-0"
            placeholder="username"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="opacity-0"
            placeholder="password"
            type="password"
          />
          <Button onClick={handleClick} className="opacity-0 w-full">
            hop on
          </Button>
        </div>
        <GoSignUp />
      </Panel>
    </div>
  );
}
