import Image from "next/image";
import classes from "../Navbar.module.css";

import SearchIcon from "../../../../assets/icons/search.svg";

import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { searchActions } from "../../../../store/slices/search-slice";
import UserName from "../UserName";

export const PCNav = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    
    return (
        <div className={classes.navbarInner}>
            <h1 onClick={() => { window.scrollTo(0, 0); router.push("/") }} className={classes.logo}>
                BLOGSCOM
            </h1>
            <ul className={classes.list}>
                <li><Link href="/">home</Link></li>
                <li><Link href="/membership">membership</Link></li>
                <li><Link href="/contact">contact</Link></li>
                <Image src={SearchIcon.src} width={SearchIcon.width} height={SearchIcon.height} alt="search icon" onClick={() => dispatch(searchActions.OpenSearch())} />
                <UserName />
            </ul>
        </div>
    );
};
