import classes from "./Perk.module.css";
import { NextPage } from 'next';
import Image from 'next/image';

type props = {
    icon: icon,
    heading: string,
    description: string
}

type icon = {
    src: string,
    width: number,
    height: number
}

const PerkCard: NextPage<props> = ({ icon, heading, description }) => {
    return (
        <div className={classes.perkWrapper}>
            <Image src={icon.src} width={icon.width} height={icon.height} />
            <h6>{heading}</h6>
            <p>{description}</p>
        </div>
    );
}

export default PerkCard;