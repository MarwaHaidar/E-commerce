import React from "react";
import Categoriescard from "../Components/Home/Browsecategory/Categoriescard";
import { Link  } from "react-router-dom";
import woman from "../Components/Assets/woman.png";
import man from "../Components/Assets/men.png";
import kids from "../Components/Assets/kids2.png";
import shoes from "../Components/Assets/shoes.png";
import perfume from "../Components/Assets/perfume3.png";

function AllCategories() {

  const categories = [
    {
      id: 1,
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
    },
    {
      id: 3,
      name: "Shoes",
      imageSrc: shoes,
      imageAlt: "Shoes Category",
      href: "/shoes",
    },
    {
      id: 4,
      name: "Perfume",
      imageSrc: perfume,
      imageAlt: "Shoes Category",
      href: "/shoes",
    },
    {
      id: 5,
      name: "Kid's Collection",
      imageSrc: kids,
      imageAlt: "Shoes Category",
      href: "/shoes",
    },
  ];

  return (
    <div>
      <div className="browsecategory">
        <div className="brosewcategories">
          <p>All Category</p>
        </div>
        <div className="mx-auto  max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 relative">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-[-50px] ml-[-50px] relative">
            <div className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 cursor-pointer"></div>
            {categories.map((category) => (
              <div key={category.id} id={`category-${category.id}`}>
                <Link to={`/category/${category.id}`}>
                  <Categoriescard category={category} />
                </Link>
              </div>
            ))}
            <div className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 cursor-pointer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCategories;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Categoriescard from "../Components/Home/Browsecategory/Categoriescard";
// import { Link } from "react-router-dom";

// function AllCategories() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // Fetch categories when the component mounts
//     axios
//       .get("http://localhost:5000/categories")
//       .then((response) => setCategories(response.data.data))
//       .catch((error) => console.error("Error fetching categories:", error));
//   }, []);

//   // Extract category IDs into an array
//   const categoryIds = categories.map((category) => category._id);
//   console.log("Category IDs:", categoryIds);

//   return (
//     <div>
//       <div className="browsecategory">
//         <div className="brosewcategories">
//           <p>All Category</p>
//         </div>
//         <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 relative">
//           <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-[-50px] ml-[-50px] relative">
//             {categories.map((category) => (
//               <div key={category.id} id={`category-${category.id}`}>
//                 <Link to={`/categories/${category._id}/subcategories`}>
//                   <Categoriescard category={category} />
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AllCategories;