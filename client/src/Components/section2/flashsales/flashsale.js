import React from 'react'
import zara1 from '../../Assets/zara1.png'
import styles from './flashsale.module.css'
const products = [
    {
      id: 1,
      name: "Product 1",
      color: "Blue",
      price: "$19.99",
      imageSrc: zara1,
      imageAlt: "Product 1 Image",
      href: "#",
    },
    {
      id: 2,
      name: "Product 2",
      color: "Red",
      price: "$29.99",
      imageSrc: "path/to/product2.jpg",
      imageAlt: "Product 2 Image",
      href: "#",
    },
    {
      id: 3,
      name: "Product 3",
      color: "Green",
      price: "$39.99",
      imageSrc: "path/to/product3.jpg",
      imageAlt: "Product 3 Image",
      href: "#",
    },
    {
      id: 4,
      name: "Product 4",
      color: "Yellow",
      price: "$49.99",
      imageSrc: "path/to/product4.jpg",
      imageAlt: "Product 4 Image",
      href: "#",
    },
  ];

const flashsale = () => {
  return (
    <div>
        <div className={styles.flashsale}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> */}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default flashsale
