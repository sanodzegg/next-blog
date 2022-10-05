import classes from "./Hero.module.css";

export const Hero = () => {
  return (
    <div>
        <h1 className={classes.heroHeader}>blogsville</h1>
        <p className={classes.heroPar}>The best blog in the world. Get more out of the news.</p>
    </div>
  );
};
