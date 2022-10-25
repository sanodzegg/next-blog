import Image from "next/image";
import classes from "./AboutHero.module.css";

type props = {
    data: dataTypes
}

type dataTypes = {
    header: string,
    author: authorTypes,
    story: string
}

type authorTypes = {
    name: string,
    picture: string
}

const AboutHero = ({ data }:props) => {
    return (
        <div className={classes.mainHeroWrapper}>
            <h3>{data.header}</h3>
            <div className={classes.mainContainer}>
                <div className={classes.user}>
                    <Image className={classes.userPicture} src={data.author.picture} width={40} height={40} alt={"user visual"} />
                    <h5>{data.author.name}</h5>
                </div>
                <p>{data.story}</p>
            </div>
        </div>
    );
}

export default AboutHero;