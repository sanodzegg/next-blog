import React, { useEffect, useState } from 'react'
import classes from "./Search.module.css";

import SearchClose from "../../assets/icons/search-close.svg";
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { searchActions } from '../../store/slices/search-slice';

const Search = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);

  return (
    <div className={`${classes.wrapper} ${loaded ? `${ classes.loaded}` : ''}`}>
      {loaded && 
        <div className={classes.inner}>
          <div className={classes.iconWrapper} onClick={() => dispatch(searchActions.HideSearch())}>
          <Image src={SearchClose.src} width={SearchClose.width} height={SearchClose.height} alt="close search" />
          </div>
          <div className={classes.input}>
            <input placeholder='What are you looking for?' type="text" />
            <button>search</button>
          </div>
        </div>
      }
    </div>
  )
}

export default Search