import { NextPage } from "next";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const UserPage: NextPage = () => {

    
    const [displayUserPage, setDisplayUserPage] = useState(false);
    
    const router = useRouter();
    
    useEffect(() => {
        const userLogged = localStorage.getItem("ulg") ? true : false;
        setDisplayUserPage(userLogged);

        if(!userLogged) {
            router.push("/user/login");
        }
    }, []);

    if(displayUserPage) {
        return (
            <div>userpage</div>
        )
    } else return null;
}
  
export default UserPage