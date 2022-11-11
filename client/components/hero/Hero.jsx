import classes from "./Hero.module.css";

export const Hero = () => {
  return (
    <div>
        <h1 className={classes.heroHeader}>blogscom</h1>
        <p className={classes.heroPar}>Create, explore and discover new blogs each day</p>
    </div>
  );
};
