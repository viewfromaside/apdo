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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  loadNotesAtom,
  saveNoteAtom,
  selectedNoteAtom,
  selectedNoteIndexAtom,
} from "@/app/store";
import editor from "@/app/assets/main.json";
import { togglePopupAtom } from "@/app/store/pop-up";

export default function NoteHome() {
  const [localContent, setLocalContent] = useState<string>("");
  const [localTitle, setLocalTitle] = useState<string>("new file");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const [saved, setSaved] = useState<boolean>(true);
  const [formatMarkdownToggle, setFormatMarkdownToggle] =
    useState<boolean>(true);

  const togglePopup = useSetAtom(togglePopupAtom);
  const selectedNote = useAtomValue(selectedNoteAtom);
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(
    selectedNoteIndexAtom
  );
  const saveNote = useSetAtom(saveNoteAtom);
  const loadNotes = useSetAtom(loadNotesAtom);

  useEffect(() => {
    if (selectedNote) {
      console.log("Setting content from selectedNote:", selectedNote.content);
      setLocalContent(selectedNote.content || "");
      setLocalTitle(selectedNote.title || "new file");
    } else {
      setLocalContent("");
      setLocalTitle("new file");
    }

    setIsInitialized(true);
  }, [selectedNote]);

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

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
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
        style: {
          width: "fit-content",
          paddingTop: 12,
          paddingBottom: 12,
        },
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

        {formatMarkdownToggle ? (
          <MarkdownEditor
            key={`md-${selectedNote?.id || "new"}-${isInitialized}`}
            content={localContent}
            setContent={setLocalContent}
          />
        ) : (
          <RawEditor
            key={`raw-${selectedNote?.id || "new"}-${isInitialized}`}
            content={localContent}
            setContent={setLocalContent}
          />
        )}

        <UnsavedBottomBar show={!saved} />
      </Panel>
    </div>
  );
}
