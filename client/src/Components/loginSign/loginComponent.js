
import React, { useState } from 'react';
import styles from './loginSign.module.css';
import imageecom from '../Assets/ecom.gif';
import { Link } from 'react-router-dom';
function LoginComponent(){
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value 
    });
  // console.log('e target name '+ e.target.name);
  // console.log('e target value '+ e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //send data to the serve
    console.log('Form submitted:', formData);
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
