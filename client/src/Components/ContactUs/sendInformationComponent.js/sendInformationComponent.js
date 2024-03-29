import React, { useState } from "react";
import styles from "./sendInformationComponent.module.css";
import contactImage from "../../Assets/contactus.gif";
import { IoSend } from "react-icons/io5";
import axios from 'axios'

const SendInformationComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/user/message', formData);
      setFormData({ name: "", email: "", message: "" }); // Clear form fields
      setNotification("Form submitted successfully!");
      setTimeout(() => {
        setNotification(null);
      }, 3000); // Clear notification after 3 seconds
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.boxright}>
      <div className="container p-4 mt-8 max-w-2xl">
      {notification && <div className="text-white bg-green-500 p-2 mb-4">{notification}</div>}
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className={`w-full p-1 border rounded-md  ${styles.inputText}`}
              id="name"
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`w-full p-1 border rounded-md  ${styles.inputText}`}
              id="email"
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className={`w-full p-1 border rounded-md  ${styles.TextArea}`}
              id="message"
              rows="5"
              placeholder="Your Message"
              name="message"
              value={formData.message || ""}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="flex items-center justify-center">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${styles.contactButton}`}
              type="submit"
            >
              Send Message <IoSend className="mt-1 ml-3" />
            </button>
          </div>
          </form>
      </div>

      <div className={styles.contactImagecss}>
        <img src={contactImage} alt="contact us image" />
      </div>
    </div>
  );
};

export default SendInformationComponent;
