import React, { useEffect, useRef } from 'react'
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/monokai.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";

export default function Editor() {
  const editorRef = useRef(null);
  useEffect( ()=> {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "monokai",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      )
      editor.setSize(null, "100%");
    }
    init();
  },[]);
  return (
    <div style={{ height: "730px" }}>
      <textarea id="realtimeEditor"></textarea>
    </div>
  )
}
