import uniqueId from 'lodash.uniqueid';
import CardWrapper from './CardWrapper';

type props = {
    data: mapTypes[] | undefined,
}

type mapTypes = {
    name: string,
    position: string,
    review: string,
    image: string
}

const StoryCard = ({ data }:props) => {
    return (
        <section>
            {data && data.map((el:mapTypes, i:number) => {
                return <CardWrapper name={el.name} position={el.position} review={el.review} image={el.image} key={uniqueId()} />
            })}
        </section>
    )
}

export default StoryCard;