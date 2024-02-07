import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';

const VerificationComponent = () => {
  const [validUrl, setValidUrl] = useState(false);
  const { token } = useParams(); // Extract the token from the URL

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Send the token to the backend for verification
        await axios.get(`http://localhost:5000/author/registerverify?token=${token}`);

        // If verification is successful, set validUrl to true
        setValidUrl(true);
      } catch (error) {
        // If verification fails or there's an error, set validUrl to false
        console.error('Error verifying token:', error);
        setValidUrl(false);
      }
    };

    verifyToken();
  }, [token]);

  if (validUrl) {
    // If the URL is valid, redirect the user to the login page
    return <Navigate to="/login" />;
  } else {
    // If the URL is not valid, redirect the user to the error404 page
    return <Navigate to="/error404" />;
  }
};

export default VerificationComponent;
