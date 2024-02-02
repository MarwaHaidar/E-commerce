import React from 'react';


const Categoriescard = ({ category, onClick })  => {
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
        <div className="group relative w-full">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 relative">
              
                {/* Product Image */}
                <img
                    src={category.imageSrc}
                    alt={category.imageAlt}
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
                <a href={category.href}>
                <span aria-hidden="true" className="absolute  text-center inset-0" />
                {category.name}
                </a>
                </h3>
                   
                </div>
            </div>
        </div>
    );
};

export default Categoriescard ;
