import { NextPage } from 'next';
import classes from "./Story.module.css";
import Image from 'next/image';

type dataTypes = {
    name: string,
    position: string,
    review: string,
    image: string
}

type props = {
    data: dataTypes,
}

const StoryCard: NextPage<props> = ({ data }) => {
    return (
        <div className={classes.storyCardWrapper}>
            <p>{data.review}</p>
            <div className={classes.userWrapper}>
                <div className={classes.userIMG}>
                    <Image src={data.image} width="100%" height="100%" />
                </div>
                <div className={classes.user}>
                    <p>{data.name}</p>
                    <span>{data.position}</span>
                </div>
            </div>
        </div>
    )
}

export default StoryCard;