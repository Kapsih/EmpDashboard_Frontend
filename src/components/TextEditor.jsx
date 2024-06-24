import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import React, { useEffect, useState } from 'react';

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

export default function TextEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  useEffect(() => {
    const html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
console.log(convertedContent)
  return (
    <div>
      <Editor
       
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        wrapperStyle={{
          padding: '1rem',
          border: '1px solid',
        }}
        editorStyle={{
          backgroundColor: 'beige',
          padding: '1rem',
          border: '1px solid',
        }}
        toolbarStyle={{
          border: '1px solid',
        }}
        onEditorStateChange={onEditorStateChange}
      />
      <div
        className="preview"
        style={{
          padding: '1rem',
          marginTop: '1rem',
        }}
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      />
    </div>
  );
}
