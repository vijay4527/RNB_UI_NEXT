import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { axiosPost, axiosGet } from '@/api';

const useUserData = (hitApi) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const sessionData = sessionStorage.getItem("userData");

    const fetchUserData = async () => {
      if (sessionData) {
        setIsLoggedIn(true);
        setUserInfo(JSON.parse(sessionData));
        setLoading(false);
        return;
      } else if (session && hitApi && !sessionData) {
        var obj = {
          "mobile": "",
          "fb_id":session && session.account.provider == "facebook" ?  session.accessToken : "",
          "cart_id": "",
          "g_id": session && session.account.provider == "google" ?  session.accessToken : "",
          "otp": "",
        };
        try {
          setLoading(true); 
          const response = await axiosPost('/User/LoginCheck', obj);
          if (response.respObj.isLogin === true) {
            sessionStorage.removeItem('userData');
            sessionStorage.setItem("userData", JSON.stringify(response.respObj.res));
            setIsLoggedIn(true);
            setLoading(false)
            setUserInfo(response.respObj);
          } else if (response.respObj.isLogin === false) {
            setIsLoggedIn(false);
            setOpenModal(true);
            setLoading(false)
          }
        } catch (error) {
          setIsLoggedIn(false);
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false); 
        }
      }
    };

    fetchUserData();
  }, [session, hitApi]);

  return { isLoggedIn, loading, userInfo };
};

export default useUserData;
