import React, { useEffect, useRef, useState } from 'react'
import classes from "../../../pages/[user]/posts/add/AddPost.module.css";
import TextAreaPreview from './TextAreaPreview';

type props = {
    setClicked: any,
    revalidate: boolean,
    localData: string, 
    title: string,
    description: string,
    show: boolean,
    valid: boolean,
    emitValid: any,
    emitAreaPost: any
}

const TextArea = ({ setClicked, revalidate, localData, title, description, show, valid, emitValid, emitAreaPost }:props) => {
    const parsedLocal = localData && JSON.parse(localData);

    const [textAreaVal, setTextAreaVal] = useState("");
    const [preview, setPreview] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        emitAreaPost((prev:{ story: string }) => ({...prev, story: textAreaVal }));
    }, [textAreaVal]);

    useEffect(() => {
        setLoading(false);
    }, [parsedLocal]);

    useEffect(() => {
        if(revalidate) handleTextAreaBlur();
    }, [revalidate]);

    useEffect(() => {
        if(parsedLocal) {
          setTextAreaVal(parsedLocal.story);
        }
      }, [localData]);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const generateSampleClick = () => {
        setClicked(false);
        setTextAreaVal("");
        const sampleHTML = 'Your story goes here, write more than 4 words tho.\nYou can use **bold text** to make reader pay attention to it or improvise and do it the *fancier way*.\n\n\nYou can break a line by\n\nplacing a space between them.\n\n\n[Visit this website.](https://www.someurl.idk)\n\n\n> Famous quote from your favorite writer or actor. *Make it look smarter by placing single asterisks.*\n\n\nFinally, place a picture of the future US president:\n\n\n![Brent Peterson visual](https://tinyurl.com/39beau2j)'

        setTextAreaVal(sampleHTML);
        emitValid((prev:{ story: boolean }) => ({...prev, story: true}));
    }

    const handleTextAreaBlur = () => {
        if(textAreaVal) emitValid((prev:{ story: boolean }) => ({...prev, story: true}));
        else emitValid((prev:{ story: boolean }) => ({...prev, story: false}));
    }

    return (
        <section className={`${classes.textAreaWrapper}${loading ? ` ${classes.loadingTextArea}` : ''}`}>
            {preview && <TextAreaPreview title={title} description={description} textForHtml={textAreaVal} emitPreview={setPreview} />}
            <div className={classes.tools}>
                <span className={classes.bold} onClick={() => setTextAreaVal(prev => prev + " **bold text**")}>Bold</span>
                <span className={classes.italic} onClick={() => setTextAreaVal(prev => prev + " *emphasized text*")}>Italic</span>
                <span onClick={() => setTextAreaVal(prev => prev + " [text](url)")}>Link</span>
                <span onClick={() => setTextAreaVal(prev => prev + " > blockquote")}>Blockquote</span>
                <span onClick={() => setTextAreaVal(prev => prev + " ![Alt text](url)")}>IMG</span>
                <span className={classes.preview} onClick={() => setPreview(true)}>Preview</span>
                <span className={classes.genSample} onClick={generateSampleClick}>Generate sample</span>
            </div>
            <textarea onBlur={handleTextAreaBlur} className={`${(show && !valid) ? classes.invalid : ''}`} value={textAreaVal} ref={textAreaRef} onChange={(e) => setTextAreaVal(e.target.value)} rows={5} placeholder="Write your story here"></textarea>
        </section>
    )
}

export default TextArea