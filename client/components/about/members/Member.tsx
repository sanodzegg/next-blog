import Image from "next/image";
import classes from "./Team.module.css";

type props = {
    src: string,
    name: string,
    position: string
}

const Member = ({ src, name, position }:props) => {
    
    return (
        <div className={classes.wrapper}>
            <Image className={classes.memberImg} src={src} width={80} height={80} alt={"member"} />
            <p>{name}</p>
            <span>{position}</span>
        </div>
    );
}

export default Member;