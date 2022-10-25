import uniqueId from 'lodash.uniqueid';
import React, { useEffect, useRef, useState } from 'react'
import { useOnOutsideClick } from '../../../hooks/useOutsideClick';
import classes from "../../../pages/[user]/posts/add/AddPost.module.css";

const outerTags = ["Books", "Clothes", "Coaching", "Ecommerce", "Exercise", "Health", "Holiday", "Marketing", "Tech", "Travel", "University"];

const TagInputs = ({ emitPostData }:any) => {
    const [openState, setOpenState] = useState(false);
    const [tags, setTags] = useState<string[]>([]);

    const optionsRef = useRef<HTMLDivElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSelectorClick = (node:HTMLElement) => {
        if(node.tagName !== "P") setOpenState(!openState);
        else handleRemoveTag(node.innerText);
    }

    const handleTagChoose = (tagValue:string) => {
        if(!tags.includes(tagValue) && tags.length < 13) setTags((prev) => [...prev, tagValue]);
    }

    useEffect(() => {
        if(spanRef.current) {
            if(tags.length > 0) {
                spanRef.current.style.display = "none"
            } else spanRef.current.style.display = "inline-block";
        }
        if(inputRef.current) inputRef.current.value = "";
        emitPostData((prev: any) => ({...prev, tags: tags}));
    }, [tags]);

    const handleRemoveTag = (e:string) => {
        const updatedTags = tags.slice(0);
        const index = tags.indexOf(e);
        updatedTags.splice(index, 1);
        setTags(updatedTags);
    }

    const handleCustomTag = async (key:string, val:HTMLInputElement) => {
        if(val.value !== "" && key === "Enter" && val.value.trim().split(" ").length < 2 
        && !tags.includes(val.value.trim()) && val.value.trim().length <= 45) {
            setTags((prev) => [...prev, val.value]);
        }
    }

    useOnOutsideClick(optionsRef, () => setOpenState(false));

    return (
        <section ref={optionsRef}>
            <div className={`${classes.selectorWrapper}${tags.length > 0 ? ` ${classes.full}` : ''}${openState ? ` ${classes.open}` : ''}`} onClick={(e) => handleSelectorClick(e.target as HTMLElement)}>
                <span ref={spanRef}>Add tags to your blog (optional)</span>
                <span className={`${classes.arrow}${openState ? ` ${classes.active}` : ''}`}>^</span>
                {tags.map(e => {
                    return <p key={uniqueId()}>{e}</p>
                })}
            </div>
            <div className={`${classes.tagOptions}${openState ? ` ${classes.active}` : ''}`}>
                <input ref={inputRef} type="text" placeholder='Write your own...' onKeyUp={(e) => handleCustomTag(e.key, (e.target as HTMLInputElement))} />
                {outerTags.map(e => {
                    return <div onClick={(e) => handleTagChoose((e.target as HTMLDivElement).innerText)} key={uniqueId()} className={classes.tag}>{e}</div>
                })}
            </div>
        </section>
    )
}

export default TagInputs