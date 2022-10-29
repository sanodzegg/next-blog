import classes from "./Wrapper.module.css";

type props = {
    current: number,
    changePage: any,
    lastPage: boolean
}

const Pager = ({ current, changePage, lastPage }:props) => {
    return (
        <div className={classes.pager}>
            <span>{current + " / 3"}</span>
            {current > 1 && <button onClick={() => current >= 1 && changePage(current - 1)} className={classes.prevButton}>previous</button>}
            {!lastPage && <button onClick={() => current < 3 && changePage(current + 1)}>next</button>}
        </div>
    );
}

export default Pager;