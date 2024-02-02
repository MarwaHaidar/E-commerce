import React from 'react'
import Slider from '../Components/Home/slider/slider';
import Timer from '../Components/Home/Sale/timer/timer';
import Flashsale from '../Components/Home/Sale/flashsales/flashsale';
import zara1 from '../Components/Assets/zara11.png'
import zara2 from '../Components/Assets/zara7.png'
import zara3 from '../Components/Assets/zara8.png'
import zara4 from '../Components/Assets/zara9.png'
import zara5 from '../Components/Assets/zara12.png'
import Banner from '../Components/Home/Banners/banner'




const Home = () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      color: "Blue",
      price: "$19.99",
      imageSrc: zara1,
      imageAlt: "Product 1 Image",
      href: "#",
      rating:3
    },
    {
      id: 2,
      name: "Product 2",
      color: "Red",
      price: "$29.99",
      imageSrc: zara2,
      imageAlt: "Product 2 Image",
      href: "#",
      rating:3
    },
    {
      id: 3,
      name: "Product 3",
      color: "Green",
      price: "$39.99",
      imageSrc: zara3,
      imageAlt: "Product 3 Image",
      href: "#",
      rating:4
    },
    {
      id: 4,
      name: "Product 4",
      color: "Yellow",
      price: "$49.99",
      imageSrc: zara4,
      imageAlt: "Product 4 Image",
      href: "#",
      rating:2
    },
    {
      id: 5,
      name: "Product 4",
      color: "Yellow",
      price: "$49.99",
      imageSrc: zara5,
      imageAlt: "Product 4 Image",
      href: "#",
      rating:3
    },
    {
      id: 6,
      name: "Product 4",
      color: "Yellow",
      price: "$49.99",
      imageSrc: zara5,
      imageAlt: "Product 4 Image",
      href: "#",
      rating:3
    },
    {
      id: 7,
      name: "Product 4",
      color: "Yellow",
      price: "$49.99",
      imageSrc: zara5,
      imageAlt: "Product 4 Image",
      href: "#",
      rating:3
    },
    {
      id: 8,
      name: "Product 4",
      color: "Yellow",
      price: "$49.99",
      imageSrc: zara5,
      imageAlt: "Product 4 Image",
      href: "#",
      rating:3
    },
  ];

  return (
    <>
    <Slider />
     <Timer/>
     <Flashsale products={products} />
     <Banner/>







     
     </>
  )
}
export default Home;