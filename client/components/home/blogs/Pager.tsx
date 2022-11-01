import classes from "./Wrapper.module.css";

type props = {
    current: number,
    changePage: (current: number) => void,
    lastPage: boolean
}

const Pager = ({ current, changePage, lastPage }:props) => {
    console.log(lastPage);
    
    return (
        <div className={classes.pager}>
            <span>{current}</span>
            {current > 1 && <button onClick={() => current >= 1 && changePage(current - 1)} className={classes.prevButton}>previous</button>}
            {<button className={lastPage ? classes.nextBtnDisabled : ''} onClick={() => current < 3 && changePage(current + 1)}>next</button>}
        </div>
    );
}

export default Pager;