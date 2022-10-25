import classes from "./Video.module.css";

const Video = () => {
    return (
        <div className={classes.videoWrapper}>
            <video autoPlay muted loop>
                <source src="/videos/video.mp4" />
            </video>
        </div>
    );
}

export default Video;