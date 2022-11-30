import classes from "./Author.module.css";

import Blog from '../home/blogs/Blog'
import uniqueId from "lodash.uniqueid";

type props = {
    blogs: mapProps[]
}

type mapProps = {
    date: string,
    description: string,
    readTime: number,
    story: string,
    title: string,
    _id: string
}

const AuthorBlogsDisplay = ({ blogs }:props) => {
    return (
        <div className={classes.blogsWrapper}>
            {blogs.map((e) => {
                return <Blog key={uniqueId()} publishedAt={e.date} description={e.description} readTime={e.readTime} story={e.story} title={e.title} blogID={e._id} />
            })}
        </div>
    )
}

export default AuthorBlogsDisplay