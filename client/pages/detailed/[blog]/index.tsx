import axios from 'axios';
import uniqueId from 'lodash.uniqueid';
import { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import BlogWrapper from '../../../components/BlogDetailed/DetailedWrapper/BlogWrapper';

type blogDataTypes = {
    author: string,
    title: string,
    description: string,
    date: string,
    readTime: number,
    story: string,
    tags: string[]
}

const BlogDetailed:NextPage = () => {
    const router = useRouter();
    const { blog } = router.query;

    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        if(blog !== undefined) {
            const getBlogDetailed = async () => {
                const req = await axios.get(`${process.env.NEXT_PUBLIC_PROXY_URL}/blog/${blog}`);
                const res = await req.data;
                setBlogData(res);
            }
            getBlogDetailed();
        }
    }, [blog]);

    console.log(blogData);
    

    return (
        <section>
            {blogData && blogData.map((e:blogDataTypes) => {
                return <BlogWrapper author={e.author} title={e.title} description={e.description} date={e.date} readTime={e.readTime}
                story={e.story} tags={e.tags} key={uniqueId()} />
            })}
        </section>
    )
}

export default BlogDetailed