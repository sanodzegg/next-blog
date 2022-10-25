import CardWrapper from './CardWrapper';

type props = {
    data: object[] | undefined,
}

const StoryCard = ({ data }:props) => {
    return (
        <section>
            {data && data.map((el:any, i:number) => {
                return <CardWrapper name={el.name} position={el.position} review={el.review} image={el.image} key={i} />
            })}
        </section>
    )
}

export default StoryCard;