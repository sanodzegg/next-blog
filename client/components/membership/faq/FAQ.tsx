import uniqueId from "lodash.uniqueid";
import classes from "./FAQ.module.css";
import QuestionWrapper from "./QuestionBox";

type questionTypes = {
    question: string,
    answer: string
}

type props = {
    questions: questionTypes[]
}

const FAQ = ({ questions }:props) => {
    const parted = questions.map((e, i) => {
        if(i % 4 === 0) {
            return questions.slice(i, i + 4);
        }
    });

    const filtered = parted.filter(e => {
        return e !== undefined;
      });
    
    return (
        <div className={classes.faq}>
            <h1>Frequently Asked Questions</h1>
            <div className={classes.questionWrapper}>
                {filtered.map(e => {
                    return <QuestionWrapper data={e} key={uniqueId()} />
                })}
            </div>
        </div>
    )
}

export default FAQ;