import React from 'react';


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
        <div className="group relative ml-9">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:w-80 relative container">
                <img
                    src={category.imageSrc}
                    alt={category.imageAlt}
                    className="h-full w-full object-contain group-hover:opacity-0.8 lg:h-60 lg:w-80"
                />
            </div>

            <div className="flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <h3 className="text-lg text-center font-bold mr-4 py-1 px-2 rounded-full">
                        <a href={category.href}>
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {category.name}
                        </a>
                    </h3>
                </div>
            </div>
        </div>

    );
};

export default Categoriescard;
