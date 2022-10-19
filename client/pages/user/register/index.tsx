import React, { useEffect, useState } from "react";
import { NextPage } from 'next';
import classes from "./Register.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const RegisterPage: NextPage = () => {
  const [showErrs, setShowErrs] = useState(false);
  const [errors, setErrors] = useState({
    username: {
      valid: false,
      message: "Please enter username."
    },
    email: {
      valid: false,
      message: "Please enter valid email address."
    },
    password: {
      valid: false,
      message: "Please enter password."
    },
    passwordrep: {
      valid: false,
      message: "Passwords don't match."
    }
  });

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    passwordrep: ""
  });

  const router = useRouter();

  const handleUNChange = (val:string) => {
    setData((prev) => ({...prev, username: val}));
    if(val.length >= 2) {
      setErrors((prev) => ({...prev, username: {
        valid: true,
        message: ""
      }}));
    } else if (val.length === 0) {
      setErrors((prev) => ({...prev, username: {
        valid: false,
        message: "Please enter username."
      }}));
    } else {
      setErrors((prev) => ({...prev, username: {
        valid: false,
        message: "Username should be longer than 2 characters."
      }}));
    }
  }

  const handleEmailChange = (val: string) => {
    setData((prev) => ({...prev, email: val}));
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(pattern.test(val)) {
      setErrors((prev) => ({...prev, email: {
        valid: true,
        message: ""
      }}));
    } else {
      setErrors((prev) => ({...prev, email: {
        valid: false,
        message: "Please enter valid email address."
      }}));
    }
  }
  
  const handlePasswordChange = (val:string) => {
    setData((prev) => ({...prev, password: val}));
    const numbers = val.match(/[0-9]/g);
    const uppercase = val.split('').filter(e => {return e === e.toUpperCase()});
    const symbols = val.match(/[!@#$%^&*()_+./,;']/g);
    
    if(numbers && numbers.length >= 1 && uppercase && uppercase.length >= 1 && symbols && symbols.length >= 1) {
      setErrors((prev) => ({...prev, password: {
        valid: true,
        message: ""
      }}));
    } else if (val.length === 0) {
      setErrors((prev) => ({...prev, password: {
        valid: false,
        message: "Please enter password."
      }}));
    } else {
      setErrors((prev) => ({...prev, password: {
        valid: false,
        message: "Password should include: 0-9, A-B, !@#$%^&*()_+'/,."
      }}));
    }
  }

  const handlePasswordRep = (val: string) => {
    setData((prev) => ({...prev, passwordrep: val}));
    if(val === data.password) {
      setErrors((prev) => ({...prev, passwordrep: {
        valid: true,
        message: ""
      }}));
    } else {
      setErrors((prev) => ({...prev, passwordrep: {
        valid: false,
        message: "Passwords don't match."
      }}));
    }
  }

  const handleRegisterClick = async () => {
    setShowErrs(true);

    const eligible = Object.values(errors).filter(e => {
      return e.valid === true;
    }).length === 4;
    
    if(eligible) {
      const req = axios.post(`${process.env.NEXT_PUBLIC_PROXY_URL}/register`, data);
      const res = await req;
      if(res.status === 200) {
        router.push("/user/login");
      }
    }
  }

  return (
    <div className={classes.wrapper}>
      <h1>sign up</h1>
      <div className={classes.form}>
        <div className={classes.inputWrapper}>
          <input type="text" placeholder="Username" onChange={(e) => handleUNChange(e.target.value)} value={data.username} />
          {showErrs && !errors.username.valid && <span>{errors.username.message}</span>}
        </div>
        <div className={classes.inputWrapper}>
          <input type="text" placeholder="E-mail" onChange={(e) => handleEmailChange(e.target.value)} value={data.email} />
          {showErrs && !errors.email.valid && <span>{errors.email.message}</span>}
        </div>
        <div className={classes.inputWrapper}>
          <input type="password" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} value={data.password} />
          {showErrs && !errors.password.valid && <span>{errors.password.message}</span>}
        </div>
        <div className={classes.inputWrapper}>
          <input type="password" placeholder="Repeat Password" onChange={(e) => handlePasswordRep(e.target.value)} value={data.passwordrep} />
          {showErrs && !errors.passwordrep.valid && <span>{errors.passwordrep.message}</span>}
        </div>
      </div>
      <div className={classes.buttons}>
        <button className={classes.login} onClick={() => router.push("/user/login")}>Login</button>
        <button onClick={handleRegisterClick}>Register</button>
      </div>
    </div>
  );
};

export default RegisterPage;