import { NextPage } from "next";
import classes from "./QuestionWrapper.module.css";
import ArrowIcon from "../../../assets/icons/faq_icon.svg";
import Image from "next/image";
import { useState } from "react";

type props = {
    question: string,
    answer: string
}

const Box:NextPage<props> = ({ question, answer }) => {
    const [active, setActive] = useState(false);

    const boxClass = active ? `${classes.questionBox} ${classes.questionActive}` : `${classes.questionBox} ${classes.questionInactive}`;

    return (
        <section className={boxClass} onClick={() => setActive(!active)}>
            <div className={classes.wrapperHeader}>
                <h4>{question}</h4>
                <Image src={ArrowIcon.src} width={ArrowIcon.width} height={ArrowIcon.height} className={active ? classes.active : classes.inactive} />
            </div>
            <p>{answer}</p>
        </section>
    );
}

export default Box;