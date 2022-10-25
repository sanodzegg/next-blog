import classes from "./UserBlogs.module.css";

import AddIcon from "../../../assets/icons/plus-circle.svg";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const UserBlogs = () => {
    const router = useRouter();
    const username = useSelector((state: any) => state.user.profile.username);
    
    return (
        <section className={classes.wrapper} onClick={() => router.push(`${username}/posts/add`)}>
            <div>
                <Image src={AddIcon.src} width={90} height={90} alt="add post icon" />
                <h3>Add a blog</h3>
            </div>
        </section>
    )
}

export default UserBlogs