import { NextPage } from "next";
import classes from "./UserPage.module.css";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';

import { useSelector } from "react-redux";

import avatar from "../../assets/icons/user-pic.svg";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";
import { RootState } from "../../store";

const UserPage: NextPage = () => {
    const [profileEdited, setProfileEdited] = useState(false);
    const [imgChanged, setImgChanged] = useState(false);
    const [img, setImg] = useState<any>("");
    const [username, setUsername] = useState<string>("");
    const fileUpload = useRef<HTMLInputElement>(null);

    const user = useSelector((state:any) => {
        return state.user
    });

    const isAuth = Cookies.get("user");
    
    const router = useRouter();
    
    useEffect(() => {
        if((user.auth !== null && user.auth === false) || !isAuth) {
            router.push("/user/login");
        }
        setImg(user.profile.picture);
    }, [user.auth]);

    const handleUsernameChange = (val:string) => {
        if(val !== user.profile.username) {
            setUsername(val);
            setProfileEdited(true);
        } else if (val === user.profile.username && imgChanged) {
            setUsername("");
            setProfileEdited(true);
        } else {
            setUsername("");
            setProfileEdited(false);
        };
    }

    const handleAvatarClick = () => {
        if(fileUpload.current) {
            fileUpload.current.click();
        }
    }

    const handleImgUpload = async (node:HTMLInputElement) => {
        if(node.files && node.files[0]) {
            const code = await toBase64(node.files[0]);
            setProfileEdited(true);
            setImgChanged(true);
            setImg(code);
        }
    }

    const toBase64 = (file:any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (err) => {
                reject(err);
            };
        });
    }

    const saveChanges = async () => {
        const data = { img, username, originalUser: user.profile.username };
        
        const token = isAuth && JSON.parse(isAuth);
        const req = await axios.post(`${process.env.NEXT_PUBLIC_PROXY_URL}/user/update`, data, {
            headers: {
                "Authorization": token.token
            }
        });
        const status = req.status;
        if(status === 200) {
            window.location.reload();
        }
    }
    
    if(user.auth) {
        return (
            <div className={classes.wrapper}>
                <div className={classes.inner}>
                    <div className={`${classes.avatar} ${img && classes.filled}`} onClick={handleAvatarClick}>
                        <input type="file" ref={fileUpload} accept="image/png, image/jpeg" onChange={(e) => handleImgUpload(e.target)} />
                        <Image src={img ? img : avatar.src} width={avatar.width} height={avatar.height} objectFit="cover" />
                    </div>
                    <div className={classes.user}>
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="Username" name="username" defaultValue={user.profile.username} onChange={(e) => handleUsernameChange(e.target.value)} />
                        <input type="text" placeholder="Email address" defaultValue={user.profile.email} disabled />
                    </div>
                </div>
                <div className={classes.buttons}>
                    <button className={classes.cpBtn}>Change password</button>
                    <button className={`${classes.saveBtn} ${!profileEdited && classes.disabled}`} onClick={saveChanges}>Save changes</button>
                </div>
            </div>
        )
    } else return null;
}
  
export default UserPage