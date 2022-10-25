import { useEffect, useState } from "react";
import classes from "./Wrapper.module.css";

import Pager from "./Pager";
import Blog from "./Blog";
import uniqueId from "lodash.uniqueid";

type props = {
    blogs: blogsTypes[]
}

type blogsTypes = {
    url: string,
    urlToImage: string,
    publishedAt: string,
    title: string,
    description : string
}

const Blogs = ({ blogs }:props) => {
    const [page, setPage] = useState(1);
    const [slicedBlogs, setSlicedBlogs] = useState<blogsTypes[]>([]);

    useEffect(() => {
        const startingIndex = page * 6;
        const sliced = blogs.slice(startingIndex, startingIndex + 6);
        setSlicedBlogs(sliced);
    }, [page, blogs]);
    
    
    return (
        <div className={classes.blogsWrapper}>
            {Object.values(slicedBlogs).length > 0 && 
                <section className={classes.blogWrapperSection}>
                    {slicedBlogs.map(e => {
                        return <Blog key={uniqueId()} url={e.url} urlToImage={e.urlToImage} publishedAt={e.publishedAt} title={e.title} description={e.description} />
                    })}
                </section>
            }
            {Object.values(blogs).length > 0 && <Pager current={page} changePage={setPage} />}
        </div>
    );
}

export default Blogs;