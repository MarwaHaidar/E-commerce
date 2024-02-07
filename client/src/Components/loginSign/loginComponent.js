
import styles from './loginSign.module.css';
import imageecom from '../Assets/ecom.gif';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios'; 
function LoginComponent(){
  const navigate = useNavigate(); // Initialize navigate function
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/author/login', formData);
      const { user, success, message } = response.data;

      const accessToken = user.access_token;
      const refreshToken = user.refresh_token;
      console.log(accessToken);
      console.log(refreshToken);
        console.log(response.data);
        // Set the access token in the Authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        // Set the refresh token in a cookie
        document.cookie = `refreshToken=${refreshToken}; Secure; Max-Age=${7 * 24 * 60 * 60};`;



      // Assuming your backend returns a success message upon successful login
      if (success) {
        // Login was successful
        console.log('Login successful!');
        console.log('User:', user); // User data
        const role = user.role;
        if(role == "admin"){
          // Redirect to home page if login is successful
        navigate('/admin');
        }
        else{
           // Redirect to home page if login is successful
          navigate('/');
        }
       
      } else {
        // Handle other cases, such as incorrect credentials
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.'); // Handle generic errors
    }
  };
  // console.log('Form ', formData);
  return (
    <div className={styles.backgroudFlex}>
      <div className={styles.rightImage}>
      <img src={imageecom} alt="App Store" />
      </div>
    
    <div className={`max-w-md mx-auto p-6 ${styles.box}`}>
      <h2 className={`text-xl font-bold mb-4 ${styles.topicName}`}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="email" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-1 border rounded-md ${styles.inputText}`}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className={`block text-gray-600 text-sm font-semibold mb-2 ${styles.inputName}`}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-1 border rounded-md mb-20 ${styles.inputText}`}
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className={styles.SignUpLoginbutton}
        >
          Sign Up
        </button>
      </form>
      <div className={styles.haveAccountName}>
      <h3>You Don't have an account ? </h3>

     <h3> <Link to="/signup" className={styles.loginLink}>
    Sign up
     </Link>
     </h3>
    </div>

    <div className={styles.ForgetPass}>
    <h3>
    <Link to="/forgetpassword" className={styles.loginLink}>
      Forget Password ?
      </Link>
     </h3>

     </div>
    </div>
    </div>
  );
};

export default LoginComponent
