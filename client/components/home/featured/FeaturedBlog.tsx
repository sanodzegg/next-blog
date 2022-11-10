import Image from 'next/image';
import classes from "./FeaturedBlog.module.css";
import moment from "moment"
import { useRouter } from 'next/router';

type props = {
  post: Partial<postTypes>
}

type postTypes = {
  _id: string,
  date: string,
  story: string,
  title: string,
  description: string
}

import defaultImg from "../../../assets/default.png";
import { isValidURL } from '../../../utils/IsURLValid';
import { useEffect, useState } from 'react';

const FeaturedBlog = ({ post }:props) => {
  const router = useRouter();

  const [parsedUrl, setParsedUrl] = useState("");
  const [urlValid, setUrlValid] = useState(false);
  const [parsedText, setParsedText] = useState("");

  useEffect(() => {
    if(Object.values(post).length > 0 && post.story) {
      const matchPic = post.story.match(/!\[.*?]\((.*?)\)/g);
      const url = matchPic && matchPic[0].match(/\((.*?)\)/g);
      url && setParsedUrl(url[0].replace(/\(|\)/g, ""));
      setParsedText(post.story.replaceAll(/\*\*|\*\*/g, "").replaceAll(/\*|\*/g, "").replaceAll(/> |/g, "")
      .replaceAll(/!\[.*?]\((.*?)\)/g, "").replaceAll(/\[.*?]\((.*?)\)/g, "").trim())
    }
  }, [post]);

  useEffect(() => {
    if(parsedUrl) {
      setUrlValid(isValidURL(parsedUrl))
    }
  }, [parsedUrl]);

  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = defaultImg.src;
  }

  if(Object.values(post).length > 0) {
    return (
      <div className={classes.featuredWrapper} onClick={() => router.push(`/detailed/${post._id}`)}>
        <div className={classes.imgWrapper}>
          <img onError={handleImgError} src={urlValid ? parsedUrl : defaultImg.src} alt="blog image" />
        </div>
        <div className={classes.featuredText}>
          <span>{moment(post.date).format("LL")}</span>
          <h1>{post.title}</h1>
          <p>{post.description ? post.description : `${parsedText.slice(0, 150)}...`}</p>
        </div>
      </div>
    );
  } else return null;
};

export default FeaturedBlog;
