import { useState } from "react";
import classes from "./Wrapper.module.css";

import Pager from "./Pager";
import Blog from "./Blog";
import uniqueId from "lodash.uniqueid";

type props = {
    blogs: blogsTypes[]
}

type blogsTypes = {
    date: string,
    description: string,
    readTime: number,
    story: string,
    tags : string[],
    title: string
}

const Blogs = ({ blogs }:props) => {
    const [page, setPage] = useState(1);
    
    console.log(blogs);
    

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
            {Object.values(blogs).length > 0 && <Pager current={page} changePage={setPage} />}
        </div>
    );
}

export default Blogs;