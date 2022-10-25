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

const SecondaryHero = ({ data }:props) => {
    return (
        <div className={classes.secondaryHeroWrapper}>
            <div className={classes.inner}>
                <Image src={data.author.picture} width={620} height={620} alt={"author"} />
                <div className={classes.story}>
                    <h3>{data.header}</h3>
                    <p>{data.story}</p>
                </div>
            </div>
        </div>
    );
}

export default SecondaryHero;