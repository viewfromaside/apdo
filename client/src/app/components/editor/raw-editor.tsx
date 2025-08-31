import { ComponentProps, Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import "@/app/assets/mdxeditor.css";

type RawEditorProps = ComponentProps<"textarea"> & {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
};

export const RawEditor = ({
  content,
  className,
  setContent,
  ...props
}: RawEditorProps) => {
  return (
    <textarea
      {...props}
      className={twMerge(
        "w-full h-full dark:bg-white/5 mdx-selection rounded-md text-neutral font-mono p-4 outline-none resize-none",
        className
      )}
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
};
