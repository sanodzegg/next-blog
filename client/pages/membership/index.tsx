import classes from "./index.module.css"; 
import { NextPage } from 'next';

import PlanCard from "../../components/membership/plans/Plan";
import PerkCard from '../../components/membership/perks/Perk';

import StoryCard from "../../components/membership/stories/Story";
import FAQ from "../../components/membership/faq/FAQ";

import membershipData from "../../assets/dummy_data/membership.json";
import storiesData from "../../assets/dummy_data/customer_stories.json";
import { perkData } from '../../assets/dummy_data/perks';
import questionsData from "../../assets/dummy_data/frequently_asked.json";
import uniqueId from "lodash.uniqueid";


const Membership: NextPage = () => {
  const partitioned = storiesData.map((e, i) => {
    if(i % 3 === 0) {
      return storiesData.slice(i, i + 3);
    }
  });

  const filtered = partitioned.filter(e => {
    return e !== undefined;
  });

  return (
    <div className={classes.membership}>
        <h1>Get more out of the news</h1>
        <div className={classes.cardWrapper}>
            {membershipData.map(e => {
                return <PlanCard data={e} key={uniqueId()} />
            })}
        </div>
        <div className={classes.perkWrapper}>
          {perkData.map(e => {
            return <PerkCard key={uniqueId()} icon={e.src} heading={e.heading} description={e.description} />
          })}
        </div>
        <div className={classes.storiesParent}>
          <h1>We’d love to tell you some customer stories</h1>
          <div className={classes.storiesWrapper}>
            {filtered.map(e => {
                return <StoryCard data={e} key={uniqueId()} />
            })}
          </div>
        </div>
        <div className={classes.FAQParent}>
          <FAQ questions={questionsData} />
        </div>
    </div>
  );
};

export default Membership;
