import classes from "./UserBlogs.module.css";

import AddIcon from "../../../assets/icons/plus-circle.svg";
import Image from 'next/image';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import uniqueId from "lodash.uniqueid";
import Blog from "./blog/Blog";

//swiper
import "swiper/css";
import { Swiper, SwiperSlide } from 'swiper/react';

type userTypes = {
    user: profileTypes
}

type profileTypes = {
    profile: { username: string };
}

type blogTypes = {
    title: string,
    date: string,
    readTime: number,
    description: string
    story: string,
    _id: string
}

const UserBlogs = () => {
    const router = useRouter();
    const username = useSelector((state: userTypes) => state.user.profile.username);

    const cookie = Cookies.get("user");
    const user = cookie && JSON.parse(cookie);

    const [userBlogs, setUserBlogs] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const getBlogs = async () => {
            if(user) {
                const req = await axios.get(`${process.env.NEXT_PUBLIC_PROXY_URL}/blogs/user/${username}`);
                const res = await req.data;
                setUserBlogs(res);
                setReady(true);
            }
        }
        getBlogs();
    }, []);

    const userHasBlogs = userBlogs.length > 0;

    if(ready) {
        return (
            <section className={!userHasBlogs ? classes.wrapper : classes.userBlogsWrapper} onClick={() => !userHasBlogs && router.push(`${username}/posts/add`)}>
                {userHasBlogs && 
                <div className={classes.heading}>
                    <h3>Your blogs</h3>
                    <Image src={AddIcon.src} className={classes.addIcon} width={45} height={45} alt="add post icon" onClick={() => router.push(`${username}/posts/add`)} />
                </div>
                }
                {!userHasBlogs ? 
                    <div>
                        <Image src={AddIcon.src} width={90} height={90} alt="add post icon" />
                        <h3>Add a blog</h3>
                    </div>
                :
                <Swiper className={classes.blogsSwiperWrapper} spaceBetween={20} slidesPerView={"auto"}>
                {userBlogs.map((e:blogTypes) => {
                    return (
                        <SwiperSlide key={uniqueId()} className={classes.slide}>
                            <Blog title={e.title} date={e.date} readTime={e.readTime}
                            description={e.description} story={e.story} blogID={e._id} />
                        </SwiperSlide>
                    )
                })}
                </Swiper>
                }
            </section>
        )
    } else return null;
}

export default UserBlogs

{/* <div className={classes.blogsWrapper}>
{userBlogs.map((e:blogTypes) => {
    return <Blog key={uniqueId()} title={e.title} date={e.date} readTime={e.readTime}
    description={e.description} story={e.story} />
})}
</div> */}