import Box from "./Box";
import classes from "./QuestionWrapper.module.css";

type props = {
    data?: mapTypes[]
}

type mapTypes = {
    question: string,
    answer: string
}

const QuestionWrapper = ({ data }:props) => {
    return (
        <div className={classes.boxWrapper}>
            {data && data.map((e:mapTypes, i:number) => {
                return (
                    <Box question={e.question} answer={e.answer} key={i} />
                )
            })}
        </div>
    )
}

export default QuestionWrapper;