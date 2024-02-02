import React from "react";
import Styles from "./InformationComponent.module.css";
import { IoCall } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { MdEmail } from "react-icons/md";


const InformationComponent = () => {
  return (
    <div className={Styles.mainBox}>
      <div className={`${Styles.box} container mx-auto p-4`}>
        <h2 className={`text-xl font-bold mb-4 ${Styles.topictext}`}>
          <IoCall className="mt-1" /> <div className="ml-2 ">Call To Us</div>
        </h2>
        <p
          className={`${Styles.textBlue} mb-6 appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        >
          We are available 24/7, 7 days a week.
        </p>

        <h2 className={`text-xl font-bold mb-4 ${Styles.topictext}`}>
          <TfiWrite className="mt-1" />{" "}
          <div className="ml-2 "> Write To Us</div>
        </h2>
        <p
          className={`${Styles.textBlue} mb-6 appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        >
          Fill out our form, and we will contact you within 24 hours.
        </p>

        <div className={`${Styles.mb8}`}>
          <h3 className={`text-xl font-bold mb-4  ${Styles.topictext} `}>
            <MdEmail className="mt-1" /> <div className="ml-2 "> Emails</div>
          </h3>
          <p
            className={`${Styles.textBlue} appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          >
            E-comerce@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformationComponent;
