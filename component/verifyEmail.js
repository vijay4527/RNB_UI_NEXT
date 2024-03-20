// components/useUserData.js

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { axiosPost, axiosGet } from '@/api';

const useUserData = (hitApi) => { // Accept additional data as parameter
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session && hitApi) {
        var obj = {
          "mobile": "",
          "fb_id": "",
          "cart_id": "",
          "g_id": session.user.email,
          "otp": "",
        };
        try {
          const response = await axiosPost('/User/LoginCheck', obj);
          if (response.resp === false) {
            setIsLoggedIn(false);
          } else if (response.resp === true) {
            setIsLoggedIn(true);
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
  }, [session, hitApi]); // Add additionalData to dependency array

  return { isLoggedIn, loading };
};

export default useUserData;
