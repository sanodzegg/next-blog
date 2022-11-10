import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useOnOutsideClick } from "../../hooks/useOutsideClick";
import classes from "./ForgotPassword.module.css";

const ForgotPassword = ({ emitForgot }:any) => {

    const innerRef = useRef(null);

    const [userName, setUserName] = useState("");
    const [active, setActive] = useState(false);
    const [userMail, setUserMail] = useState("");

    useEffect(() => {
        if(userName) setActive(true);
        else setActive(false);
    }, [userName]);

    const handleOKClick = async () => {
        if(userName) {
            const req = await axios.get(`${process.env.NEXT_PUBLIC_PROXY_URL}/forgot/${userName}`, {
                withCredentials: true,
            });
            const res = await req.data;
            setUserMail(res.email);
        }
    }

    useOnOutsideClick(innerRef, () => emitForgot(false));

    return (
        <div className={classes.wrapper}>
            <div ref={innerRef} className={classes.inner}>
                <input className={userMail ? classes.disabled : ''} disabled={userMail ? true : false} type="text" placeholder="Enter your username..." onChange={(e) => setUserName((e.target as HTMLInputElement).value)} value={userName} />
                {!userMail && <button onClick={handleOKClick} className={active ? classes.active : ''}>OK</button>}
                {userMail && <p>We will send a link to change your password on this email address: <i>{userMail}</i></p>}
            </div>
        </div>
    )
}

export default ForgotPassword