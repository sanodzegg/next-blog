import Image from "next/image";
import classes from "./Navbar.module.css";

import SearchIcon from "../../../assets/logos/search.svg";
import LoginIcon from "../../../assets/logos/login.svg";

import { useRouter } from "next/router";
import Link from "next/link";

export const Navbar = () => {

    const router = useRouter();
    
    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarInner}>
                <h1 onClick={() => { window.scrollTo(0, 0); router.push("/") }} className={classes.logo}>
                    BLOGSVILLE
                </h1>
                <ul className={classes.list}>
                    <li><Link href="/">home</Link></li>
                    <li><a href="">categories</a></li>
                    <li><a href="">about</a></li>
                    <li><Link href="/membership">membership</Link></li>
                    <li><a href="/contact">contact</a></li>
                    <Image src={SearchIcon.src} width={SearchIcon.width} height={SearchIcon.height} />
                    <Image src={LoginIcon.src} width={LoginIcon.width} height={LoginIcon.height} onClick={() => router.push("/user")} />
                </ul>
            </div>
        </nav>
    );
};
