"use client";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
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
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  loadNotesAtom,
  noteServiceAtom,
  saveNoteAtom,
  selectedNoteAtom,
  selectedNoteIndexAtom,
  setSelectedNoteAtom,
} from "@/app/store";
import editor from "@/app/assets/main.json"; // JSON local com suas notas
import { togglePopupAtom } from "@/app/store/pop-up";
import { useParams, useRouter } from "next/navigation";
import { getUser, verifyItsLogged } from "@/app/store/user";
import { Note, NoteRequest } from "@/app/services";

export default function NoteHome({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const [localContent, setLocalContent] = useState<string>("");
  const [localTitle, setLocalTitle] = useState<string>("new file");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [readOnly, setReadOnly] = useState<boolean>(false);

  const [saved, setSaved] = useState<boolean>(true);
  const [formatMarkdownToggle, setFormatMarkdownToggle] =
    useState<boolean>(true);

  const togglePopup = useSetAtom(togglePopupAtom);
  const selectedNote = useAtomValue(selectedNoteAtom);
  const setSelectedNote = useSetAtom(setSelectedNoteAtom);
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(
    selectedNoteIndexAtom
  );
  const saveNote = useSetAtom(saveNoteAtom);
  const loadNotes = useSetAtom(loadNotesAtom);
  const router = useRouter();

  useEffect(() => {
    if (!verifyItsLogged()) {
      return router.replace("/account/sign-in");
    }

    const loggedUser = getUser();

    async function getData() {
      const noteRequest = new NoteRequest(localStorage.getItem("jwt") || "");
      const response = await noteRequest.sendFindOne(id);
      if (response !== null) {
        let asNote = new Note(response);
        setSelectedNote(asNote);
        setLocalContent(asNote.content);
        setLocalTitle(asNote.title);
        setReadOnly(asNote.createdBy != loggedUser?.username);
        console.log(asNote.createdBy);
        console.log(loggedUser?.username);
      }
    }

    if (selectedNote) {
      setLocalContent(selectedNote.content || "");
      setLocalTitle(selectedNote.title || "new file");
      setReadOnly(selectedNote.createdBy != loggedUser?.username);
    } else {
      getData();
    }
    setIsInitialized(true);
  }, [selectedNote, id]);

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
      toast("locked up, no cap", {
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

  if (!verifyItsLogged()) {
    return <></>;
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
          <div className="flex justify-center items-center">Carregando...</div>
        )}

        <UnsavedBottomBar show={!saved} />
      </Panel>
    </div>
  );
}
