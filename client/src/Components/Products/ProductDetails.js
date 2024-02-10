import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import axios from 'axios'
import DataContext from '../Context';
//------------------------------------------------------------------------------------------------
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





//---------------------------------------------------------------------------------------------------
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ProductDetails = () => {
  const { products, setProducts } = useContext(DataContext);
  //==========================================================================================

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
  let accessToken = getAccessToken();
  const handleAddToCart = async () => {


    try {
      console.log('selected size:', selectedSize['enum'][0]);
      const response = await axios.post(
        'http://localhost:5000/user/cart',
        {
          productId: productId,
          quantity: 1,
          currency: 'USD',
          color: selectedColor.color,
          size: selectedSize['enum'][0],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true

        }
      );

      console.log('Product added to cart:', response.data);
      console.log(accessToken)
      console.log(selectedSize['enum'][0])
      console.log(selectedColor.color)
      // console.log(selectedSize.enum)

    } catch (error) {

      console.log(selectedColor)
      console.error('Error adding product to cart:', error);
    }
  };
















  //-----------------------------------------------------------------------------------
  const [product, setProduct] = useState(null);

  let { productId } = useParams();

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:5000/products/${productId}`
    })
      .then((response) => {
        const productData = response.data.data;
        setProduct(productData);
      })
      .catch(error => console.error("Error: no such product Id", error));
  }, [productId]);

  // Guard clause to prevent accessing properties of null product
  if (!product) {
    return <div className="flex items-center justify-center h-screen">
      <div>Loading product details...</div>
    </div>
  }
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    // Reset selected size when a new color is selected
    setSelectedSize(null);
  };

  // // Function to handle size selection
  // const handleSizeSelect = (size) => {
  //   setSelectedSize(size);
  // };

  return (

    <div >
      <div className="pt-6 ">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-6xl lg:px-8">

            <li >
              <div className="flex items-center">
                <a className="mr-2 text-sm font-medium text-gray-900">
                  {product.subcategory.name}
                </a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <a aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className={"mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-6xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 bg-white p-8"}>
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product.imageCover}
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[0]}
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[1]}
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product.images[2]}
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl bg-white px-4 pb-0 pt-10 sm:px-6 lg:grid lg:max-w-6xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-8 lg:pt-16 lg:mb-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{product.price} USD</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className=
                      'h-5 w-5 flex-shrink-0'

                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">2 out of 5 stars</p>
                <a className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium mb-3 text-gray-900">Color</h3>
                <div className="flex items-center space-x-3">
                  {product.variations && product.variations.flatMap(variation => variation.colors).map((color, index) => (
                    <div
                      key={`${color.color}-${index}`}
                      className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${selectedColor && selectedColor.color === color.color ? 'ring ring-offset-1' : ''
                        }`}
                      onClick={() => handleColorSelect(color)}
                    >
                      <span
                        aria-hidden="true"
                        className="h-8 w-8 rounded-full border border-black border-opacity-10"
                        style={{ backgroundColor: color.color }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <h3 className="text-sm font-medium mb-3 text-gray-900">Size</h3>
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                  {/* Filter sizes based on the selected color */}
                  {selectedColor &&
                    product.variations.flatMap(variation => variation.colors)
                      .find(c => c.color === selectedColor.color)
                      .sizes.map((size, index) => (
                        <div
                          key={`${size}-${index}`}
                          className={`group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase ${size.quantitySizes > 0
                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none'
                            : 'cursor-not-allowed bg-gray-50 text-gray-200'
                            } ${selectedSize === size ? 'ring-2 ring-indigo-500' : ''}`}
                          onClick={() => handleSizeSelect(size)}
                        >
                          {size.enum}
                          {size.quantitySizes <= 0 && (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                stroke="currentColor"
                              >
                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                              </svg>
                            </span>
                          )}
                        </div>
                      ))}
                </div>
              </div>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.desc}</p>
              </div>
            </div>

            <div className="mt-0">

              <button onClick={handleAddToCart}
                type="submit"
                className="mt-20 flex w-full items-center justify-center rounded-md border border-transparent bg-custom px-8 py-3 text-base font-medium text-white hover:bg-customHover focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to Cart
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-md font-medium text-gray-1000"> Note: additional charges may apply based on your shipment method </h2>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductDetails;