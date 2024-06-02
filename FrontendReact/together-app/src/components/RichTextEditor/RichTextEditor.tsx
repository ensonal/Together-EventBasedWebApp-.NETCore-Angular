import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './RichTextEditor.css';

interface RichTextEditorProps {
  value?: string;
  onTextChange: (content: string) => void;
}

const RichTextEditor = forwardRef<Quill | null, RichTextEditorProps>(
  ({ value, onTextChange }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const defaultValueRef = useRef(value);
    const onTextChangeRef = useRef(onTextChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
    }, [onTextChange]);

    useEffect(() => {
      const container = containerRef.current;
      if (container) {
        container.style.height = `100px`;
        const editorContainer = container.appendChild(
          container.ownerDocument.createElement('div')
        );
        const quill = new Quill(editorContainer, {
          theme: 'snow',
        });

        if (typeof ref === 'function') {
          ref(quill);
        } else if (ref && 'current' in ref) {
          ref.current = quill;
        }

        if (defaultValueRef.current) {
          quill.root.innerHTML = defaultValueRef.current;
        }

        quill.on('text-change', () => {
          onTextChangeRef.current(quill.root.innerHTML);
        });

        return () => {
          if (ref && 'current' in ref) {
            ref.current = null;
          }
          container.innerHTML = '';
        };
      }
    }, [ref]);

    return <div ref={containerRef} className="quill-editor-container"></div>;
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
