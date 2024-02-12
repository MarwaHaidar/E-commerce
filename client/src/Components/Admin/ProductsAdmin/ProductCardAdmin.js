import React, { useState } from 'react';
import styles from './ProductCardAdmin.module.css';
import { Link } from 'react-router-dom';


const ProductCardAdmin = ({_id ,name, desc, price, priceAfterDiscount, images, variations, subcategory, isFeatured, totalQuantityProducts, createdAt, imageCover,onDelete}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showVariations, setShowVariations] = useState(false);

console.log("id is ", _id)
  const openOverlay = (index) => {
    setSelectedImage(index);
  };

  const closeOverlay = () => {
    setSelectedImage(null);
  };

  const toggleVariations = () => {
    setShowVariations(!showVariations);
  };

  const getSizeName = (sizeEnum) => {
    switch (sizeEnum) {
      case 'SMALL':
        return 'Small';
      case 'MEDIUM':
        return 'Medium';
      case 'LARGE':
        return 'Large';
      default:
        return sizeEnum;
    }
  };




  return (
    <div className={styles.productcard}>
      <div className={styles.coverimage}>
            <div
            className={styles.productimage}
            >
            <img
        src={imageCover}
        alt={name}
        className={styles.productimage}
    />
    </div>

      </div>
      <div className={styles.productdetails}>
        <h2 className={styles.productname}>{name}</h2>
        <p className={styles.productdescription}>{desc}</p>

        <div className={styles.pricecontainer}>
          <p className={styles.price}>price : ${price}</p>
          {priceAfterDiscount && (
            <p className={styles.discountedprice}>discountedPrice : ${priceAfterDiscount}</p>
          )}
        </div>
        <div className={styles.additionalinfo}>
          <div>
            <p className={styles.subcategoryinfo}>
              Subcategory: <span className="font-semibold"><div className={styles.SubTitleAdmin}>  {subcategory?.name}</div></span>
            </p>
            <p className={styles.subcategoryinfo}>
              Featured: {isFeatured ? <span className={styles.SubTitleAdmin}>Yes</span> : <span className={styles.SubTitleAdmin}>No</span>}
            </p>
            <p className={styles.subcategoryinfo}>Total Quantity: <div className={styles.SubTitleAdmin}><b>{totalQuantityProducts}</b></div></p>
          </div>
          <p className={styles.dateinfo}>
            Created At: <div className={styles.SubTitleAdmin}><b>{new Date(createdAt).toLocaleString()}</b></div>
          </p>
        </div>
        <div className={styles.variations}>
          <button onClick={toggleVariations} className={styles.toggleButton}>
            {showVariations ? 'Hide Variations' : 'Show Variations'}
          </button>
          {showVariations && (
            <>
            
              {variations.map((variation, index) => (
                <div key={index} className={styles.variationsection}>
                  {variation.colors && variation.colors.length > 0 && (
                    <div className={styles.variationinfo}>
                      {variation.colors.map((color, colorIndex) => (
                        <div key={colorIndex} className={styles.variationinfo}>
                          <p className={styles.variationinfo}>
                            {color.color}
                          </p>
                          <div
                            className={styles.colorBox}
                            style={{ backgroundColor: color.color }}
                          ></div>
                          {color.sizes && color.sizes.length > 0 && (
                            <div className={styles.sizesInfo}>
                        
                              {color.sizes.map((size, sizeIndex) => (
                                <div key={sizeIndex} className={styles.variationinfo}>
                                  <p className={styles.variationinfo}>
                                    {getSizeName(size.enum[0])}: {size.quantitySizes}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
        <div className={styles.imagescontainer}>
          {images.map((img, index) => (
            <div
              key={index}
              className={styles.productimage}
              onClick={() => openOverlay(index)}
            >
              <img
                src={img}
                alt={`Product Image ${index}`}
                className={styles.productimage}
              />
            </div>
          ))}
        </div>
        {selectedImage !== null && (
          <div className={styles.overlaycontainer} onClick={closeOverlay}>
            <img
              src={images[selectedImage]}
              alt={`Large Product Image ${selectedImage}`}
              className={styles.overlayimage}
            />
          </div>
        )}
      </div>
      <div className={styles.editDelteCon}>
      <Link to={`/admin/editproduct/${_id}`} ><button  className={styles.btnEditAdmin}>edit</button> </Link>
      <button onClick={onDelete} className={styles.btnDeleteAdmin}>
        delete
      </button>

      </div>
    </div>
  );
};

export default ProductCardAdmin;
