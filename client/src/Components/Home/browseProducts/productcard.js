import React from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

// product array 
const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    rating: '4',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    rating: '4',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    rating: '3',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    rating: '2',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 5,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    rating: '5',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 6,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    rating: '3',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 7,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    rating: '4',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 8,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    rating: '3',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  }
  // More products...
]

const ProductCard = () => {
  const generateStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`h-4 w-4 font-normal inline-block ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 large:grid-cols-4 xl:grid-cols-5 xl:gap-x-6">
      {products.map((product) => (
        <a key={product.id} href={product.href} className="group relative">
          <div className="bg-white p-3 w-79 rounded-lg shadow-md transition-transform transform-gpu hover:scale-105 relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 transform-gpu hover:scale-105 transition-transform">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>

            <h3 className="mt-4 text-sm text-gray-900 font-bold whitespace-nowrap">{product.name}</h3>
            <div className="flex items-center mt-1">
              <span className="bg-blue-200 px-2 rounded-full text-base font-bold text-black">{product.price}</span>
              <span className="ml-2">{generateStars(parseInt(product.rating))}</span>
            </div>



            <div className="absolute bottom-5 right-5 p-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <FiShoppingCart className="h-6 w-6 text-white" />
            </div>

            <div className="absolute top-5 right-5 p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <FiHeart className="h-6 w-6 text-white" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ProductCard;
