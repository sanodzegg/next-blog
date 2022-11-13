import { useEffect, useState } from 'react'
import BurgerNav from './mobnav/BurgerNav';
import classes from "./Navbar.module.css";
import { PCNav } from './pcnav/PCNav';

const Navbar = () => {

    const [isMobile, setIsMobile] = useState<boolean>();

    const handleVW = () => {
        const vw = window.innerWidth;

        if(vw < 600) setIsMobile(true);
        else setIsMobile(false);
    }

    useEffect(() => {
        handleVW();
        window.addEventListener("resize", handleVW);

        return () => window.removeEventListener("resize", handleVW);
    }, []);

    return (
        <nav className={classes.navbar}>
            {!isMobile ? <PCNav /> : <BurgerNav />}
        </nav>
    )
}

export default Navbar