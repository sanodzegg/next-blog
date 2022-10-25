import Box from "./Box";
import classes from "./QuestionWrapper.module.css";

type props = {
    data?: object[]
}

const QuestionWrapper = ({ data }:props) => {
    return (
        <div className={classes.boxWrapper}>
            {data && data.map((e:any, i:number) => {
                return (
                    <Box question={e.question} answer={e.answer} key={i} />
                )
            })}
        </div>
    )
}

export default QuestionWrapper;