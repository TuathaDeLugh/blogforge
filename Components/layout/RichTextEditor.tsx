"use client"
import dynamic from 'next/dynamic';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const DynamicReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  theme?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, className, theme }) => {
  const toolbarOptions = [
    ['bold', 'italic', 'underline'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'header': [2, 3, false] }],
    [{ 'align': [] }],
    ['clean']
  ];


  return (
    <DynamicReactQuill
      theme = {'snow'}
      value={value}
      onChange={onChange}
      modules={{
        toolbar: toolbarOptions
      }}
      className={className}
    />
  );
};

export default RichTextEditor;
