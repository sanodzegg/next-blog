import React, { useEffect, useRef, useState } from 'react'
import { useOnOutsideClick } from '../../../hooks/useOutsideClick'
import classes from "./Text.module.css";

type props = {
    textForHtml:string,
    emitPreview: any
}

const TextAreaPreview = ({ textForHtml, emitPreview }:props) => {
    const previewRef = useRef<HTMLDivElement>(null);
    const [generatedHTML, setGeneratedHTML] = useState("");


    useEffect(() => {
      setGeneratedHTML(parseForHTML(textForHtml));
    }, [textForHtml]);

    const parseForHTML = (text:string) => {
      const h1 = /# (.*$)/gim;
      const bq = /\> (.*$)/gim;
      const bold = /\*\*(.*)\*\*/gim;
      const italics = /\*(.*)\*/gim;
      const image = /!\[(.*?)\]\((.*?)\)/gim;
      const link = /\[(.*?)\]\((.*?)\)/gim;
      const lineBreak = /\n$/gim;
      const htmlText = text.trim().replace(h1, "<h1>$1</h1>").replace(bq, "<blockquote>$1</blockquote>")
      .replace(bold, "<b>$1</b>").replace(italics, '<i>$1</i>').replace(image, "<img alt='$1' src='$2' />")
      .replace(link, "<a target='_blank' rel='noreferrer' href='$2'>$1</a>").replace(lineBreak, '<br />');
      
      return htmlText.trim();
    }

    useOnOutsideClick(previewRef, () => emitPreview(false));

  return (
    <div className={classes.wrapper}>
      <div className={classes.previewHTML} ref={previewRef} dangerouslySetInnerHTML={{__html: generatedHTML}}></div>
    </div>
  )
}

export default TextAreaPreview