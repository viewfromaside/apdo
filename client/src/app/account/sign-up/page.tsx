"use client";
import { Button, GoSignIn, GoSignUp, Logo, Panel } from "@/app/components";
import { Input } from "@/app/components";
import { UserRequest } from "@/app/services";
import { User } from "@/app/services/models/user";
import { togglePopupAtom } from "@/app/store/pop-up";
import gsap from "gsap";
import { useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

export default function SignUpForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const [formObject, setFormObject] = useState<User>(new User({}));
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const togglePopup = useSetAtom(togglePopupAtom);

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
      return;

    const request = new UserRequest();
    const response = await request.sendCreate(formObject);
    console.log(response);
    togglePopup("confirmEmail");
  };

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
          <Input
            onChange={(e) => handleChange("username", e.target.value)}
            value={formObject.username}
            className="opacity-0"
            placeholder="username"
          />
          <Input
            onChange={(e) => handleChange("email", e.target.value)}
            value={formObject.email}
            className="opacity-0"
            placeholder="email"
          />
          <Input
            onChange={(e) => handleChange("password", e.target.value)}
            value={formObject.password}
            className="opacity-0"
            placeholder="password"
            type="password"
          />
          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="opacity-0"
            placeholder="confirm password"
            type="password"
          />
          <Button onClick={handleSubmit} className="w-full opacity-0">
            hop on
          </Button>
        </div>
        <GoSignIn />
      </Panel>
    </div>
  );
}
