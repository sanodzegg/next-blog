import uniqueId from "lodash.uniqueid";
import { useRouter } from "next/router";
import classes from "./Side.module.css";

const tags = ["Books", "Clothes", "Coaching", "Ecommerce", "Exercise", "Health", "Holiday", "Marketing", "Tech", "Travel", "University"];

const FeaturedTags = () => {
    const router = useRouter();
    
    return (
        <div className={classes.tags}>
            <span>tags</span>
            {tags.map(e => {
                return <div onClick={() => router.push(`/blogs/${e}`)} key={uniqueId()} className={classes.tag}>{e}</div>
            })}
        </div>
    );
}

export default FeaturedTags;