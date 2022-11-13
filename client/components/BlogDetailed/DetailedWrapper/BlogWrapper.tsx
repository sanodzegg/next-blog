import axios from 'axios'
import uniqueId from 'lodash.uniqueid'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { parseForHTML } from '../../../utils/HTMLParser'
import Author from '../Author/Author'
import Tag from '../Tags/Tag'
import classes from "./BlogWrapper.module.css"

type props = {
  author: string,
  title: string,
  description: string,
  date: string,
  readTime: number,
  story: string,
  tags: string[]
}

type authorTypes = {
  username: string,
  picture: string
}

const BlogWrapper = ({ author, title, description, date, readTime, story, tags }:props ) => {
  const [authorData, setAuthorData] = useState<Partial<authorTypes>>({});
  const [generatedHTML, setGeneratedHTML] = useState("");

  const getAuthor = async () => {
    const req = await axios.get(`${process.env.NEXT_PUBLIC_PROXY_URL}/user/${author}`);
    const res = await req.data;
    setAuthorData(res);
  }

  useEffect(() => {
    getAuthor();
  }, [author]);

  useEffect(() => {
    setGeneratedHTML(parseForHTML(story));
  }, [story]);

  if(Object.values(authorData).length > 0 && generatedHTML) {
    return (
      <div className={classes.wrapper}>
        {authorData.picture && authorData.username && <Author username={authorData.username} picture={authorData.picture} />}
        <h1>{title}</h1>
        {description && <h3>{description}</h3>}
        <div className={classes.timeStamps}>
          <span>{moment(date).format("MMM D")}</span>
          <span>{`${readTime} min read`}</span>
        </div>
        <section className={classes.storySection} dangerouslySetInnerHTML={{__html: generatedHTML}}></section>
        {tags.length > 0 && 
          <div className={classes.tags}>
            {tags.map(e => <Tag key={uniqueId()} text={e} />)}
          </div>
        }
      </div>
    )
  } else return <ColorRing visible={true} height="80" width="80" wrapperClass={classes.loader} 
  colors={['#a166ff', '#a166ff', '#a166ff', '#a166ff', '#a166ff']} />
}

export default BlogWrapper