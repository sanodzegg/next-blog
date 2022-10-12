import { NextPage } from 'next';
import Image from 'next/image';
import classes from "./FeaturedBlog.module.css";
import moment from "moment"

type props = {
  post: Partial<postTypes>
}

type postTypes = {
  url: string,
  urlToImage: string,
  publishedAt: string,
  title: string,
  description: string
}

const FeaturedBlog:NextPage<props> = ({ post }) => {
  if(Object.values(post).length > 0) {
    return (
      <div className={classes.featuredWrapper} onClick={() => post.url && window.open(post.url, "_blank")}>
        {post.urlToImage && <Image className={classes.image} src={post.urlToImage} width={825} height={490} alt={"article poster"} />}
        <div className={classes.featuredText}>
          <span>{moment(post.publishedAt).format("LL")}</span>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
        </div>
      </div>
    );
  } else return null;
};

export default FeaturedBlog;
