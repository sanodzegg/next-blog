import { NextPage } from "next";
import classes from "./Video.module.css";

const Video:NextPage = () => {
    return (
        <div className={classes.videoWrapper}>
            <video autoPlay muted loop>
                <source src="/videos/video.mp4" />
            </video>
        </div>
    );
}

export default Video;