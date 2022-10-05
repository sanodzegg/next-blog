import classes from "./index.module.css"; 
import { NextPage } from 'next';

import PlanCard from "../../components/membership/plans/Plan";
import PerkCard from '../../components/membership/perks/Perk';

import membershipData from "../../assets/dummy_data/membership.json";
import storiesData from "../../assets/dummy_data/customer_stories.json";
import { perkData } from '../../assets/dummy_data/perks';
import StoryCard from "../../components/membership/stories/Story";


const Membership: NextPage = () => {
  return (
    <div className={classes.membership}>
        <h1>Get more out of the news</h1>
        <div className={classes.cardWrapper}>
            {membershipData.map((e, i) => {
                return <PlanCard data={e} key={i} />
            })}
        </div>
        <div className={classes.perkWrapper}>
          {perkData.map((e, i) => {
            return <PerkCard key={i} icon={e.src} heading={e.heading} description={e.description} />
          })}
        </div>
        <div className={classes.storiesParent}>
          <h1>We’d love to tell you some customer stories</h1>
          <div className={classes.storiesWrapper}>
            {storiesData.map((e, i) => {
              return <StoryCard data={e} key={i} />
            })}
          </div>
        </div>
    </div>
  );
};

export default Membership;
