import { NextPage } from "next";
import AboutHero from "../../components/about/hero/AboutHero";
import Video from "../../components/about/video/HeroVid";
import classes from "./About.module.css";

import data from "../../assets/dummy_data/about_page.json";
import SecondaryHero from "../../components/about/hero/SecondayHero";
import Sponsors from "../../components/sponsors/Sponsors";
import TeamMembers from "../../components/about/members/Team";

const About:NextPage = () => {
    return (
        <div className={classes.aboutWrapper}>
            <Video />
            <AboutHero data={data.hero.main} />
            <SecondaryHero data={data.hero.secondary} />
            <Sponsors />
            <TeamMembers />
        </div>
    );
}

export default About;