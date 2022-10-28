import axios from 'axios';
import Cookies from 'js-cookie';
import { NextPage } from 'next'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TagInputs from '../../../../components/posts/add/TagInputs';
import TextInputs from '../../../../components/posts/add/TextInputs';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { RootState } from '../../../../store';
import { getUserSession } from '../../../../utils/GetUserSession';
import classes from "./AddPost.module.css";

const AddPost:NextPage = () => {
  const localAsString = useLocalStorage("blogCache");
  const cookie = Cookies.get("user");
  const user = cookie && JSON.parse(cookie);
  const storeUser:any = useSelector((state:RootState)=> state.user.profile);
  
  const router = useRouter();
  
  const [canSend, setCanSend] = useState(false);
  const [sendClicked, setSendClicked] = useState(false);

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    story: "",
    tags: []
  });

  const [textErrors, setTextErrors] = useState({
    title: false,
    description: true,
    story: false
  });

  const [showErrors, setShowErrors] = useState(false);
  const [revalidate, setRevalidate] = useState(false);

  const handlePublishClick = () => {
    setRevalidate(true);
    setSendClicked(true);
    setTimeout(() => {
      setShowErrors(true);
    }, 10);
  }

  const sendBlogData = async (data:object) => {
    const req = await axios.post(`${process.env.NEXT_PUBLIC_PROXY_URL}/blog/add`, data, {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    });
    return req.status;
  }

  const handleRequest = async () => {
    const currentDate = new Date().toISOString();
    const words = postData.story.split(" ").length;
    const readTime = words > 200 ? words / 200 : 1;
    
    const data = { user: user.id, date: currentDate, readTime: Math.floor(readTime), ...postData };
    const responseCode = await sendBlogData(data);
    
    if(responseCode === 200) {
      localStorage.removeItem("blogCache");
      if(storeUser.username) {
        router.push(`/${storeUser.username}`);
      } else router.push("/");
    }
    setCanSend(false);
  }

  useEffect(() => {
    if(textErrors && revalidate) {
      const eligible = Object.values(textErrors).filter(e => e).length === 3;
      if(eligible) {
        setCanSend(true);
      } else {
        setCanSend(false);
      }
    }
  }, [revalidate, textErrors]);
  
  useEffect(() => {
    if(canSend && sendClicked) handleRequest();
  }, [canSend, sendClicked]);

  useEffect(() => {
    setSendClicked(false);
    const saveInfo = Object.values(postData).filter(e => {
      if(typeof e === "string") {
        return e === ""
      } else return e.length === 0;
    }).length;
    
    if(saveInfo <= 4) localStorage.setItem("blogCache", JSON.stringify(postData));
  }, [postData]);

  return (
    <div className={classes.wrapper}>
      <TextInputs sendClicked={setSendClicked} revalidate={revalidate} localData={localAsString} show={showErrors} errors={textErrors} emitErrors={setTextErrors} emitPostData={setPostData} />
      <TagInputs localData={localAsString} emitPostData={setPostData} />
      <div className={classes.buttons}>
        <button onClick={handlePublishClick}>Publish</button>
      </div>
    </div>
  )
}

export async function getServerSideProps({ req }:{ req: any }) {
  const session = getUserSession(req);
  if (!session) {
    return { redirect: {
      permanent: false,
      destination: "/login"
    }, props: {} };
  }
  
  return {
    props: {},
  };
}

export default AddPost;