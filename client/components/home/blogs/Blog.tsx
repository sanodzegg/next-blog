import Image from "next/image";
import classes from "./Wrapper.module.css";
import moment from "moment";

type props = {
    url: string,
    urlToImage: string,
    publishedAt: string,
    title: string,
    description: string
}

const Blog = ({ url, urlToImage, publishedAt, title, description }:props) => {
    return (
        <div className={classes.blog} onClick={() => url && window.open(url, "_blank")}>
            {urlToImage && <Image src={urlToImage} width={395} height={230} alt={"blog visual"} />}
            <span>{moment(publishedAt).format("LL")}</span>
            <h2>{title.length > 45 ? `${title.slice(0, 45)}...` : title}</h2>
            <p>{description.length > 100 ? `${description.slice(0, 100)}...` : description}</p>
        </div>
    );
}

export default Blog;