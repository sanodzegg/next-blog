import type { NextPage } from 'next'
import { useEffect } from 'react';
import styles from '../styles/Home.module.css'

import { Hero } from "../components/hero/Hero";
import { FeaturedBlog } from '../components/featured/FeaturedBlog';
import axios from 'axios';

const Home: NextPage = () => {

  useEffect(() => {
    // async function getRecords() {
    //   const creds = {
    //     username: "Saxeli",
    //     password: "wewewew"
    //   }
    //   const resp = axios.post(`http://localhost:5000/user/add`, creds);
    //   console.log(resp);
            
    // }
  
    // getRecords();
  
    return;
  }, []);

  return (
    <div className={styles.container}>
        <Hero />
        <section className={styles.mainFlex}>
          <FeaturedBlog />
        </section>
    </div>
  )
}

export default Home
