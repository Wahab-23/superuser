import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';

export const Jodit = (props) => {
  const editor = useRef(null);
  const [content, setContent] = useState(null);
  const [updateValue, setUpdateValue] = useState();

  useEffect(() => {
    if (content !== '<p><br></p>') {
      setUpdateValue(content);
    } else if (props.HandleValue) {
      setUpdateValue(props.HandleValue);
    } else {
      setUpdateValue(content);
    }
  }, [props.HandleValue, content]);
  
  
  const config = useMemo(() => {
    const buttons = [
      "undo",
      "redo",
      "|",
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "superscript",
      "subscript",
      "|",
      "align",
      "|",
      "ul",
      "ol",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "image",
      "link",
      "table",
      "|",
      "hr",
      "eraser",
      "copyformat",
      "|",
      "selectall",
      "print",
      "|",
      "source",
      "|"];
    return {
      readonly: false,
      placeholder: 'Start typing...',
      margin: "0px auto",
      height: '450px',
      buttons: buttons,
    };
  }, []);

  return (
    <div className="juditContainer">
      <JoditEditor
        ref={editor}
        value={updateValue}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => {
            setContent(newContent);
            props.handleOverviewChange(content);
        }}
        onChange={(newContent) => {
            setContent(newContent);
            props.handleOverviewChange(content);
        }}
      />  
    </div>
  );
};
