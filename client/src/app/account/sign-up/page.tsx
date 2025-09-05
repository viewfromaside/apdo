"use client";
import {
  Button,
  GoSignIn,
  LanguageSwitcher,
  Logo,
  Panel,
} from "@/app/components";
import { Input } from "@/app/components";
import { useKeyboardShortcut } from "@/hooks";
import { User } from "@/services";
import { AccountRequest } from "@/services";
import { showAlertPopupAtom, togglePopupAtom } from "@/store/pop-up";
import { verifyItsLogged } from "@/store/user";
import gsap from "gsap";
import { useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SignUpForm() {
  const t = useTranslations("form");
  const formRef = useRef<HTMLDivElement>(null);
  const showAlertPopup = useSetAtom(showAlertPopupAtom);
  const [open, setOpen] = useState<boolean>(true);
  const [formObject, setFormObject] = useState<User>(new User({}));
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const togglePopup = useSetAtom(togglePopupAtom);
  const router = useRouter();

  const handleChange = (field: keyof User, value: any) => {
    setFormObject((prev) => new User({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formObject.username ||
      !formObject.email ||
      !formObject.password ||
      !confirmPassword
    )
      return showAlertPopup("fields is missing");

    if (confirmPassword !== formObject.password) {
      return showAlertPopup("the password are not the same");
    }

    const request = new AccountRequest();
    const response = await request.sendRegister(formObject);
    setOpen(false);
    if (response?.status == 201) {
      router.push("/account/sign-in");
    } else {
      showAlertPopup("already exists a user with that username or email");
    }
  };

  useKeyboardShortcut({
    key: "Enter",
    onKeyPress: handleSubmit,
    deps: [open],
    enabled: open,
  });

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

  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-2 justify-center items-center">
        <Logo />
        <div ref={formRef} className="form flex flex-col gap-2 items-center">
          <Input
            onChange={(e) => handleChange("username", e.target.value)}
            value={formObject.username}
            className="opacity-0"
            placeholder={t("username")}
          />
          <Input
            onChange={(e) => handleChange("email", e.target.value)}
            value={formObject.email}
            className="opacity-0"
            placeholder={t("email")}
          />
          <Input
            onChange={(e) => handleChange("password", e.target.value)}
            value={formObject.password}
            className="opacity-0"
            placeholder={t("password")}
            type="password"
          />
          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="opacity-0"
            placeholder={t("confirmPassword")}
            type="password"
          />
          <Button onClick={handleSubmit} className="w-full opacity-0">
            {t("submit")}
          </Button>
        </div>
        <GoSignIn />
        <LanguageSwitcher />
      </Panel>
    </div>
  );
}
