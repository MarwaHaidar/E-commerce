import React from 'react';
import OurStory from '../Components/AboutUs/ourStory'
//import OurStoryImage from '../Components/AboutUs/ourStoryImage';
import Slider from '../Components/AboutUs/ourStoryImage';
import StatisticsCard from '../Components/AboutUs/statisticsCards';
import CrewImageCard from '../Components/AboutUs/crewImageCard';
import WebsiteFeatures from '../Components/AboutUs/websiteFeatures';
import Properties from '../Components/Home/properties/properties'

import zara1 from '../Components/Assets/zara11.png';
import rayan from '../Components/Assets/rayan.JPG';
import marwa from '../Components/Assets/marwaa.jpg';
import oussama from '../Components/Assets/oussama.jpg';
import wassim from '../Components/Assets/wassim.png';

import { library } from '@fortawesome/fontawesome-svg-core';
import {faDollar} from '@fortawesome/free-solid-svg-icons';
import {faSackDollar} from '@fortawesome/free-solid-svg-icons';
import {faStore} from '@fortawesome/free-solid-svg-icons';
import {faUsers} from '@fortawesome/free-solid-svg-icons';

library.add(faDollar);

const About = () => {
  return (
    <div>
    <div style={{display:'flex',justifyContent:'space-between'}}>
    <OurStory
    />
    <Slider
    />
    </div>
    {/* <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
    <StatisticsCard icon={faDollar} value="33K" text="Monthly Product Sale" />
    <StatisticsCard icon={faUsers} value="45.5K" text="Active Customer in our website" />
    <StatisticsCard icon={faStore} value="5K" text="Active Sallers in our website" />
    <StatisticsCard icon={faSackDollar} value="45.5K" text="Anual gross sale in our site" />
    </div> */}
    <StatisticsCard/>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
    <CrewImageCard image={rayan} name="Rayan Sultan" position="Full Stack Developer" />
    <CrewImageCard image={oussama} name="Oussama Hamzeh" position="Full Stack Developer"/>
    <CrewImageCard image={marwa} name="Marwa Abou Haidar" position="Full Stack Developer" />
    <CrewImageCard image={wassim} name="Wassim Youness" position="Full Stack Developer" />
    </div>
    
    <Properties/>
   
    </div>

  )
}
export default About;