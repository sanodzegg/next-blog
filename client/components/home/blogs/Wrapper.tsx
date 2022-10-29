import { useEffect, useState } from "react";
import classes from "./Wrapper.module.css";

import Pager from "./Pager";
import Blog from "./Blog";
import uniqueId from "lodash.uniqueid";

type props = {
    currentPage: number,
    emitPage: any,
    blogs: blogsTypes[],
}

type blogsTypes = {
    date: string,
    description: string,
    readTime: number,
    story: string,
    tags : string[],
    title: string
}

const Blogs = ({ currentPage, emitPage, blogs }:props) => {
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(false);

    useEffect(() => {
        if(blogs.length === 0) setLastPage(true);
    }, [blogs])
    
    return (
        <div className={classes.blogsWrapper}>
            {blogs.length > 0 && 
                <section className={classes.blogWrapperSection}>
                    {blogs.map(e => {
                        return <Blog key={uniqueId()} publishedAt={e.date} description={e.description} readTime={e.readTime} story={e.story}
                        tags={e.tags} title={e.title} />
                    })}
                </section>
            }
            <Pager current={currentPage} changePage={emitPage} lastPage={lastPage} />
        </div>
    );
}

export default Blogs;