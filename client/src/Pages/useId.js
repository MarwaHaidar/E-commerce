import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const UserProfile = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get the token from cookies
    const token = Cookies.get('accessToken'); 
    if (token) {
      const id = getUserIdFromToken(token);
      setUserId(id);
    }
  }, []);

  const getUserIdFromToken = (token) => {
    const decodedToken = jwt_decode(token);
    return decodedToken.user.id;
  };

  return (
    <div>
      {userId ? (
        <p>User ID: {userId}</p>
      ) : (
        <p>User not authenticated</p>
      )}
    </div>
  );
};

export default UserProfile;
