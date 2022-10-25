import { NextPage } from 'next'
import React, { useState } from 'react'
import TagInputs from '../../../../components/posts/add/TagInputs';
import TextInputs from '../../../../components/posts/add/TextInputs';
import classes from "./AddPost.module.css";

const AddPost:NextPage = () => {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    story: "",
    tags: []
  });

  return (
    <div className={classes.wrapper}>
      <TextInputs />
      <TagInputs emitPostData={setPostData} />
      <div className={classes.buttons}>
        <button>Publish</button>
      </div>
    </div>
  )
}

export default AddPost