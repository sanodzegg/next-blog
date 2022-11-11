import uniqueId from 'lodash.uniqueid';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'

import classes from "../Side.module.css";

const FeaturedAuthor = ({ picture, username }: { picture: string, username?: string }) => {
    const router = useRouter();

    return (
        <div onClick={() => router.push(`/author/${username}`)} className={classes.featuredWrapper}>
            <Image className={classes.img} src={picture} width={40} height={40} objectFit="cover" alt="author avatar" />
            <p>{username}</p>
        </div>
    )
}

export default FeaturedAuthor