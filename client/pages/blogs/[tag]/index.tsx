import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import BBTHeader from '../../../components/blogsByTags/BBTHeader';
import BBTWrapper from '../../../components/blogsByTags/BBTWrapper';

const BlogsByTag = () => {
    const router = useRouter();
    const { tag } = router.query;

    const [blogs, setBlogs] = useState([]);
    
    const getBlogsByTag = async (tag:string) => {
        const req = await axios.get(`${process.env.NEXT_PUBLIC_PROXY_URL}/blogsby/${tag}`);
        const res = await req.data;
        setBlogs(res);
    }

    useEffect(() => {
        if(typeof tag === "string" && tag) getBlogsByTag(tag);
    }, [tag]);
    
    const styles = {
        width: '100%',
        margin: '130px auto',
    }

    const pstyles = {
        textAlign: 'center',
        fontSize: '25px',
        marginTop: '50px'
    }

    return (
        <section>
            {tag && <BBTHeader tag={tag} />}
            {blogs.length > 0 && typeof blogs !== "string" ? 
                <>
                    <BBTWrapper blogs={blogs} />
                </>
            : blogs.length === 0 && typeof blogs !== "string" ? 
                <ColorRing visible={true} height="80" width="80" wrapperStyle={styles}
                colors={['#b2ff66', '#b2ff66', '#b2ff66', '#b2ff66', '#b2ff66']} />
            : <p style={pstyles}>No blogs found :&#40;</p>
            }
        </section>
    )
}

export default BlogsByTag