import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import UserLoader from './Loader/UserLoader';
import LoginIcon from "../../../assets/icons/login.svg";

import classes from "../navbar/mobnav/BurgerNav.module.css";

const UserName = () => {
    const router = useRouter();
    const user = useSelector((state:RootState) => {
        return (state.user.profile as {username: string})
    });

    const isUserAuth = Object.values(user).length > 0;

    return (
        <div className={classes.user} onClick={() => isUserAuth ? router.push(`/${user.username}`) : router.push(`/user`) }>
            <Image src={LoginIcon.src} width={LoginIcon.width} height={LoginIcon.height} alt="login icon" />
            {Object.values(user).length > 0 ? <span>{user.username}</span> : <UserLoader />}
        </div>
    )
}

export default UserName