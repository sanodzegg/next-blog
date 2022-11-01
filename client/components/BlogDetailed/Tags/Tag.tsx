import { useRouter } from 'next/router'
import React from 'react'
import classes from "../DetailedWrapper/BlogWrapper.module.css"

const Tag = ({ text }:{ text:string }) => {
  const router = useRouter();

  return (
    <span onClick={() => router.push(`/blogs/${text}`)} className={classes.tag}>{text}</span>
  )
}

export default Tag