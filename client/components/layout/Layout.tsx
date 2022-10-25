import axios from "axios";
import Cookies from "js-cookie";
import { Flow } from "../flow/Flow";
import Footer from "./footer/Footer";
import { Navbar } from "./navbar/Navbar"

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { userActions } from "../../store/slices/user-slice";

export const Layout = (props:any) => {

  const isAuth = Cookies.get("user");
  const dispatch = useDispatch();

  const getUser = async () => {
    if(isAuth && window.location.pathname !== "/user") {
      const user = JSON.parse(isAuth);
      
      const req = await axios.get(`${process.env.NEXT_PUBLIC_PROXY_URL}/user/${user.id}`, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });
      const res = await req.data;
      
      if(req.status === 200) {
        const { username, email, picture, aboutMe } = res;
        dispatch(userActions.LogIn({ username, email, picture, aboutMe }))
      }
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
        <Flow />
        <Navbar />
        <main>{props.children}</main>
        <Footer />
    </div>
  );
};
