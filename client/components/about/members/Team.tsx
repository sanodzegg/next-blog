import { NextPage } from "next";
import classes from "./Team.module.css";
import data from "../../../assets/dummy_data/about_page.json";
import uniqueId from "lodash.uniqueid";
import Member from "./Member";

type mapTypes = {
    name: string,
    picture: string,
    position: string
}

const TeamMembers:NextPage = () => {

    return (
        <div className={classes.members}>
            <div className={classes.inner}>
                <h1>Team Members</h1>
                <span>Winning starts with a team</span>
                <div className={classes.flexbox}>
                    {data.teamMembers.map((e:mapTypes) => {
                        return <Member key={uniqueId()} src={e.picture} name={e.name} position={e.position} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default TeamMembers;