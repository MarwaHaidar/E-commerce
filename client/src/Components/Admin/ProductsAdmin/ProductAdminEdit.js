import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SketchPicker } from 'react-color';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ProductAdminEdit.module.css'; // Import your styles

const getAccessToken = () => {
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };
  return getCookie('accessToken');
};

const ProductAdminEdit = () => {
  const { id } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    // Fetch subcategories from your API endpoint
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/subcategories");
        setSubcategories(response.data.data); // Assuming the response contains an array of subcategories
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, []);

  const [productData, setProductData] = useState({
    name: '',
    desc: '',
    price: 0,
    variations: [],
    subcategory: '',
    isFeatured: false,
    images: [],
  });

  useEffect(() => {
    // Fetch the product data by ID
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        const fetchedProductData = response.data.data; // Assuming your API response structure
        setProductData(fetchedProductData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [id]);
  let accessToken = getAccessToken();
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/admin/products/${id}`,
        
        productData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        }
      );

      console.log('Product updated successfully:', response.data);
      toast.success('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error.response.data.error);
      toast.error('Error updating product');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // const handleVariationChange = (
  //   index,
  //   field,
  //   value,
  //   colorIndex,
  //   sizeIndex
  // ) => {
  //   setProductData((prevProduct) => {
  //     const variations = [...prevProduct.variations];
  //     if (colorIndex !== undefined && sizeIndex !== undefined) {
  //       variations[index].colors[colorIndex].sizes[sizeIndex][field] = value;
  //     } else if (colorIndex !== undefined) {
  //       variations[index].colors[colorIndex][field] = value;
  //     } else {
  //       variations[index][field] = value;
  //     }
  //     return { ...prevProduct, variations };
  //   });
  // };

  const handleVariationChange = (
    index,
    field,
    value,
    colorIndex,
    sizeIndex
  ) => {
    setProductData((prevProduct) => {
      const variations = [...prevProduct.variations];
  
      if (colorIndex !== undefined && sizeIndex !== undefined) {
        variations[index].colors[colorIndex].sizes[sizeIndex][field] = value;
      } else if (colorIndex !== undefined) {
        variations[index].colors[colorIndex][field] = value;
      } else {
        variations[index][field] = value;
      }
  
      // Ensure that all predefined sizes are present
      variations.forEach((variation) => {
        variation.colors.forEach((color) => {
          ['small', 'medium', 'large'].forEach((size) => {
            const existingSize = color.sizes.find((s) => s.size === size);
            if (!existingSize) {
              color.sizes.push({ size, quantitySizes: 0 });
            }
          });
  
          // Remove any extra sizes not in predefined list
          color.sizes = color.sizes.filter((size) =>
            ['small', 'medium', 'large'].includes(size.size)
          );
        });
      });
  
      return { ...prevProduct, variations };
    });
  };
  
  
  const addVariation = () => {
    setProductData((prevProduct) => ({
      ...prevProduct,
      variations: [...prevProduct.variations, { colors: [] }],
    }));
  };

  const removeVariation = (index) => {
    setProductData((prevProduct) => {
      const variations = [...prevProduct.variations];
      variations.splice(index, 1);
      return { ...prevProduct, variations };
    });
  };

  const addColor = (variationIndex) => {
    setProductData((prevProduct) => {
      const variations = [...prevProduct.variations];
      const newColor = {
        color: '',
        quantity: '',
        sizes: [
          { size: 'small', quantitySizes: 0 },
          { size: 'medium', quantitySizes: 0 },
          { size: 'large', quantitySizes: 0 },
        ],
      };

      if (
        variations[variationIndex].colors.length === 0 ||
        variations[variationIndex].colors[
          variations[variationIndex].colors.length - 1
        ].color !== ''
      ) {
        variations[variationIndex].colors.push(newColor);
      } else {
        variations[variationIndex].colors[
          variations[variationIndex].colors.length - 1
        ] = newColor;
      }

      return { ...prevProduct, variations };
    });
  };

  const removeColor = (variationIndex, colorIndex) => {
    setProductData((prevProduct) => {
      const variations = [...prevProduct.variations];
      variations[variationIndex].colors.splice(colorIndex, 1);
      return { ...prevProduct, variations };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const imagesArray = files.map((file) => {
      const reader = new FileReader();

      return new Promise((resolve) => {
        reader.onload = (e) => {
          resolve({
            file,
            preview: e.target.result,
          });
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagesArray).then((images) => {
      setProductData((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images, ...images.map((image) => image.file)],
      }));
    });
  };

  const addImage = () => {
    setProductData((prevProduct) => {
      const updatedImages = [...prevProduct.images, ...selectedImages.map((image) => image.file)];
      return { ...prevProduct, images: updatedImages };
    });
  };

  
  const updateProduct = async () => {
    try {
      const formData = new FormData();
      productData.images.forEach((image, index) => {
        formData.append('images', image);
      });

      const response = await axios.put(
        `http://localhost:5000/admin/productsImage/${id}`,
        
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        }
      );

      console.log('Product images added successfully:', response.data);
      toast.success('Product images added successfully');
    } catch (error) {
      console.error('Error updating product images:', error.response.data.error);
      toast.error('Error updating product images');
    }

    setSelectedImages([]);
  };
  return (
    <div> <ToastContainer />
    <div className={` mx-auto ${styles.AddProductMain}`}>
      <form onSubmit={handleUpdate} className={`space-y-4 ${styles.formcontainerAddPr}`}>
      <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label
            htmlFor="desc"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={productData.desc}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Variations section */}
        {productData.variations.map((variation, variationIndex) => (
          <div key={variationIndex} className={`${styles.VariationContainer} ${styles.spaceY2}`}>
             {/* <label className={`${styles.VariationHeading} ${styles.block} ${styles.textSm} ${styles.fontMedium} ${styles.textGray600}`}>
              Variation {variationIndex}
            </label> */}
            <div className={`space-y-2 ${styles.spaceY2}`}>
              {variation.colors.map((color, colorIndex) => (
                <div key={colorIndex} className={`${styles.ColorContainer} ${styles.spaceY2}`}>
                  <label className={`${styles.ColorHeading} ${styles.block} ${styles.textSm} ${styles.fontMedium} ${styles.textGray600}`}>
                    Color {colorIndex + 1}
                  </label>
                  <div className={` ${styles.SketchPickerContainer} ${styles.spaceY2}`}>
                  <SketchPicker
                    color={color.color}
                    onChange={(pickedColor) =>
                      handleVariationChange(
                        variationIndex,
                        "color",
                        pickedColor.hex,
                        colorIndex
                      )
                    }
                  />
                  </div>
                  {/* <input
                    type="number"
                    value={color.quantity}
                    onChange={(e) =>
                      handleVariationChange(
                        variationIndex,
                        "quantity",
                        e.target.value,
                        colorIndex
                      )
                    }
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Quantity"
                  /> */}
                  {color.sizes.map((size, sizeIndex) => (
                    <div key={sizeIndex} className={`${styles.SizeContainer }${styles.flex} ${styles.spaceX2}`}>
                      <input
                        type="text"
                        value={size.size}
                        onChange={(e) =>
                          handleVariationChange(
                            variationIndex,
                            "size",
                            e.target.value,
                            colorIndex,
                            sizeIndex
                          )
                        }
                        className={`${styles.SizeInput }${styles.mt1} ${styles.p2} ${styles.w1_2} ${styles.border} ${styles.borderGray300} ${styles.roundedMd}`}
                        placeholder="Size"
                      />
                      <input
                        type="number"
                        value={size.quantitySizes}
                        onChange={(e) =>
                          handleVariationChange(
                            variationIndex,
                            "quantitySizes",
                            e.target.value,
                            colorIndex,
                            sizeIndex
                          )
                        }
                        className={` ${styles.QuantityInput } ${styles.mt1} ${styles.p2} ${styles.w1_2} ${styles.border} ${styles.borderGray300} ${styles.roundedMd}`}
                        placeholder="Quantity Sizes"
                      />
                    </div>
                  ))}
                    <div className={`flex space-x-2 ${styles.spaceY2}`}>
                    <button
                      type="button"
                      onClick={() => addColor(variationIndex)}
                      className={`AddRemoveButton ${styles.formButtonAddPr}`}
                    >
                      Add Color
                    </button>
                    <button
                      type="button"
                      onClick={() => removeColor(variationIndex, colorIndex)}
                      className={` AddRemoveButton ${styles.formButtonAddPr}`}
                    >
                      Remove Color
                    </button>
                  </div>
                </div>
              ))}
                <button type="button" onClick={() => addColor(variationIndex)} className={`AddRemoveButton ${styles.formButtonAddPr}`}>
                  Add Color
                </button>
                <button
                  type="button"
                  onClick={() => removeVariation(variationIndex)}
                  className={` ml-8 ${styles.AddRemoveButton} `}
                >
                  Remove Variation
                </button>
  
            </div>
          </div>
        ))}
        <button type="button" 
        onClick={addVariation}
        >
          Add Variation
        </button>
        {/* Subcategory and Is Featured */}
        <div>
          <label
            htmlFor="subcategory"
            className="block text-sm font-medium text-gray-600"
          >
            Subcategory
          </label>
          <select
            id="subcategory"
            name="subcategory"
            value={productData.subcategory}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={productData.isFeatured}
            onChange={(e) =>
              setProductData({ ...productData, isFeatured: e.target.checked })
            }
            className="mr-2"
          />
          <label
            htmlFor="isFeatured"
            className="text-sm font-medium text-gray-600"
          >
            Is Featured
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 ${styles.formButtonAddPr}`}
          >
            Update Product
          </button>
        </div>
        
      </form>


      {/* ----------images--------- */}

       {/* Images Form */}
       <form className={`space-y-4 ${styles.formcontainerAddPr}`}>
        {/* ... (other product details input fields) ... */}

        {/* Images selection */}
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-600"
          >
            Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            multiple
            accept="image/*"
          />
          {/* Display selected images previews */}
          <div className={`mt-2 flex space-x-2 ${styles.buttonContainerAddPr}`}>
            {selectedImages.map((image, index) => (
              <img
                key={index}
                src={image.preview}
                alt={`Selected ${index + 1}`}
                className="w-16 h-16 object-cover border border-gray-300 rounded-md"
              />
            ))}
          </div>
          <button type="button" onClick={addImage} className={styles.AddRemoveButton}>
            Add Many Images
          </button>
        </div>

        {/* Submit Button for updating images */}
        <div className={styles.ImageBtn}>
          <button
            type="button"
            onClick={updateProduct}
            className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 ${styles.formButtonAddPrImg}`}
          >
            Add Images
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ProductAdminEdit;