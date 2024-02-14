import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './wishListItems.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


library.add(faShoppingCart, faTrash);

const WishListProduct = ({ product, removeItem }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("clicked")
        navigate(`/products/${product.productId}`)
    };
    const handleRemoveItem = () => {
        removeItem(product.productId);

        console.log(product.productId)
    };

    return (

        <div key={product.productId} className="group relative mb-10" href={product.productId}>
            <div className="aspect-h-1 aspect-w-1 w-full mb-2 overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-60 relative">
                {/* Discount Box */}
                <div className="absolute top-0 left-0 z-10" style={{ marginTop: '7px', marginLeft: '5px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div className='font-bold mt-0'>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.productName}
                    </div>
                    <FontAwesomeIcon icon={faTrash} style={{ color: "red", marginTop: '2px', marginRight: '10px', zIndex: '100', scale: '1.2' }} onClick={handleRemoveItem} />
                </div>
                {/* Product Image */}
                <img
                    src={product.image}
                    className="h-full w-full object-cover object-center group-hover:opacity-0.8 lg:h-full lg:w-full"
                />
            </div>
            {/* Add to cart Box */}
            <div className={`absolute left-0 w-full text-center  ${styles.addToCart}`} onClick={handleClick}>
                <div className={`bg-greenish-blue text-white  font-600 px-2 py-2 w-25 rounded`} >
                    Transfer to cart
                </div>
            </div>
        </div>
    );
};

export default WishListProduct;
