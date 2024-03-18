// components/useUserData.js

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios'; // Make sure axios is installed

const useUserData = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session ,provider} = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        console.log("faceBook session", session);
        // Check if the user object and email are available
        if (session.user && session.user.email) {
          console.log("Facebook Email", session.user.email);
        } else {
          console.log("Email not available");
        }
        try {
    //  var obj  =   {
    //         mobile : mobile,
    //         cart_id: cartId ? cartId : "",
    //         fb_id:"",
    //          g_id:"",
    //          otp:""
    //       }
          // Replace 'your-api-endpoint' with the actual API endpoint
          // const response = await axios.get('your-api-endpoint', {
          //   headers: {
          //     Authorization: `Bearer ${session.accessToken}`,
          //   },
          // });
          setIsLoggedIn(true);
          setLoading(false)
           // Set to true if API call is successful
        } catch (error) {
          setIsLoggedIn(false); // Set to false if there's an error
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [session]);

  return { isLoggedIn, loading };
};

export default useUserData;
