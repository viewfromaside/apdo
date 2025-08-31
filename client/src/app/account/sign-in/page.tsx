"use client";
import { Button, GoSignUp, Logo, Panel } from "@/app/components";
import { Input } from "@/app/components/input";
import { useKeyboardShortcut } from "@/hooks";
import { AccountRequest } from "@/services";
import { showAlertPopupAtom, togglePopupAtom } from "@/store/pop-up";
import { saveUser, verifyItsLogged } from "@/store/user";
import gsap from "gsap";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SignInForm() {
  const formT = useTranslations("form");
  const t = useTranslations("general");
  const formRef = useRef<HTMLDivElement>(null);
  const togglePopup = useSetAtom(togglePopupAtom);
  const showAlertPopup = useSetAtom(showAlertPopupAtom);
  const [open, setOpen] = useState<boolean>(true);
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
    if (!username || !password)
      return showAlertPopup(t("popups.errors.fieldsMissing"));
    const request = new AccountRequest();
    const response = await request.sendLogin({ username, password });

    if (response?.status == 200) {
      let data = response.data;
      // if (!data.data.active) {
      //   togglePopup("confirmEmail");
      //   return;
      // }
      localStorage.setItem("jwt", data.jwt);
      saveUser(data.data);
      await new Promise((resolve) => setTimeout(resolve, 100));
      // router.refresh();
      router.push("/notes");
    } else {
      showAlertPopup(t("popups.errors.incorrectCredentials"));
    }
  };

  useKeyboardShortcut({
    key: "Enter",
    onKeyPress: handleClick,
    deps: [open],
    enabled: open,
  });

  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-2 justify-center items-center">
        <Logo />
        <div ref={formRef} className="form flex flex-col gap-2 items-center">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="opacity-0"
            placeholder={formT("username")}
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="opacity-0"
            placeholder={formT("password")}
            type="password"
          />
          <Button onClick={handleClick} className="opacity-0 w-full">
            {formT("submit")}
          </Button>
        </div>
        <GoSignUp />
      </Panel>
    </div>
  );
}
