import { NextPage } from "next";
import classes from "./UserPage.module.css";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from "react-redux";

import avatar from "../../assets/icons/user-pic.svg";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";
import ChangePassword from "../../components/password/ChangePassword";
import { ColorRing } from "react-loader-spinner";
import { userActions } from "../../store/slices/user-slice";
import UserBlogs from "../../components/user/blogs/UserBlogs";
import { getUserSession } from "../../utils/GetUserSession";

type selector = {
    user: userTypes
}

type userTypes = {
    auth: boolean,
    profile: profileTypes
}

type profileTypes = {
    aboutMe: string,
    email: string,
    picture: string,
    username: string
}

const UserPage:NextPage = () => {
    const user = useSelector((state:selector) => {
        return state.user
    });

    const [profileEdited, setProfileEdited] = useState(false);
    const [imgChanged, setImgChanged] = useState(false);
    const [img, setImg] = useState<any>("");
    const [originalImage, setOriginalImage] = useState("");
    const [username, setUsername] = useState<string>("");
    const [aboutMe, setAboutMe] = useState<string>("");
    const fileUpload = useRef<HTMLInputElement>(null);
    
    const [CPPopup, setCPPopup] = useState(false);

    const dispatch = useDispatch();

    const isAuth = Cookies.get("user");
    const router = useRouter();
    
    const getUser = async () => {
        if(isAuth) {
            const authParsed = JSON.parse(isAuth);
            
            const req = await axios.get(`${process.env.NEXT_PUBLIC_PROXY_URL}/user/relog/${authParsed.id}`, {
              headers: {
                "Authorization": `Bearer ${authParsed.token}`
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
        if(user.profile.picture) {
            setOriginalImage(user.profile.picture);
        }
    }, [user]);

    useEffect(() => {
        const userGetter = async () => {
            await getUser();
        }
        userGetter();
    }, []);
    
    useEffect(() => {
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

    const handleAboutMe = (val:string) => {
        if(val !== user.profile.aboutMe) {
            setAboutMe(val);
            setProfileEdited(true);
        } else if (val === user.profile.aboutMe && imgChanged) {
            setAboutMe("");
            setProfileEdited(true);
        } else {
            setAboutMe("");
            setProfileEdited(false);
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
        const data = { img, originalImage, username, originalUser: user.profile.username, aboutMe };
        
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

    const dataReady = Object.values(user.profile).filter(e => e || e === null).length === 4 ? true : false;
    
    if(user.auth && dataReady) {
        return (
            <div className={classes.wrapper}>
                <div className={classes.inner}>
                    <div className={`${classes.avatar} ${(img || user.profile.picture) && classes.filled}`} onClick={handleAvatarClick}>
                        <input type="file" ref={fileUpload} accept="image/png, image/jpeg" onChange={(e) => handleImgUpload(e.target)} />
                        <Image className={classes.avatarimg} alt="user avatar" src={img ? img : user.profile.picture ? user.profile.picture : avatar.src} width={avatar.width} height={avatar.height} objectFit="cover" />
                    </div>
                    <div className={classes.user}>
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="Username" name="username" defaultValue={user.profile.username} onChange={(e) => handleUsernameChange(e.target.value)} />
                        <input type="text" placeholder="Email address" defaultValue={user.profile.email} disabled />
                        <label htmlFor="aboutme">About me</label>
                        <textarea onChange={(e) => handleAboutMe(e.target.value)} defaultValue={user.profile.aboutMe} name="aboutme" placeholder="Write about yourself"></textarea>
                    </div>
                </div>
                <div className={classes.buttons}>
                    <button className={classes.cpBtn} onClick={() => {router.push("/"); dispatch(userActions.LogOut());}}>Log out</button>
                    <button className={classes.cpBtn} onClick={() => setCPPopup(true)}>Change password</button>
                    <button className={`${classes.saveBtn} ${!profileEdited && classes.disabled}`} onClick={saveChanges}>Save changes</button>
                </div>
                {CPPopup && <ChangePassword emitPopup={setCPPopup} />}
                <UserBlogs />
            </div>
        )
    } else return <ColorRing visible={true} height="80" width="80" wrapperClass={classes.loader} 
    colors={['#b2ff66', '#b2ff66', '#b2ff66', '#b2ff66', '#b2ff66']} />;
}

export const getServerSideProps = async ({ req }:{req: { cookies: { user: string } }}) => {
    const session = getUserSession(req);
    if (!session) {
      return { redirect: {
        permanent: false,
        destination: "/login"
      }, props: {} };
    }
    
    return {
      props: {},
    };
}

export default UserPage;