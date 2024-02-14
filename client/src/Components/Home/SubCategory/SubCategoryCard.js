import React from 'react'
import styles from './SubCategory.module.css';

function SubCategory({subcategory}) {
  return (
    <div className="group relative ml-9">
       <div className={styles.categorymaincontents}>
        <div className={styles.categoryDivImages}>
          
            {/* Product Image */}
            <img
                src={subcategory.image}
                alt={subcategory.image}
                className="h-full w-full object-contain group-hover:opacity-0.8 lg:h-60 lg:w-80"
            />
            {/* ADD to cart
            <div className='absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 invisible group-hover:visible'>
                <div className="bg-greenish-blue text-white font-bold px-5 text-center py-1 rounded ">ADD TO CART</div>
            </div> */}
        </div>
        <div className="flex justify-center items-center">
        <div className="flex flex-col items-center">
            <h3 className={`text-lg text-center font-bold mr-4 py-1 px-2 rounded-full ${styles.categoryNameHeader}`}>
            <a href={subcategory.href}>
            <span aria-hidden="true" className="absolute  text-center inset-0" />
            {subcategory.name}
            </a>
            </h3>
               
            </div>
        </div>
    </div>
    </div>
);
};

export default SubCategory
