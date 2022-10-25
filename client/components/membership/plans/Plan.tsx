import classes from "./Plan.module.css";

type props = {
    name: string,
    monthly_cost: number,
    yearly_cost: number,
    perks: string[],
    sale?: number
}

interface propsInt {
    data: Partial<props>
}

import CheckedIcon from "../../../assets/icons/check_icon.svg";
import Image from 'next/image';
import uniqueId from 'lodash.uniqueid';

const PlanCard = ({ data }:propsInt) => {

    const cardWrapperClass = data.sale ? `${classes.cardWrapper} ${classes.main}` : classes.cardWrapper;
    const price = data.yearly_cost ? data.yearly_cost.toFixed(2) : data.monthly_cost?.toFixed(2);
    const duration = data.yearly_cost ? "/yearly" : "/monthly";

    return (
        <div className={cardWrapperClass}>
            {data.sale && 
                <div className={classes.saleWrapper}>
                    SAVE {data.sale}%
                </div>
            }
            <h5>{data.name}</h5>
            <h3>$ {price}<span>{duration}</span></h3>
            <p>Consider becoming a premium member, you will get access to the following perks:</p>
            <ul>
                {data.perks?.map(e => {
                    return <li key={uniqueId()}><Image src={CheckedIcon.src} width={CheckedIcon.width} height={CheckedIcon.height} /> {e}</li>
                })}
            </ul>
            <button>get unlimited access</button>
        </div>
    )
}

export default PlanCard;