import uniqueId from 'lodash.uniqueid';
import { useRouter } from 'next/router';
import React from 'react'

import classes from "./BBT.module.css";

const tags = ["Books", "Clothes", "Coaching", "Ecommerce", "Exercise", "Health", "Holiday", "Marketing", "Tech", "Travel", "University"];

const BBTHeader = ({ tag }:{ tag: string | string[] }) => {
    const router = useRouter();

    return (
        <div className={classes.header}>
            <h1>{tag}</h1>
            <div className={classes.tags}>
                {tags.map(e => {
                        return <div onClick={() => router.push(`/blogs/${e}`)} key={uniqueId()} className={`${classes.tag}${tag === e ? ` ${classes.current}` : ''}`}>{e}</div>
                })}
            </div>
        </div>
    )
}

export default BBTHeader