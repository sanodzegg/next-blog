import Image from 'next/image';
import classes from "./Author.module.css";

type props = {
    picture: string,
    username: string,
    aboutMe: string
}

import DefaultAvatar from "../../assets/default.png"

const AuthorDisplay = ({ picture, username, aboutMe }:props) => {
  return (
    <div className={classes.wrapper}>
        <Image className={classes.avatar} src={picture ? picture : DefaultAvatar.src} width={80} height={80} alt="avatar" objectFit="cover" />
        <h1>{username}</h1>
        <p>{aboutMe}</p>
    </div>
  )
}

export default AuthorDisplay