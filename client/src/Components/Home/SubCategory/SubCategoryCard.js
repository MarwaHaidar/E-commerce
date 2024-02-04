import React from 'react'
import styles from './SubCategory.module.css';

function SubCategory({subcategory}) {
  return (
    <div className="group relative w-full">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 relative">
          
            {/* Product Image */}
            <img
                src={subcategory.imageSrc}
                alt={subcategory.imageAlt}
                className="h-full w-full object-cover object-center group-hover:opacity-0.8 lg:h-full lg:w-full"
            />
            {/* ADD to cart
            <div className='absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 invisible group-hover:visible'>
                <div className="bg-greenish-blue text-white font-bold px-5 text-center py-1 rounded ">ADD TO CART</div>
            </div> */}
        </div>
        <div className="mt-4 flex justify-between items-center">
            <div>
            <h3 className="text-lg text-black font-bold text-center"> {/* Added text-center class */}
            <a href={subcategory.href}>
            <span aria-hidden="true" className="absolute  text-center inset-0" />
            {subcategory.name}
            </a>
            </h3>
               
            </div>
        </div>
    </div>
);
};

export default SubCategory
