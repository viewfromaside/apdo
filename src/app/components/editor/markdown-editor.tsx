"use client";

import {
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  linkDialogPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  searchPlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import "@/app/assets/mdxeditor.css";

const MarkdownEditorContent = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            gsap.from(node, {
              opacity: 0,
              y: 3,
              duration: 1,
              ease: "power1.out",
            });
          }
        });
      });
    });

    observer.observe(editorRef.current, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={editorRef} className="h-full overflow-auto">
      <MDXEditor
        markdown={`
          # ✏️ **Yo, welcome to _apdo_**

          > _Your digital corner for random sparks, wild ideas, and midnight thoughts._

          ---

          ### 🚀 **Here’s the deal:**
          - **Drop notes** fast — no pressure, no rules.  
          - **Keep ‘em safe** & always within reach.  
          - **Make it yours** — your vibe, your style.  

          ---

          <span class="ghost-ai">_Your digital corner for random sparks, wild ideas, and midnight thoughts._ </span>


          💡 _Think of apdo as your pocket graffiti wall — but cleaner._  

 `}
        toMarkdownOptions={{
          bullet: "+",
        }}
        spellCheck={false}
        plugins={[
          listsPlugin(),
          headingsPlugin(),
          searchPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          thematicBreakPlugin(),
          linkDialogPlugin(),
          codeBlockPlugin(),
          codeMirrorPlugin({
            codeBlockLanguages: { javascript: "JavaScript", python: "Python" },
          }),
          // toolbarPlugin({
          //   toolbarClassName: "bg-background",
          //   toolbarContents() {
          //     return (
          //       <>
          //         <UndoRedo />
          //         <ListsToggle />
          //         <BoldItalicUnderlineToggles />
          //       </>
          //     );
          //   },
          // }),
        ]}
        autoFocus={true}
        contentEditableClassName="
        mdx-selection
        caret-thick 
        outline-none 
        max-w-none 
        text-sm
        
        will-change-contents
        transform-gpu
        
        prose 
        dark:prose-invert 
        
        /* 📄 ESPAÇAMENTO ENTRE PARÁGRAFOS */
        /* Opções para espaçamento entre parágrafos:
           prose-p:my-1  = margin top/bottom pequeno
           prose-p:my-2  = margin top/bottom médio-pequeno
           prose-p:my-3  = margin top/bottom médio
           prose-p:my-4  = margin top/bottom grande (atual)
           prose-p:my-6  = margin top/bottom extra grande
        */
        prose-p:transition-all
        prose-p:duration-75

        caret-accent
        
        /* 📝 ESPAÇAMENTO DOS TÍTULOS */
        prose-headings:my-3
        prose-headings:leading-tight
        prose-headings:tracking-tight
        prose-headings:transition-all
        prose-headings:duration-100
        prose-headings:text-accent
        
        /* 💬 ESPAÇAMENTO DAS CITAÇÕES */
        prose-blockquote:my-3
        prose-blockquote:leading-relaxed
        prose-blockquote:transition-all
        prose-blockquote:duration-75
        
        /* 📋 ESPAÇAMENTO DAS LISTAS */
        prose-ul:my-2
        prose-ul:leading-relaxed
        prose-li:my-1
        prose-li:leading-relaxed
        prose-li:transition-all
        prose-li:duration-75
        
        /* 🔤 Código suave */
        prose-code:px-1 
        prose-code:text-accent 
        prose-code:bg-neutral/20 
        prose-code:rounded 
        prose-code:transition-all
        prose-code:duration-100
        prose-code:before:content-[''] 
        prose-code:after:content-[''] 
        
        /* 📦 Blocos de código suaves */
        prose-pre:bg-neutral/10 
        prose-pre:border 
        prose-pre:rounded-lg
        prose-pre:my-6
        prose-pre:leading-normal
        prose-pre:transition-all
        prose-pre:duration-150
        
        /* ✨ Animações suaves para interação */
        hover:prose-code:bg-neutral/30
        focus:prose-code:bg-neutral/30
        hover:prose-pre:bg-neutral/15
        focus:prose-pre:bg-neutral/15
        
        /* 🎭 Transições globais suaves */
        [&_*]:transition-colors
        [&_*]:duration-100
        [&_*]:ease-out

        
        prose-p:animate-fadeIn
        prose-li:animate-fadeIn
        prose-headings:animate-fadeIn
      "
      />
    </div>
  );
};

export const MarkdownEditor = dynamic(
  () => Promise.resolve(MarkdownEditorContent),
  { ssr: false }
);
