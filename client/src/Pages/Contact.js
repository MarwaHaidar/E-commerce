import React from "react";
import InformationComponent from "../Components/ContactUs/Information/InformationComponent";
import SendInformationComponent from "../Components/ContactUs/sendInformationComponent.js/sendInformationComponent";

const Contact = () => {
  const style = {
    display: "flex",
    margin: "0 auto",
  };

  return (
    <div style={style}>
      <InformationComponent />
      <SendInformationComponent />
    </div>
  );
};
export default Contact;
