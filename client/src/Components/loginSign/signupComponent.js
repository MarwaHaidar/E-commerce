
import React, { useState } from 'react';
import styles from './loginSign.module.css';
import imageecom from '../Assets/ecom.gif';
function SignupComponent(){
  const [formData, setFormData] = useState({
    firstname:'',
    lastname:'',
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
      <h2 className="text-xl font-bold mb-4">Create an account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="firstname" className="block text-gray-600 text-sm font-semibold mb-2">Firstname</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className={`w-full p-1 border rounded-md ${styles.inputText}`}
            placeholder="Enter your firstname"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="lastname" className="block text-gray-600 text-sm font-semibold mb-2">Lastname</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className={`w-full p-1 border rounded-md ${styles.inputText}`}
            placeholder="Enter your lastname"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
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
          <label htmlFor="password" className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-1 border rounded-md ${styles.inputText}`}
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 mt-6 rounded-md ${styles.buttonSignup}`}
        >
          Sign Up
        </button>
      </form>
    </div>
    </div>
  );
};

export default SignupComponent
