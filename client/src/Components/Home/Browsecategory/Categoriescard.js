import React from 'react';
import styles from './Categoriescard.module.css'

const Categoriescard = ({ category, onClick }) => {
    // const renderRatingStars = (rating) => {
    //     const maxStars = 5;
    //     const stars = [];
    //     const numStars = Math.min(rating, maxStars); // Limit to a maximum of 5 stars

    //     for (let i = 0; i < numStars; i++) {
    //         stars.push(<span key={i} className="text-yellow-400">★</span>);
    //     }
    //     for (let i = rating; i < maxStars; i++) {
    //         stars.push(<span key={i} className="text-transparent">★</span>);
    //     }
    //     return stars;
    // };

    return (
        <div className="group relative ml-9 ">
        <div className={`bg-gray-200  ${styles.categorymaincontents}`}>
        <div className={styles.categoryDivImages}>
                <img
                    src={category.image}
                    alt={category.image}
                    className="h-full w-full object-contain group-hover:opacity-0.8 lg:h-60 lg:w-60"
                />
            </div>

            <div className="flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <h3 className={`text-lg text-center font-bold mr-4 py-1 px-2 rounded-full ${styles.categoryNameHeader}`}>
                        <a href={category.href}>
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {category.name}
                        </a>
                    </h3>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Categoriescard;