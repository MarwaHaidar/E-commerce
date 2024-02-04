import React from 'react';
import OurStory from '../Components/AboutUs/ourStory'
import OurStoryImage from '../Components/AboutUs/ourStoryImage';
import StatisticsCard from '../Components/AboutUs/statisticsCards';
import CrewImageCard from '../Components/AboutUs/crewImageCard';
import WebsiteFeatures from '../Components/AboutUs/websiteFeatures';

import zara1 from '../Components/Assets/zara11.png';
import rayan from '../Components/Assets/rayan.JPG';
import marwa from '../Components/Assets/marwa.jpg';
import oussama from '../Components/Assets/oussama.jpg';

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
    <OurStoryImage
    />
    </div>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
    <StatisticsCard icon={faDollar} value="33K" text="Monthly Product Sale" />
    <StatisticsCard icon={faUsers} value="45.5K" text="Active Customer in our website" />
    <StatisticsCard icon={faStore} value="5K" text="Active Sallers in our website" />
    <StatisticsCard icon={faSackDollar} value="45.5K" text="Anual gross sale in our site" />
    </div>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
    <CrewImageCard image={rayan} name="Rayan Sultan" position="Full Stack Developer" />
    <CrewImageCard image={oussama} name="Oussama Hamzeh" position="Full Stack Developer"/>
    <CrewImageCard image={marwa} name="Marwa Haidar" position="Full Stack Developer" />
    <CrewImageCard image={oussama} name="Wassim Youness" position="Full Stack Developer" />
    </div>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
    <WebsiteFeatures icon={faDollar} feature="33K" desc="Monthly Product Sale" />
    <WebsiteFeatures icon={faUsers} feature="45.5K" desc="Active Customer in our website" />
    <WebsiteFeatures icon={faStore} feature="5K" desc="Active Sallers in our website" />
    </div>
   
    </div>

  )
}
export default About;