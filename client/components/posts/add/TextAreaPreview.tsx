import React, { useEffect, useRef, useState } from 'react'
import { useOnOutsideClick } from '../../../hooks/useOutsideClick'
import { parseForHTML } from '../../../utils/HTMLParser';
import classes from "./Text.module.css";

type props = {
  title: string,
  description: string
  textForHtml:string,
  emitPreview: (current: boolean) => void
}

const TextAreaPreview = ({ title, description, textForHtml, emitPreview }:props) => {
    const previewRef = useRef<HTMLDivElement>(null);
    const [generatedHTML, setGeneratedHTML] = useState("");

    useEffect(() => {
      setGeneratedHTML(parseForHTML(textForHtml));
    }, [textForHtml]);

    useOnOutsideClick(previewRef, () => emitPreview(false));

  return (
    <div className={classes.wrapper}>
      <h1>{title ? title : "Here goes your title."}</h1>
      <h3>{description ? description : "Here goes your description."}</h3>
      <div className={classes.previewHTML} ref={previewRef} dangerouslySetInnerHTML={{__html: generatedHTML}}></div>
    </div>
  )
}

export default TextAreaPreview