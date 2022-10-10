import { NextPage } from "next";
import classes from "./CardWrapper.module.css";
import Image from 'next/image';

type props = {
    name: string,
    position: string,
    review: string,
    image: string
}

const CardWrapper: NextPage<props> = ({ name, position, review, image }) => {
    return (
        <div className={classes.storyCardWrapper}>
            <p>{review}</p>
            <div className={classes.userWrapper}>
                <div className={classes.userIMG}>
                    <Image src={image} width="100%" height="100%" />
                </div>
                <div className={classes.user}>
                    <p>{name}</p>
                    <span>{position}</span>
                </div>
            </div>
        </div>
    )
}

export default CardWrapper;