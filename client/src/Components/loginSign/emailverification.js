import React, { useEffect } from 'react';
import { useParams} from 'react-router-dom';


import axios from 'axios';



import { useNavigate } from 'react-router-dom';

const VerificationComponent = () => {
  const { token } = useParams(); // Extract the token from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Send the token to the backend for verification
        const response = await axios.get(`http://localhost:5000/author/registerverify?token=${token}`);

        // If verification is successful, redirect to the login page
        console.log('Verification successful');
        navigate('/author/login');
      } catch (error) {
        // If verification fails or there's an error, handle it accordingly
        console.error('Error verifying token:', error);
        // Redirect to an error page or display an error message
        // navigate('/error');
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div>
      <h2>Verifying your account...</h2>
      {/* You can show a loader or some message while verification is in progress */}
    </div>
  );
};
export default VerificationComponent;
