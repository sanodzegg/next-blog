import classes from "./BurgerNav.module.css";
import Burger from "../../../../assets/icons/burgerlines.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

import SearchIcon from "../../../../assets/icons/search.svg";
import { useDispatch } from "react-redux";
import { searchActions } from "../../../../store/slices/search-slice";
import UserName from "../UserName";
import { useRouter } from "next/router";

import Link from "next/link";

const BurgerNav = () => {
    const [navOpen, setNavOpen] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <div className={classes.wrapper}>
            <h1 onClick={() => router.push("/")}>
                B
            </h1>
            <Image className={classes.burgerNav} src={Burger.src} width={Burger.width} height={Burger.height} alt={"open burger menu"} onClick={() => setNavOpen(!navOpen)} />
            <nav className={`${classes.nav}${navOpen ? ` ${classes.open}` : ''}`}>
                <ul>
                    <li><Link href="/">home</Link></li>
                    <li><Link href="/membership">membership</Link></li>
                    <li><Link href="/contact">contact</Link></li>
                </ul>
                <ul className={classes.row}>
                    <Image src={SearchIcon.src} width={SearchIcon.width} height={SearchIcon.height} alt="search icon" onClick={() => dispatch(searchActions.OpenSearch())} />
                    <UserName />
                </ul>
            </nav>
        </div>
    )
}

export default BurgerNav