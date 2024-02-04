import React, { useState } from "react";
import { SketchPicker } from 'react-color';
import axios from "axios";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    desc: "",
    price: 0,
    variations: [],
    subcategory: "",
    isFeatured: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

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
        color: "",
        quantity: 0,
        sizes: [
          { size: "small", quantitySizes: 0 },
          { size: "medium", quantitySizes: 0 },
          { size: "large", quantitySizes: 0 },
        ],
      };

      // Check if the colors array is empty or the last color is not empty
      if (
        variations[variationIndex].colors.length === 0 ||
        variations[variationIndex].colors[
          variations[variationIndex].colors.length - 1
        ].color !== ""
      ) {
        variations[variationIndex].colors.push(newColor);
      } else {
        // Replace the last color if it is empty
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Product:", productData); // Log the state to debug
    // Implement API call here
  };


  //   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {

//         const response = await axios.post('http://your-backend-url/api/products', productData);
//         console.log('Product created successfully:', response.data);
//       // You can redirect the user or perform other actions after successful creation
//     } catch (error) {
//       console.error("Error creating product:", error.response.data.error);
//     }
//   };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <div key={variationIndex} className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Variation {variationIndex}
            </label>
            <div className="space-y-2">
            {variation.colors.map((color, colorIndex) => (
            <div key={colorIndex} className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">
                Color {colorIndex + 1}
                </label>
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
                    <div key={sizeIndex} className="flex space-x-2">
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
                        className="mt-1 p-2 w-1/2 border border-gray-300 rounded-md"
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
                        className="mt-1 p-2 w-1/2 border border-gray-300 rounded-md"
                        placeholder="Quantity Sizes"
                      />
                    </div>
                  ))}
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => addColor(variationIndex)}
                    >
                      Add Color
                    </button>
                    <button
                      type="button"
                      onClick={() => removeColor(variationIndex, colorIndex)}
                    >
                      Remove Color
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex space-x-2">
                <button type="button" onClick={() => addColor(variationIndex)}>
                  Add Color
                </button>
                <button
                  type="button"
                  onClick={() => removeVariation(variationIndex)}
                >
                  Remove Variation
                </button>
              </div>
            </div>
          </div>
        ))}
        <button type="button" onClick={addVariation}>
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
          <input
            type="text"
            id="subcategory"
            name="subcategory"
            value={productData.subcategory}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
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
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;