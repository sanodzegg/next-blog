import Image from 'next/image';
import React from 'react'
import classes from "../DetailedWrapper/BlogWrapper.module.css";

import defaultImg from "../../../assets/default.png";

const Author = ({ username, picture }:{ username: string, picture: string }) => {
  return (
    <div className={classes.author}>
        <Image className={classes.avatar} src={picture ? picture : defaultImg.src} alt="avatar" width={40} height={40} objectFit="cover" />
        <span>{username}</span>
    </div>
  )
}

export default Author