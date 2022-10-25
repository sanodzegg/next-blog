import classes from "./UserLoader.module.css";

const UserLoader = () => {
  return (
    <div className={classes.loader}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default UserLoader