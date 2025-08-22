"use client";
import {
  Button,
  Card,
  Logo,
  NoContent,
  NoteSettings,
  Panel,
  PopupSearch,
  PopupSettings,
} from "@/app/components";
import { useEffect, useState, useRef } from "react";
import { Note } from "../services";
import { useAtomValue, useSetAtom } from "jotai";
import { togglePopupAtom } from "../store/pop-up";
import { deleteNoteAtom, notesAtom, saveNoteAtom } from "../store";
import gsap from "gsap";

export default function NotesHome() {
  const notes = useAtomValue(notesAtom);
  const togglePopup = useSetAtom(togglePopupAtom);

  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const notesListRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

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
    // Animação suave da lista de notas
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
                create note
              </Button>
            )}
            <NoteSettings onClick={() => togglePopup("settings")} />
          </div>
        </div>

        <div ref={contentRef} className="h-full">
          {notes.length > 0 ? (
            <div className="md:p-5 md:pt-0 md:border-l-1 border-accent overflow-x-hidden overflow-auto flex-row flex-wrap gap-2 content-start">
              <h2
                ref={titleRef}
                className="md:text-[32px] font-extrabold text-accent"
              >
                so there are my notes
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
