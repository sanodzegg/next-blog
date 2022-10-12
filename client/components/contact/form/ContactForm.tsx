import axios from "axios";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import classes from "./ContactForm.module.css";
import uniqueId from 'lodash.uniqueid';

const subjects = [
    "Membership Plan",
    "Report a problem",
    "Other"
];

type props = {
    sessionData?: sessionTypes
}

type sessionTypes = {
    name: string,
    email: string,
    phone: string,
    subject: string,
    message: string
}

const Form:NextPage<props> = ({ sessionData }) => {
    const optionWrapperRef = useRef<HTMLDivElement>(null);
    const [selector, setSelector] = useState(false);

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    useEffect(() => {
        setInputs({
            name: sessionData?.name ? sessionData.name : "",
            email: sessionData?.email ? sessionData.email : "",
            phone: sessionData?.phone ? sessionData.phone : "",
            subject: sessionData?.subject ? sessionData.subject : "",
            message: sessionData?.message ? sessionData.message : ""
        });
    }, [sessionData]);
    
    const [errors, setErrors] = useState({
       name: false,
       email: false,
       phone: false,
       subject: false,
       message: false 
    });

    const inputRefs = {
        nameInput: useRef(null),
        emailInput: useRef(null),
        phoneInput: useRef(null),
        subject: useRef(null),
        message: useRef(null)
    }
    
    const [showErrors, setShowErrors] = useState(false);

    const handleSelector = () => {
        const optionWrapper = optionWrapperRef.current;
        if(!selector) {
            setSelector(true);
        } else {
            if(optionWrapper) {
                optionWrapper.style.height = "0";
                setTimeout(() => {
                    setSelector(false);
                }, 500);
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            const optionWrapper = optionWrapperRef.current;
            if(selector && optionWrapper) {
                optionWrapper.style.height = "110px";
            }
        }, 25);
    }, [selector]);

    const handleNameBlur = () => {
        sessionStorage.setItem("contactMail", JSON.stringify(inputs));
        if(inputRefs.nameInput.current !== null) {
            const val = (inputRefs.nameInput.current as HTMLInputElement).value;
            if(val.length < 2) {
                setErrors((prev) => ({...prev, name: false}));
            } else setErrors((prev) => ({...prev, name: true}));
        }
    }

    const handleEmailBlur = () => {
        sessionStorage.setItem("contactMail", JSON.stringify(inputs));
        if(inputRefs.emailInput.current !== null) {
            const val = (inputRefs.emailInput.current as HTMLInputElement).value;
            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(pattern.test(val)) {
                setErrors((prev) => ({...prev, email: true}));
            } else setErrors((prev) => ({...prev, email: false}));
        }
    }

    const handlePhone = () => {
        sessionStorage.setItem("contactMail", JSON.stringify(inputs));
        if(inputRefs.phoneInput.current !== null) {
            const val = (inputRefs.phoneInput.current as HTMLInputElement).value;
            if(val.length < 5 || /[a-zA-Z]/.test(val)) {
                setErrors((prev) => ({...prev, phone: false}));
            } else setErrors((prev) => ({...prev, phone: true}));
            
        }
    }

    const handleMessage = () => {
        sessionStorage.setItem("contactMail", JSON.stringify(inputs));
        if(inputRefs.message.current !== null) {
            const val = (inputRefs.message.current as HTMLTextAreaElement).value;
            if(val.length < 1) {
                setErrors((prev) => ({...prev, message: false}));
            } else setErrors((prev) => ({...prev, message: true}));
        }
    }

    const handleSubject = () => {
        sessionStorage.setItem("contactMail", JSON.stringify(inputs));
        if(inputRefs.subject.current !== null) {
            const val = (inputRefs.subject.current as HTMLDivElement).innerText;
            if(val !== "Select a subject") {
                setErrors((prev) => ({...prev, subject: true}));
            } else setErrors((prev) => ({...prev, subject: false}));
        }
    }

    useEffect(() => {
        if(inputs.subject !== "") {
            handleSubject();
        }
    }, [inputs.subject]);

    const blurWrapper = () => {
        handleNameBlur();
        handleEmailBlur();
        handlePhone();
        handleSubject();
        handleMessage();
    }

    const handleFormSubmit = async () => {
        setShowErrors(true);
        const allTrue = new Promise((res) => {
            blurWrapper();
            const falsies = Object.values(errors).filter(e => {
                return e === false;
            });
            if(falsies.length === 0) {
                res(true);
            }
        });
        return allTrue;
    }

    const submit = async () => {
        const canSend = await handleFormSubmit();
        if(canSend) {
            const res = await axios.post("http://localhost:5000/sendmail", inputs);
            const status = await res.status;
            if(status === 200) {
                setInputs({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: ""
                });
            }
            sessionStorage.setItem("contactMail", "");
        } else {
            return;
            //handle error
        }
    }

    return (
        <div className={classes.formWrapper}>
            <div className={classes.formRow}>
                <input className={showErrors && !errors.name ? classes.invalidInput : ""} type="text" placeholder="Name" ref={inputRefs.nameInput} onBlur={handleNameBlur} onChange={(e) => setInputs((prev) => ({...prev, name: e.target.value}))} value={inputs.name} />
                <input className={showErrors && !errors.email ? classes.invalidInput : ""} type="text" placeholder="Email" ref={inputRefs.emailInput} onBlur={handleEmailBlur} onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))} value={inputs.email} />
            </div>
            <div className={classes.formRow}>
                <input className={showErrors && !errors.phone ? classes.invalidInput : ""} type="text" placeholder="Phone" ref={inputRefs.phoneInput} onBlur={handlePhone} onChange={(e) => setInputs((prev) => ({...prev, phone: e.target.value}))} value={inputs.phone} />
                <div className={`${selector ? classes.selectorActive : classes.selector} ${showErrors && !errors.subject ? classes.invalidInput : ""}`} onClick={handleSelector}>
                    <span className={classes.selectorText} ref={inputRefs.subject}>{inputs.subject ? inputs.subject : "Select a subject"}</span>
                    <span className={classes.selectorIcon}>^</span>
                    {
                    selector && 
                        <div className={classes.optionWrapper} ref={optionWrapperRef}>
                            {subjects.map(e => {
                                return <span key={uniqueId()} onClick={(e) => {setInputs((prev) => ({...prev, subject: (e.target as HTMLElement).innerText})); setErrors((prev) => ({...prev, subject: true})); handleSubject()}}>{e}</span>
                            })}
                        </div>
                    }
                </div>
            </div>
            <textarea className={showErrors && !errors.message ? classes.invalidInput : ""} onBlur={handleMessage} placeholder="Message" ref={inputRefs.message} onChange={(e) => setInputs((prev) => ({...prev, message: e.target.value}))} value={inputs.message}></textarea>
            <div className={classes.underForm}>
                <button onClick={submit}>submit</button>
            </div>
        </div>
    )
}

export default Form;