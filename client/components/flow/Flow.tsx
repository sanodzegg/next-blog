import { Fragment } from "react";
import classes from "./Flow.module.css";

export const Flow = () => {
  return (
    <div className={classes.flow}>
      <div className={classes.textWrapper}>
          {new Array(10).fill(10).map((_, i:number) => {
            return (
              <Fragment key={i}>
                <div><p>business news</p><span>&#42;</span></div>
                <div><p>design trends</p><span>&#42;</span></div>
                <div><p>health tips</p><span>&#42;</span></div>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
};
