import axios from "axios";
import uniqueId from "lodash.uniqueid";
import Image from "next/image";
import { useEffect, useState } from "react";
import classes from "./Side.module.css";

type dataType = {
    username: string,
    picture: string
}

import defaultAvatar from "../../../assets/default.png";
import { useRouter } from "next/router";

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
        <div className={classes.featured}>
            <span>featured authors</span>
            {authors && authors.map(e => {
                return (
                    <div onClick={() => router.push(`/author/${e?.username}`)} key={uniqueId()} className={classes.featuredWrapper}>
                        <Image className={classes.img} src={e ? e?.picture : defaultAvatar.src} width={40} height={40} objectFit="cover" alt="author avatar" />
                        <p>{e?.username}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default FeaturedAuthors;