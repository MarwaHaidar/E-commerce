import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from '../Components/Home/slider/slider';
import Timer from '../Components/Home/Sale/timer/timer';
import Flashsale from '../Components/Home/Sale/flashsales/flashsale';
import zara1 from '../Components/Assets/zara11.png'
import zara2 from '../Components/Assets/zara7.png'
import zara3 from '../Components/Assets/zara8.png'
import zara4 from '../Components/Assets/zara9.png'
import zara5 from '../Components/Assets/zara12.png'
import Banner from '../Components/Home/Banners/banner'
import Featured from '../Components/Home/Featuredproducts/featured'
import Newarrival from '../Components/Home/Newarrivals/newarrival'
import Browsecategory from '../Components/Home/Browsecategory/browsecategory'
import Properties from '../Components/Home/properties/properties'

const Home = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories when the component mounts
    axios
      .get("http://localhost:5000/categories?page1&limit=50")
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Extract category IDs into an array
  const categoryIds = categories.map((category) => category._id);
  console.log("Category IDs:", categoryIds);

  
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