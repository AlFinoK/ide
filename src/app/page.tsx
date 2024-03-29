"use client"

import Editor from '@monaco-editor/react';
// @ts-ignore
import Sk from 'skulpt'
import { useRef } from "react";

export default function Home() {
  const editorRef = useRef<any>(null);
  const resultRef = useRef<HTMLDivElement>(null)

  function outf(text: string) {
    resultRef.current!.innerHTML = resultRef.current!.innerHTML + text;
  }

  const execute = () => {
    const prog = editorRef.current.getValue()
    resultRef.current!.innerHTML = '';
    Sk.configure({ output: outf });
    try {
      Sk.importMainWithBody("<stdin>", false, prog);
    } catch (e) {
      alert(e);
    }
  }

  const defaultText = "print(\"Hello World\")"

  return (
    <main className='bg-slate-200'>
      <div className="h-screen flex">
        <div className="flex-1">
          <div className="mb-2">
            <button className="bg-slate-500 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    onClick={execute}>Выполнить
            </button>
          </div>
          <Editor height="90vh" defaultLanguage="python" defaultValue={defaultText}
                  onMount={editor => editorRef.current = editor} />;
        </div>
        <div className="w-[40rem] bg-slate-300" ref={resultRef} />
        <div className="w-[20rem] bg-slate-500">
          Тут задание
        </div>
      </div>
    </main>
  );
}
