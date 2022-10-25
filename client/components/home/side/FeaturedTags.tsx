import uniqueId from "lodash.uniqueid";
import classes from "./Side.module.css";

const tags = ["Books", "Clothes", "Coaching", "Ecommerce", "Exercise", "Health", "Holiday", "Marketing", "Tech", "Travel", "University"];

const FeaturedTags = () => {
    return (
        <div className={classes.tags}>
            <span>tags</span>
            {tags.map(e => {
                return <div key={uniqueId()} className={classes.tag}>{e}</div>
            })}
        </div>
    );
}

export default FeaturedTags;