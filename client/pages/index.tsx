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
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getRecords() {
      // const resp = await axios.get(`https://newsapi.org/v2/everything?domains=css-tricks.com&apiKey=${process.env.NEXT_PUBLIC_ACCESSTOKEN}`);
      // const data = await resp.data.articles;
      // setData(data);
      // setFeaturedPost(data[0]);
    }
  
    getRecords();
  
    return;
  }, []);

  return (
    <div className={styles.container}>
        <Hero />
        <section className={styles.mainFlex}>
          <div className={styles.mainCol}>
            <FeaturedBlog post={featuredPost} />
            <Blogs blogs={data.slice(1)} />
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
