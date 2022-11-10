import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux'
import { searchActions } from '../../../store/slices/search-slice';

import classes from "./SearchTerm.module.css";

type stateType = {
    search: searchType
}

type searchType = {
    searched: datatypes
}

type datatypes = {
    length: number,
    users: object[],
    blogs: object[],
}

const Search = () => {
    const router = useRouter();
    const { term } = router.query;
    const dispatch = useDispatch();

    const [userData, setUserData] = useState<object[]>([]);
    const [blogData, setBlogData] = useState<object[]>([]);
    const searchData:datatypes = useSelector((state:stateType) => state.search.searched);

    useEffect(() => {
        if(Object.values(searchData).length > 0) {
            setUserData(searchData.users);
            setBlogData(searchData.blogs)
        }

        if(Object.values(searchData).length === 0 && term) {
            const searchAgain = async () => {
                const req = await axios.get(`${process.env.NEXT_PUBLIC_PROXY_URL}/search/${term}`);
                const res = await req.data;
                dispatch(searchActions.setSearched(res));
            }
            searchAgain();
        }
    }, [searchData, term]);

    if(searchData.length !== 0 && typeof searchData !== "string") {
        return (
            <div>index</div>
        )
    } else if (typeof searchData === "string") {
        return (
            <div>404</div>
        )
    } else {
        return (
            <ColorRing visible={true} height="80" width="80" wrapperClass={classes.loader} 
                colors={['#b2ff66', '#b2ff66', '#b2ff66', '#b2ff66', '#b2ff66']} />
        )
    }
}

export default Search