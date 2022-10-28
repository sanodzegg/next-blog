import Image from "next/image";
import classes from "./Wrapper.module.css";
import moment from "moment";
import { isValidURL } from "../../../utils/IsURLValid";

type props = {
    publishedAt: string,
    description: string,
    readTime: number,
    story: string,
    tags: string[],
    title: string
}

import defaultAvatar from "../../../assets/default.png";

const Blog = ({ publishedAt, description, readTime, story, tags, title }:props) => {
    const matchPic = story.match(/!\[.*?]\((.*?)\)/g);
    const url = matchPic && matchPic[0].match(/\((.*?)\)/g);
    const parsedUrl = url && url[0].replace(/\(|\)/g, "");
    
    const urlValid = parsedUrl && isValidURL(parsedUrl);

    return (
        <div className={classes.blog}>
            {<div className={classes.blogImgWrapper}><img src={urlValid ? parsedUrl : defaultAvatar.src} alt={"blog visual"} /></div>}
            <div className={classes.timeStamps}>
                <span>{moment(publishedAt).format("MMM D")}</span>
                <span>{`${readTime} min read`}</span>
            </div>
            <h2>{title.length > 45 ? `${title.slice(0, 45)}...` : title}</h2>
            {description ? <p>{description.length > 100 ? `${description.slice(0, 100)}...` : description}</p> : <p>{`${story.slice(0, 100)}...`}</p>}
        </div>
    );
}

export default Blog;