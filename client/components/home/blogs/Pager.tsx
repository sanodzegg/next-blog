import classes from "./Wrapper.module.css";

const Pager = ({ current, changePage }:any) => {
    return (
        <div className={classes.pager}>
            <span>{current + " / 3"}</span>
            {current > 1 && <button onClick={() => current >= 1 && changePage(current - 1)} className={classes.prevButton}>previous</button>}
            <button onClick={() => current < 3 && changePage(current + 1)}>next</button>
        </div>
    );
}

export default Pager;