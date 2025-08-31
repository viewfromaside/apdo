"use client";
import {
  Button,
  Card,
  Logo,
  NoContent,
  NoteSettings,
  Panel,
} from "@/app/components";
import { useEffect, useState, useRef } from "react";
import { Note } from "@/services/models/note";
import { useAtomValue, useSetAtom } from "jotai";
import { togglePopupAtom } from "../../store/pop-up";
import { loadNotesAtom, notesAtom, setSelectedNoteAtom } from "../../store";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { getUser, verifyItsLogged } from "@/store/user";
import { ColorRequest } from "@/services/requests/color";
import { useTranslations } from "next-intl";

export default function NotesHome() {
  const t = useTranslations("general");
  let notes = useAtomValue(notesAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const selectNote = useSetAtom(setSelectedNoteAtom);
  const loadNotes = useSetAtom(loadNotesAtom);
  const togglePopup = useSetAtom(togglePopupAtom);

  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const notesListRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (!verifyItsLogged()) {
      return router.replace("/account/sign-in");
    }

    async function getData() {
      loadNotes();
      let user = getUser();
      if (!user) throw new Error("internal client error");
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

      setLoading(false);
    }

    selectNote(null);
    getData();
  }, []);

  useEffect(() => {
    if (!headerRef.current || !contentRef.current) return;

    const buttonsContainer = headerRef.current.querySelector(
      ".flex.flex-row.gap-4"
    );
    const buttons = buttonsContainer ? buttonsContainer.children : [];

    if (buttons.length > 0) {
      gsap.fromTo(
        buttonsRef.current,
        {
          x: 30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.3,
        }
      );
    }

    gsap.fromTo(
      contentRef.current,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.4,
      }
    );
  }, []);

  useEffect(() => {
    if (notes.length > 0 && titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          y: 15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [notes.length]);

  useEffect(() => {
    if (notes.length > 0 && notesListRef.current) {
      const noteCards = notesListRef.current.children;

      gsap.fromTo(
        noteCards,
        {
          y: 15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.06,
          delay: 0.2,
        }
      );
    }
  }, [notes]);

  if (loading) {
    return <></>;
  }

  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-4">
        <div
          ref={headerRef}
          className="flex flex-row w-full justify-between items-center"
        >
          <Logo href="/notes" />
          <div ref={buttonsRef} className="flex flex-row gap-4">
            {notes.length > 0 && (
              <Button onClick={() => togglePopup("createNote")}>
                {t("main.header.createNote")}
              </Button>
            )}
            <NoteSettings onClick={() => togglePopup("settings")} />
          </div>
        </div>

        <div
          ref={contentRef}
          className="h-[90%] overflow-auto overflow-x-hidden"
        >
          {notes.length > 0 ? (
            <div className="md:p-5 md:pt-0 md:border-l-1 border-accent overflow-x-hidden overflow-auto flex-row flex-wrap gap-2 content-start">
              <h2
                ref={titleRef}
                className="md:text-[32px] font-extrabold text-accent"
              >
                {t("notes.home.primaryTitle")}
              </h2>
              <div ref={notesListRef} className="flex flex-col gap-2">
                {notes.map((note: Note) => (
                  <Card key={note.id} model={note}></Card>
                ))}
              </div>
            </div>
          ) : (
            <NoContent />
          )}
        </div>
      </Panel>
    </div>
  );
}
