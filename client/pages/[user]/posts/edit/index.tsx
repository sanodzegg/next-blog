import React from 'react'
import { getUserSession } from '../../../../utils/GetUserSession';

const EditPost = () => {
  return (
    <div>EditPost</div>
  )
}

export const getServerSideProps = async ({ req }:{req: { cookies: { user: string } }}) => {
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

export default EditPost;