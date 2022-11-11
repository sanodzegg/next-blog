import axios from "axios";
import uniqueId from "lodash.uniqueid";
import { useEffect, useState } from "react";
import classes from "./Side.module.css";

type dataType = {
    username: string,
    picture: string
}

import defaultAvatar from "../../../assets/default.png";
import { useRouter } from "next/router";
import FeaturedAuthor from "./FeaturedAuthor/FeaturedAuthor";

const FeaturedAuthors = () => {
    const [authors, setAuthors] = useState<(dataType | undefined)[]>([]);
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_PROXY_URL}/featuredUsers`);
            const data = await res.data;
            if(data.length > 3) setAuthors(data.slice(0, 3));
            else setAuthors(data);
        }

        getData();
    }, []);

    return (
        <div className={`${classes.featured} ${authors.length === 0 ? `${classes.loading}` : ''}`}>
            <span>featured authors</span>
            <div className={classes.featuredGrid}>
                {authors && authors.map(e => {
                    return <FeaturedAuthor key={uniqueId()} picture={e ? e?.picture : defaultAvatar.src} username={e?.username} />
                })}
            </div>
        </div>
    );
}

export default FeaturedAuthors;