import "@wangeditor/editor/dist/css/style.css"; // import css
import { i18nChangeLanguage } from "@wangeditor/editor";
import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";

const WysiwygEditor = ({setContent}) => {
  i18nChangeLanguage("en");
  const [editor, setEditor] = useState(null);
  const [html, setHtml] = useState("<p>hello</p>");

  useEffect(() => {
    setTimeout(() => {
      setHtml("<p>hello&nbsp;world</p>");
    }, 1500);
  }, []);

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
 

  const toolbarConfig = {
    excludeKeys: ["uploadVideo", "insertVideo", "editVideoSize"],
  };

  const editorConfig = {
    // JS syntax

    placeholder: "Type here...",
  };



  return (
    <>
        <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
          <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
            style={{ borderBottom: "1px solid #ccc" }}
          />
          <Editor
            defaultConfig={editorConfig}
            value={html}
            onCreated={setEditor}
            onChange={(editor) => setContent(editor.getHtml())}
            mode="default"
            style={{ height: "500px", overflowY: "hidden" }}
          />
        </div>
        <div style={{ marginTop: "15px" }}>{html}</div>
    </>
  );
};

export default WysiwygEditor;
