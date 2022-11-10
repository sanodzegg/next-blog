import React, { useEffect, useState } from 'react'
import classes from "./Search.module.css";

import SearchClose from "../../assets/icons/search-close.svg";
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { searchActions } from '../../store/slices/search-slice';
import { searchFor } from '../../store/actions/searchActions';
import { AppDispatch } from '../../store';
import { useRouter } from 'next/router';


const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const [term, setTerm] = useState("");
 
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);

  const handleSearch = (key?:string) => {
    if(!key && term !== "" || key === "Enter" && term !== "") {
      dispatch(searchFor(term));
      dispatch(searchActions.HideSearch())
      router.push(`/search/${term}`);
    };
  }

  return (
    <div className={`${classes.wrapper} ${loaded ? `${ classes.loaded}` : ''}`}>
      {loaded && 
        <div className={classes.inner}>
          <div className={classes.iconWrapper} onClick={() => dispatch(searchActions.HideSearch())}>
          <Image src={SearchClose.src} width={SearchClose.width} height={SearchClose.height} alt="close search" />
          </div>
          <div className={classes.input}>
            <input placeholder='What are you looking for?' type="text" onChange={(e) => setTerm((e.target as HTMLInputElement).value)} onKeyUp={(e) => handleSearch(e.key)} />
            <button onClick={() => handleSearch()}>search</button>
          </div>
        </div>
      }
    </div>
  )
}

export default Search