import React from "react";
import { NextPage } from 'next';

import classes from "./Login.module.css";

const LoginPage: NextPage = () => {
  return (
    <div className={classes.loginWrapper}>
        <h3>login</h3>
        <div className={classes.formWrapper}>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
        </div>
    </div>
  );
};

export default LoginPage;
