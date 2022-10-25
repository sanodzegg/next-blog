import classes from "./Footer.module.css";
import Image from "next/image";

import twitter from "../../../assets/icons/twitter_icon.svg";
import instagram from "../../../assets/icons/instagram_icon.svg";
import linkedin from "../../../assets/icons/linkedin_icon.svg";
import uniqueId from "lodash.uniqueid";

const icons = [twitter, instagram, linkedin];

const Footer = () => {
    return (
        <section className={classes.footerWrapper}>
            <div className={classes.footerHead}>
                <h4>upgrade to a reader membership for $4/month</h4>
                <h1>Get more out of the news</h1>
                <button>get unlimited access</button>
            </div>
            <footer>
                <div className={classes.footerCol}>
                    <h4>newsletter</h4>
                    <h3>Subscribe to the weekly newsletter to get the best tips and trends.</h3>
                    <div className={classes.colInput}>
                        <input type="text" placeholder="Enter your email" />
                        <button>subscribe</button>
                    </div>
                    <div className={classes.socials}>
                        {icons.map(e => {
                            return <Image key={uniqueId()} src={e.src} width={e.width} height={e.height} />
                        })}
                    </div>
                </div>
                <div className={classes.footerCol}>
                    <ul>
                        <li className={classes.mainList}>
                            categories
                        </li>
                        <li>Travel</li>
                        <li>Business</li>
                        <li>Education</li>
                        <li>Health</li>
                        <li>Design</li>
                        <li>Shopping</li>
                    </ul>
                </div>
                <div className={classes.footerCol}>
                    <ul>
                        <li className={classes.mainList}>
                            categories
                        </li>
                        <li>Style Guide</li>
                        <li>Get Started</li>
                        <li>Licenses</li>
                        <li>Changelog</li>
                        <li>Support</li>
                    </ul>
                </div>
            </footer>
        </section>
    )
}

export default Footer;