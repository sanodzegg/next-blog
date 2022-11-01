import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'

import { Hero } from "../components/hero/Hero";
import FeaturedBlog from '../components/home/featured/FeaturedBlog';
import axios from 'axios';
import Blogs from '../components/home/blogs/Wrapper';
import FeaturedAuthors from '../components/home/side/FeaturedAuthors';
import FeaturedTags from '../components/home/side/FeaturedTags';

const Home: NextPage = () => {
  const [featuredPost, setFeaturedPost] = useState({});
  const [data, setData] = useState([] || "");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getRecords() {
      const req = await axios.get(`${process.env.NEXT_PUBLIC_PROXY_URL}/blogs/${page}`);
      const res = await req.data;
      setData(res);
    }
  
    getRecords();
  
    return;
  }, [page]);

  return (
    <div className={styles.container}>
        <Hero />
        <section className={styles.mainFlex}>
          <div className={styles.mainCol}>
            <FeaturedBlog post={featuredPost} />
            <Blogs currentPage={page} emitPage={setPage} blogs={data} />
          </div>
          <aside className={styles.mainCol}>
            <FeaturedAuthors />
            <FeaturedTags />
          </aside>
        </section>
    </div>
  )
}

export default Home
