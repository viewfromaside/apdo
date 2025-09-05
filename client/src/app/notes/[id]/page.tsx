"use client";

import {
  FileName,
  GoBack,
  MarkdownEditor,
  NoteModeToggle,
  NoteSettings,
  Panel,
  RawEditor,
  UnsavedBottomBar,
} from "@/app/components";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAtomValue, useSetAtom } from "jotai";
import { saveNoteAtom, selectedNoteAtom, setSelectedNoteAtom } from "@/store";
import { togglePopupAtom } from "@/store/pop-up";
import { useRouter } from "next/navigation";
import { getUser, verifyItsLogged } from "@/store/user";
import { Note, NoteRequest, User } from "@/services";
import { useTranslations } from "next-intl";

export default function NoteHome({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = useTranslations("general");
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const [localContent, setLocalContent] = useState<string>("");
  const [localTitle, setLocalTitle] = useState<string>("new file");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [readOnly, setReadOnly] = useState<boolean>(true);

  const [saved, setSaved] = useState<boolean>(true);
  const [formatMarkdownToggle, setFormatMarkdownToggle] =
    useState<boolean>(true);

  const togglePopup = useSetAtom(togglePopupAtom);
  const selectedNote = useAtomValue(selectedNoteAtom);
  const setSelectedNote = useSetAtom(setSelectedNoteAtom);
  const saveNote = useSetAtom(saveNoteAtom);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const noteRequest = new NoteRequest("");
      const response = await noteRequest.sendFindOne(id);
      if (response !== null) {
        let asNote = new Note(response);
        let loggedUser: User | null = null;
        if (verifyItsLogged()) {
          loggedUser = getUser();
        }
        setSelectedNote(asNote);
        setLocalContent(asNote.content);
        setLocalTitle(asNote.title);
        setReadOnly(asNote.createdBy !== loggedUser?.username);
      }
    }
    getData();
    setIsInitialized(true);
  }, [id]);

  useEffect(() => {
    if (selectedNote && isInitialized) {
      const hasContentChanged = localContent !== (selectedNote.content || "");
      setSaved(!hasContentChanged);
    }
  }, [localContent, localTitle, selectedNote, isInitialized]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        if (!saved && isInitialized) {
          handleSave();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [saved, isInitialized, localContent, localTitle, selectedNote]);

  const handleSave = () => {
    try {
      saveNote({
        id: selectedNote?.id,
        title: localTitle,
        content: localContent,
      });

      setSaved(true);
      toast(t("editor.save"), {
        style: { width: "fit-content", paddingTop: 12, paddingBottom: 12 },
      });
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Error saving file");
    }
  };

  if (!isInitialized) {
    return (
      <div className="flex w-full justify-center items-center">
        <Panel className="flex flex-col gap-3"></Panel>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-2 items-center">
            <GoBack href="/notes" />
            {selectedNote && (
              <FileName className="w-fit">{localTitle}</FileName>
            )}
          </div>
          <div className="flex flex-row gap-2">
            <NoteSettings onClick={() => togglePopup("settings")} />
            <NoteModeToggle
              formatMarkdownToggle={formatMarkdownToggle}
              setFormatMarkdownToggle={setFormatMarkdownToggle}
            />
          </div>
        </div>

        {selectedNote ? (
          formatMarkdownToggle ? (
            <MarkdownEditor
              readOnly={readOnly}
              key={`md-${selectedNote.id}-${isInitialized}`}
              content={localContent}
              setContent={setLocalContent}
            />
          ) : (
            <RawEditor
              readOnly={readOnly}
              key={`raw-${selectedNote.id}-${isInitialized}`}
              content={localContent}
              setContent={setLocalContent}
            />
          )
        ) : (
          <div className="flex justify-center items-center"></div>
        )}

        <UnsavedBottomBar show={!saved} />
      </Panel>
    </div>
  );
}
