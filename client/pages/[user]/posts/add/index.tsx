import Cookies from 'js-cookie';
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import TagInputs from '../../../../components/posts/add/TagInputs';
import TextInputs from '../../../../components/posts/add/TextInputs';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { getUserSession } from '../../../../utils/GetUserSession';
import classes from "./AddPost.module.css";

const AddPost:NextPage = () => {
  const localAsString = useLocalStorage("blogCache");
  const [canSend, setCanSend] = useState(false);
  const cookie = Cookies.get("user");
  const user = cookie && JSON.parse(cookie).id;

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
    setCanSend(true);
    setTimeout(() => {
      setShowErrors(true);
    }, 10);
  }

  useEffect(() => {
    if(textErrors && canSend) {
      const eligible = Object.values(textErrors).filter(e => e).length === 3;

      if(eligible) {
        const currentDate = new Date().toISOString();
        const words = postData.story.split(" ").length;
        const readTime = words > 200 ? words / 200 : 1;
        
        const data = { user: user, date: currentDate, readTime: Math.floor(readTime), ...postData };
        setCanSend(false);
      }
    }
  }, [revalidate, textErrors, canSend]);

  useEffect(() => {
    const saveInfo = Object.values(postData).filter(e => {
      if(typeof e === "string") {
        return e === ""
      } else return e.length === 0;
    }).length;
    
    if(saveInfo < 4) localStorage.setItem("blogCache", JSON.stringify(postData));
    setCanSend(false);
  }, [postData]);

  return (
    <div className={classes.wrapper}>
      <TextInputs revalidate={revalidate} localData={localAsString} show={showErrors} errors={textErrors} emitErrors={setTextErrors} emitPostData={setPostData} />
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