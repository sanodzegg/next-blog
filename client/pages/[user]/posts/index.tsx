import { NextPage } from 'next'
import React from 'react'
import { getUserSession } from '../../../utils/GetUserSession';

const PostsMain:NextPage = () => {
  return (
    <div>index</div>
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

export default PostsMain;