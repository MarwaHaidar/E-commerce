import React from 'react';
import './wishListItems.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


library.add(faShoppingCart, faTrash);

const WishListProduct = ({ product, removeItem }) => {

    const handleRemoveItem = () => {
        removeItem(product.productId);

        console.log(product.productId)
    };

    return (

        <div key={product.productId} className="group relative" href={product.productId}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 relative">
                {/* Discount Box */}
                <div className="absolute top-0 left-0 z-10" style={{ marginTop: '7px', marginLeft: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="bg-greenish-blue text-white font-bold px-2 py-1 rounded" style={{ width: 'fit-content' }}>20%</div>
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#07393C", marginTop: '2px', marginRight: '10px', zIndex: '100' }} onClick={() => {
                        console.log("clicked")
                        handleRemoveItem()
                    }} />

                </div>

                {/* Product Image */}
                <img
                    src={product.image}
                    className="h-full w-full object-cover object-center group-hover:opacity-0.8 lg:h-full lg:w-full"
                />
            </div>
            {/* Add to cart Box */}
            <div className="absolute left-0 w-full text-center">
                <div className="bg-greenish-blue text-white font-bold px-2 py-1 rounded"><FontAwesomeIcon icon="fa-solid fa-cart-shopping" style={{ color: "#ffffff", }} />Add to cart</div>
            </div>
            <div className="mt-10 flex justify-between items-center">
                <div>
                    <h3 className="text-lg text-black font-bold">
                        <a href={product.href}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </a>
                    </h3>
                    <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-900 mr-1">{product.price}</span>
                        {/* <span className="text-black text-lg line-through mr-14">$50</span> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishListProduct;
