import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { axiosPost } from '@/api';
import Nav from "@/component/nav"
const useUserData = (hitApi) => {
 const [otpVerified,setOtpVerified] = useState(false)
 useEffect(()=>{
    if(hitApi){
        setOtpVerified(true)
    }
 },[hitApi])

  return (
    <>
    <Nav otpVerified={otpVerified}/>
    </>
  );
};

export default useUserData;