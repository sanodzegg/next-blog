import moment from 'moment';
import React from 'react'
import { isValidURL } from '../../../../utils/IsURLValid';
import classes from "../UserBlogs.module.css";

import defaultImg from "../../../../assets/default.png"

const Blog = ({ title, date, readTime, description, story }:any) => {
    const matchPic = story.match(/!\[.*?]\((.*?)\)/g);
    const url = matchPic && matchPic[0].match(/\((.*?)\)/g);
    const parsedUrl = url && url[0].replace(/\(|\)/g, "");

    const urlValid = isValidURL(parsedUrl);

    const parsedStory = story.replaceAll(/\*\*|\*\*/g, "").replaceAll(/\*|\*/g).replaceAll(/> |/g, "")
    .replaceAll(/!\[.*?]\((.*?)\)/g, "").replaceAll(/\[.*?]\((.*?)\)/g, "").trim();

    return (
        <div className={classes.blogWrapper}>
            <div className={classes.imgWrapper}>
                <img src={urlValid ? parsedUrl : defaultImg.src} alt="blog image" />
            </div>
            <div className={classes.timeStamps}>
                <span>{moment(date).format("MMM D")}</span>
                <span>{`${readTime} min read`}</span>
            </div>
            <h2>{title}</h2>
            <p>{description ? description : `${parsedStory.slice(0, 95)}...`}</p>
        </div>
    )
}

export default Blog