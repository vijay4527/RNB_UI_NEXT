// components/useUserData.js

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios'; // Make sure axios is installed

const useUserData = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        try {
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
