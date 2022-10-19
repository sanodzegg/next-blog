import Image from "next/image";
import classes from "./Navbar.module.css";

import SearchIcon from "../../../assets/icons/search.svg";
import LoginIcon from "../../../assets/icons/login.svg";

import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

type stateTypes = {
    username: string
}

export const Navbar = () => {

    const router = useRouter();

    const user = useSelector((state:RootState) => {
        return (state.user.profile as stateTypes)
    });

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarInner}>
                <h1 onClick={() => { window.scrollTo(0, 0); router.push("/") }} className={classes.logo}>
                    BLOGSVILLE
                </h1>
                <ul className={classes.list}>
                    <li><Link href="/">home</Link></li>
                    <li><a href="">categories</a></li>
                    <li><Link href="/about">about</Link></li>
                    <li><Link href="/membership">membership</Link></li>
                    <li><Link href="/contact">contact</Link></li>
                    <Image src={SearchIcon.src} width={SearchIcon.width} height={SearchIcon.height} />
                    <Image src={LoginIcon.src} width={LoginIcon.width} height={LoginIcon.height} onClick={() => router.push("/user")} />
                    {user && <span>{user.username}</span>}
                </ul>
            </div>
        </nav>
    );
};
