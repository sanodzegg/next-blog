import React, { useEffect, useRef, useState } from 'react'
import TextArea from './TextArea'
import classes from "./Text.module.css"

const TextInputs = ({ revalidate, localData, show, errors, emitErrors, emitPostData }:any) => {
  const parsedLocal = localData && JSON.parse(localData);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(parsedLocal) {
      setTitle(parsedLocal.title);
      setDescription(parsedLocal.description);
    }
  }, [localData]);

  useEffect(() => {
    if(revalidate) {
      handleTitleBlur();
      handleDescriptionBlur();
    }
  }, [revalidate])

  useEffect(() => {
    setLoading(false);
  }, [parsedLocal]);

  useEffect(() => {
    if (title) emitPostData((prev:{ title: string }) => ({...prev, title: title}));
    if (description) emitPostData((prev:{ description: string }) => ({...prev, description: description}));
  }, [title, description]);
  
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const urlReg = /(https?:\/\/[^\s]+)/g;

  const handleTitleBlur = () => {
    if(titleRef.current) {
      if(titleRef.current.value !== "" && titleRef.current.value.length < 130 && !urlReg.test(titleRef.current.value)) {
        emitErrors((prev:{ title: boolean }) => ({...prev, title: true }));
      } else emitErrors((prev:{ title: boolean }) => ({...prev, title: false }));
    }
  }

  const handleDescriptionBlur = () => {
    if(descriptionRef.current) {
      if(descriptionRef.current.value.length < 130 && !urlReg.test(descriptionRef.current.value)) {
        emitErrors((prev:{ description: boolean }) => ({...prev, description: true }));
      } else emitErrors((prev:{ description: boolean }) => ({...prev, description: false }));
    }
  }

  return (
    <>
        <input className={`${(show && !errors.title) ? classes.invalid : ''} ${loading ? classes.loading : ''}`} ref={titleRef} type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} onBlur={handleTitleBlur} value={title} />
        <input className={`${(show && !errors.description) ? classes.invalid : ''} ${loading ? classes.loading : ''}`} ref={descriptionRef} type="text" placeholder="Description (optional)" onChange={(e) => setDescription(e.target.value)} onBlur={handleDescriptionBlur} value={description} />
        <TextArea revalidate={revalidate} localData={localData} title={title} description={description} show={show} valid={errors.story} emitValid={emitErrors} emitAreaPost={emitPostData} />
    </>
  )
}

export default TextInputs