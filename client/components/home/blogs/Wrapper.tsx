import { useEffect, useState } from "react";
import classes from "./Wrapper.module.css";

import Pager from "./Pager";
import Blog from "./Blog";
import uniqueId from "lodash.uniqueid";
import { ColorRing } from "react-loader-spinner";

type props = {
    currentPage: number,
    emitPage: (current: number) => void,
    blogs: blogsTypes[],
}

type blogsTypes = {
    _id: string,
    date: string,
    description: string,
    readTime: number,
    story: string,
    tags : string[],
    title: string
}

const Blogs = ({ currentPage, emitPage, blogs }:props) => {
    const [lastPage, setLastPage] = useState(false);

    useEffect(() => {
        if(blogs.length === 0 || typeof blogs === "string") setLastPage(true);
        else setLastPage(false);
    }, [blogs])

    const blogsExist = typeof blogs !== "string" && blogs.length > 0;

    return (
        <div className={classes.blogsWrapper}>
            {blogsExist ? 
                <section className={classes.blogWrapperSection}>
                    {blogs.map(e => {
                        return <Blog key={uniqueId()} publishedAt={e.date} description={e.description} readTime={e.readTime} story={e.story}
                        title={e.title} blogID={e._id} />
                    })}
                </section>
            : typeof blogs === "string" ? <p className={classes.nbErr}>No blogs found :&#40;</p>
            : <ColorRing visible={true} height="80" width="80" wrapperClass={classes.loader} 
                    colors={['#b2ff66', '#b2ff66', '#b2ff66', '#b2ff66', '#b2ff66']} />
            }
            {blogsExist && <Pager current={currentPage} changePage={emitPage} lastPage={lastPage} />}
        </div>
    );
}

export default Blogs;