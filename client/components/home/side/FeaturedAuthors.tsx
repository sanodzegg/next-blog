import axios from "axios";
import uniqueId from "lodash.uniqueid";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import classes from "./Side.module.css";

type dataType = {
    author: string,
    url: string
}

const getBestThree = (data:dataType[]) => {
    const authors = data.map(e => {
        if(e.author !== null) {
            return { author: e.author, url: e.url }
        }
    });
    
    const filtered = authors.filter(e => e !== undefined && !e?.author.includes("www")).slice(0, 3);
    console.log(filtered);
    
    
    return filtered;
}

const FeaturedAuthors:NextPage = () => {
    const [authors, setAuthors] = useState<(dataType | undefined)[]>([]);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_ACCESSTOKEN}`);
            const data = await res.data.articles;
            const filtered = getBestThree(data);
            setAuthors(filtered);
        }

        getData();
    }, []);

    return (
        <div className={classes.featured}>
            <span>featured authors</span>
            {authors && authors.map(e => {
                return <p onClick={() => e?.url && window.open(e?.url, "_blank")} key={uniqueId()}>{e?.author}</p>
            })}
        </div>
    );
}

export default FeaturedAuthors;