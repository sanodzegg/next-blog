import uniqueId from 'lodash.uniqueid';
import React from 'react'
import Blog from '../home/blogs/Blog';
import classes from "./BBT.module.css";

type props = {
    blogs: blogTypes[]
}

type blogTypes = {
    title: string,
    date: string,
    readTime: number,
    description: string
    story: string,
    _id: string
}

const BBTWrapper = ({ blogs }:props) => {
  return (
    <div className={classes.wrapper}>
        {blogs.map(e => {
            return <Blog key={uniqueId()} publishedAt={e.date} description={e.description} readTime={e.readTime} story={e.story} title={e.title} blogID={e._id} />
        })}
    </div>
  )
}

export default BBTWrapper