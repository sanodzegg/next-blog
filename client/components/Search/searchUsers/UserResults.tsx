import uniqueId from 'lodash.uniqueid';
import React from 'react'
import FeaturedAuthor from '../../home/side/FeaturedAuthor/FeaturedAuthor';
import classes from "./UserResults.module.css";

type tMap = {
    picture: string,
    username: string
}


const UserResults = ({ data }:{ data: tMap[]}) => {
    return (
        <div className={classes.userResultsWrapper}>
            {data.map((e:tMap) => {
                return <FeaturedAuthor key={uniqueId()} picture={e?.picture} username={e?.username} />
            })}
        </div>
    )
}

export default UserResults