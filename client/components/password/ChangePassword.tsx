import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useRef, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOutsideClick';
import classes from "./ChangePassword.module.css";

const ChangePassword = ({ emitPopup }:{ emitPopup: (current: boolean) => void }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useOnOutsideClick(wrapperRef, () => emitPopup(false));

    const [showErrs, setShowErrs] = useState(false);
    const isAuth = Cookies.get("user");
    const user = isAuth && JSON.parse(isAuth);
    
    
    const [data, setData] = useState({
        oldPass: "",
        newPass: ""
    });

    const [errors, setErrors] = useState({
        oldPass: {
            valid: false,
            message: ""
        },
        newPass: {
            valid: false,
            message: "Password should include: 0-9, A-B, !@#$%^&*()_+'/,."
        },
        repPass: {
            valid: false,
            message: "Passwords don't match."
        }
    });

    const handleOldPassword = (val:string) => {
        setData((prev) => ({...prev, oldPass: val}));
        if(val.length > 0) {
            setErrors((prev) => ({...prev, oldPass: {
                valid: true,
                message: ""
            }}));
        } else {
            setErrors((prev) => ({...prev, oldPass: {
                valid: false,
                message: "Please enter password."
            }}));
        }
    }

    const handleNewPassword = (val:string) => {
        setData((prev) => ({...prev, newPass: val}));
        const numbers = val.match(/[0-9]/g);
        const uppercase = val.split('').filter(e => {return e === e.toUpperCase()});
        const symbols = val.match(/[!@#$%^&*()_+./,;']/g);
        
        if(numbers && numbers.length >= 1 && uppercase && uppercase.length >= 1 && symbols && symbols.length >= 1) {
            setErrors((prev) => ({...prev, newPass: {
                valid: true,
                message: ""
            }}));
        } else if (val.length === 0) {
            setErrors((prev) => ({...prev, newPass: {
              valid: false,
              message: "Please enter password."
            }}));
        } else {
            setErrors((prev) => ({...prev, newPass: {
              valid: false,
              message: "Password should include: 0-9, A-B, !@#$%^&*()_+'/,."
            }}));
        }
    }

    const handleRepPassword = (val:string) => {
        if(val === data.newPass) {
          setErrors((prev) => ({...prev, repPass: {
            valid: true,
            message: ""
          }}));
        } else {
          setErrors((prev) => ({...prev, repPass: {
            valid: false,
            message: "Passwords don't match."
          }}));
        }
    }

    const handleCPClick = async () => {
        setShowErrs(true);

        const eligible = Object.values(errors).filter(e => e.valid).length === 3 ? true : false;
        if(eligible && user.token) {
            const req = await axios.post(`${process.env.NEXT_PUBLIC_PROXY_URL}/user/password`, {...data, userid: user.id}, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            if(req.status === 200) {
                emitPopup(false);
            }
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.inner} ref={wrapperRef}>
                <input type="password" placeholder="Old password" onChange={(e) => handleOldPassword(e.target.value)} />
                {showErrs && !errors.oldPass.valid && <span>{errors.oldPass.message}</span>}
                <input type="password" placeholder="New password" onChange={(e) => handleNewPassword(e.target.value)} />
                {showErrs && !errors.newPass.valid && <span>{errors.newPass.message}</span>}
                <input type="password" placeholder="Repeat password" onChange={(e) => handleRepPassword(e.target.value)} />
                {showErrs && !errors.repPass.valid && <span>{errors.repPass.message}</span>}
                <button onClick={handleCPClick}>Change Password</button>
            </div>
        </div>
    )
}

export default ChangePassword