import React from 'react'
import Slider from '../Components/Home/slider/slider';
import Timer from '../Components/Home/Sale/timer/timer';
import Flashsale from '../Components/Home/Sale/flashsales/flashsale';
import zara1 from '../Components/Assets/zara11.png'
import zara2 from '../Components/Assets/zara7.png'
import zara3 from '../Components/Assets/zara8.png'
import zara4 from '../Components/Assets/zara9.png'
import zara5 from '../Components/Assets/zara12.png'
import woman from '../Components/Assets/woman.png'
import man from '../Components/Assets/men.png'
import kids from '../Components/Assets/kids2.png'
import shoes from '../Components/Assets/shoes.png'
import perfume from '../Components/Assets/perfume3.png'
import Banner from '../Components/Home/Banners/banner'
import Featured from '../Components/Home/Featuredproducts/featured'
import Newarrival from '../Components/Home/Newarrivals/newarrival'
import Browsecategory from '../Components/Home/Browsecategory/browsecategory'
import Properties from '../Components/Home/properties/properties'






const Home = () => {
  const categories = [
    {
      id: '65b3bb8a354c384cc1046e86',
      name: "Man's Collection",
      imageSrc: man,
      imageAlt: "Clothing Category",
      href: "/clothing",
    },
    {
      id: 2,
      name: "Women's Collection",
      imageSrc: woman,
      imageAlt: "Shoes Category",
      href: "/shoes",
    }, {
      id: '65b3be169f078945f6e80a8a',
      name: "Shoes",
      imageSrc: shoes,
      imageAlt: "Shoes Category",
      href: "/shoes",
    }, {
      id: 4,
      name: "Perfume",
      imageSrc: perfume,
      imageAlt: "Shoes Category",
      href: "/shoes",
    }, {
      id: 5,
      name: "Kid's Collection",
      imageSrc: kids,
      imageAlt: "Shoes Category",
      href: "/shoes",
    },];



  const products = [
    {
      id: 1,
      name: "Product 1",
      color: "Blue",
      price: "$19.99",
      imageSrc: zara1,
      imageAlt: "Product 1 Image",
      href: "#",
      rating: 3
    },
    {
      id: 2,
      name: "Product 2",
      color: "Red",
      price: "$29.99",
      imageSrc: zara2,
      imageAlt: "Product 2 Image",
      href: "#",
      rating: 3
    },
    {
      id: '65b3be169f078945f6e80a8a',
      name: "long sleeve t-shirt",
      color: "Green",
      price: "$39.99",
      imageSrc: zara3,
      imageAlt: "Product 3 Image",
      href: "#",
      rating: 4
    },
    {
      id: 4,
      name: "Product 4",
      color: "Yellow",
      price: "$49.99",
      imageSrc: zara4,
      imageAlt: "Product 4 Image",
      href: "#",
      rating: 2
    },
    {
      id: 5,
      name: "Product 4",
      color: "Yellow",
      price: "$49.99",
      imageSrc: zara5,
      imageAlt: "Product 4 Image",
      href: "#",
      rating: 3
    },
    {
      id: 6,
      name: "Product 4",
      color: "Yellow",
      price: "$49.99",
      imageSrc: zara5,
      imageAlt: "Product 4 Image",
      href: "#",
      rating: 3
    },
    {
      id: 7,
      name: "Product 4",
      color: "Yellow",
      price: "$49.99",
      imageSrc: zara5,
      imageAlt: "Product 4 Image",
      href: "#",
      rating: 3
    },
    {
      id: 8,
      name: "Product 4",
      color: "Yellow",
      price: "$49.99",
      imageSrc: zara5,
      imageAlt: "Product 4 Image",
      href: "#",
      rating: 3
    },
  ];

  return (
    <>
      <Slider />
      <Timer />
      <Flashsale products={products} />
      <Browsecategory categories={categories} />

      <Banner />
      <Featured products={products} />
      <Newarrival />
      <Properties />








    </>
  )
}
export default Home;