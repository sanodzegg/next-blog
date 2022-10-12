import { NextPage } from "next";
import classes from "./Sponsors.module.css";
import { sponsorLogos } from "../../assets/dummy_data/sponsors";
import uniqueId from "lodash.uniqueid";
import Image from "next/image";

const Sponsors:NextPage = () => {
    return (
        <div className={classes.sponsors}>
            {sponsorLogos.map(e => {
                return <Image key={uniqueId()} src={e.src} width={e.width} height={e.height} alt="company" />
            })}
        </div>
    );
}

export default Sponsors;