import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import AuthorBlogsDisplay from '../../../components/author/AuthorBlogsDisplay';
import AuthorDisplay from '../../../components/author/AuthorDisplay';
import Border from '../../../components/author/Border';

type userTypes = {
  picture: string,
  username: string,
  aboutMe: string,
  blogs: mapProps[]
}

type mapProps = {
  date: string,
  description: string,
  readTime: number,
  story: string,
  title: string,
  _id: string
}

const Author = () => {
  const router = useRouter();
  const { username } = router.query;

  const [userData, setUserData] = useState<userTypes>();

  const getUserData = async (un:string) => {
    const req = await axios.get(`${process.env.NEXT_PUBLIC_PROXY_URL}/user/${un}`);
    const res = await req.data;
    setUserData(res);
  }

  useEffect(() => {
    if(typeof username === "string") {
      getUserData(username);
    }
  }, [username]);

  const styles = {
    'width': '100%',
    'margin': '130px auto',
  }

  return (
    <section>
      {userData && userData.blogs ? 
        <>
          <AuthorDisplay picture={userData.picture} username={userData.username} aboutMe={userData.aboutMe} />
          <AuthorBlogsDisplay blogs={userData.blogs} />
          <Border />
        </>
        :
          <ColorRing visible={true} height="80" width="80" wrapperStyle={styles}
        colors={['#a166ff', '#a166ff', '#a166ff', '#a166ff', '#a166ff']} /> 
      }
     </section>
  )
}

export default Author