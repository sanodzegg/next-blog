import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { ResetHandler } from '../../../../utils/ResetHandler';
import classes from "./ResetPass.module.css";

export const getServerSideProps = async ({ req }:{req: { headers: { cookie: string }, url: string }}) => {
  const session = await ResetHandler(req);

  const urlparsed = req.url.split("/");
  const username = urlparsed.length === 4 ? urlparsed[1] : null;
  const userInCookie = req.headers.cookie ? req.headers.cookie.search(`${username}`) !== -1 : null;

  if (session !== 200 || (username && !userInCookie)) {
    return { redirect: {
      permanent: false,
      destination: "/login"
    }, props: {} };
  }
  
  return {
    props: {},
    };
}

const Reset = () => {
  const repPass = useRef<HTMLInputElement>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const { user } = router.query;

  const [eligible, setEligible] = useState(false);

  const [data, setData] = useState({
    username: "",
    newPass: ""
  });

  const [errors, setErrors] = useState({
    newPass: {
      valid: false,
      message: "Password should include: 0-9, A-B, !@#$%^&*()_+'/,."
    },
    repPass: {
      valid: false,
      message: "Passwords should match."
    }
  });

  const resetPasstoUser = async () => {
    const req = await axios.post(`${process.env.NEXT_PUBLIC_PROXY_URL}/user/reset`, data);
    if(req.status === 200) {
      router.push("/login");
    }
  }

  useEffect(() => {
    const canSubmit = Object.values(errors).filter(e => e.valid).length;
    if(canSubmit === 2) {
      setEligible(true);
    } else setEligible(false);
  }, [errors]);

  useEffect(() => {
    if(typeof user === "string" && user) {
      setReady(true);
      setData((prev) => ({...prev, username: user}));
    };
  }, [user]);
  
  const handlePass = (val: string) => {
    setData((prev) => ({...prev, newPass: val}));
    const numbers = val.match(/[0-9]/g);
    const uppercase = val.split('').filter(e => {return e === e.toUpperCase()});
    const symbols = val.match(/[!@#$%^&*()_+./,;']/g);
    
    if(numbers && numbers.length >= 1 && uppercase && uppercase.length >= 1 && symbols && symbols.length >= 1) {
        setErrors((prev) => ({...prev, newPass: {
            valid: true,
            message: "Password should include: 0-9, A-B, !@#$%^&*()_+'/,."
        }}));
    } else if (val.length === 0) {
        setErrors((prev) => ({...prev, newPass: {
          valid: false,
          message: "Password should include: 0-9, A-B, !@#$%^&*()_+'/,."
        }}));
    } else {
        setErrors((prev) => ({...prev, newPass: {
          valid: false,
          message: "Password should include: 0-9, A-B, !@#$%^&*()_+'/,."
        }}));
    }
  }

  const handleNewPass = (val: string) => {
    if(val === data.newPass) {
      setErrors((prev) => ({...prev, repPass: {
        valid: true,
        message: "Passwords should match."
      }}));
    } else {
      setErrors((prev) => ({...prev, repPass: {
        valid: false,
        message: "Passwords should match."
      }}));
    }
  }

  useEffect(() => {
    if(repPass.current) {
      handleNewPass(repPass.current.value);
    }
  }, [data.newPass]);

  const styles = {
    'width': '100%',
    'margin': '130px auto',
  }

  if(ready) {
    return (
      <div className={classes.wrapper}>
        <input type="password" placeholder='Enter new password' onChange={(e) => handlePass((e.target as HTMLInputElement).value)} value={data.newPass} />
        <span>{errors.newPass.message}</span>
        <input ref={repPass} type="password" placeholder='Repeat password' onChange={(e) => handleNewPass((e.target as HTMLInputElement).value)} />
        <span>{errors.repPass.message}</span>
        <button className={eligible ? classes.eligible : ''} onClick={resetPasstoUser}>Submit</button>
      </div>
    )
  } else return <ColorRing visible={true} height="80" width="80" wrapperStyle={styles}
  colors={['#a166ff', '#a166ff', '#a166ff', '#a166ff', '#a166ff']} /> ;
}

export default Reset