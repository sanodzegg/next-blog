import uniqueId from 'lodash.uniqueid';
import React from 'react'
import Blog from '../../home/blogs/Blog';
import classes from "./BlogResults.module.css";

type tMap = {
  date: string,
  description: string,
  readTime: number,
  story: string,
  title: string,
  _id: string
}

const BlogResults = ({ data }:{ data: tMap[] }) => {
  return (
    <div className={classes.blogResultsWrapper}>
      {data.map((e:tMap) => {
        return <Blog key={uniqueId()} publishedAt={e.date} description={e.description} readTime={e.readTime} 
                    story={e.story} title={e.title} blogID={e._id} />
      })}
    </div>
  )
}

export default BlogResults