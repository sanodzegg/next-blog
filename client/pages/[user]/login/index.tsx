import React, { useState } from "react";
import { NextPage } from 'next';

import classes from "./Login.module.css";
import axios from "axios";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { userActions } from "../../../store/slices/user-slice";

const LoginPage: NextPage = () => {
  const [showErrs, setShowErrs] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    username: {
      valid: false,
      message: "Please enter username."
    },
    password: {
      valid: false,
      message: "Please enter password."
    }
  })
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLoginUN = (val:string) => {
    setData((prev) => ({...prev, username: val}));
    if(val.length > 0) {
      setErrors((prev) => ({...prev, username: { valid: true, message: "" }}));
    } else setErrors((prev) => ({...prev, username: { valid: false, message: "Please enter username." }}));
  }
  
  const handleLoginPass = (val:string) => {
    setData((prev) => ({...prev, password: val}));
    if(val.length > 0) {
      setErrors((prev) => ({...prev, password: { valid: true, message: "" }}));
    } else setErrors((prev) => ({...prev, password: { valid: false, message: "Please enter password." }}));
  }
  
  const handleLoginClick = async () => {
    setShowErrs(true);

    const eligible = Object.values(errors).filter(e => {
      return e.valid === true;
    }).length === 2;

    if(eligible) {
      const req = await axios.post(`${process.env.NEXT_PUBLIC_PROXY_URL}/login`, data);
      const res = await req.data;
      
      if(req.status === 200) {
        dispatch(userActions.LogIn(res.user));
        router.push("/");
      }
    }
  }

  return (
    <div className={classes.wrapper}>
        <h1>login</h1>
        <div className={classes.form}>
            <div className={classes.inputWrapper}>
              <input type="text" placeholder="Username" onChange={(e) => handleLoginUN(e.target.value)} value={data.username} />
              {showErrs && !errors.username.valid && <span>{errors.username.message}</span>}
            </div>
            <div className={classes.inputWrapper}>
              <input type="password" placeholder="Password" onChange={(e) => handleLoginPass(e.target.value)} value={data.password} />
              {showErrs && !errors.password.valid && <span>{errors.password.message}</span>}
            </div>
          <div className={classes.buttons}>
            <button onClick={handleLoginClick}>login</button>
            <button className={classes.register} onClick={() => router.push("/user/register")}>register</button>
          </div>
        </div>
    </div>
  );
};

export default LoginPage;
