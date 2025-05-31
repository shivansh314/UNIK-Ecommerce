import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCartItems  } from "../store/CartSlice.js";


const ProductComponent = ({ productId }) => {
  const userdata = useSelector((state) => state.auth.user);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colors = ["#6B6659", "#8A5A2B"];
  const sizes = [40, 41, 42, 43, 44, 45, 46];

  const [selectedColor, setSelectedColor] = useState("kaki");
  const [selectedSize, setSelectedSize] = useState(40);


  const dispatch = useDispatch();


  // add to cart
  const handleAddToCart = async () => {
    if (!userdata) {
      alert("Please log in first!");
      return;
    }

    const orderData = {
      user_id: userdata.user.id,
      product_id: productId,
      quantity: 1,
      size: selectedSize,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/cart",
        orderData
      );
      dispatch(fetchCartItems(userdata.user.id));
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart");
    }
  };

  // fetch product by id 
  useEffect(() => {
    if (!productId) {
      console.error("Product ID is missing");
      setError("Invalid Product ID");
      setLoading(false);
      return;
    }

    const fetchProductById = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/v1/products/${productId}`
        );

        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product.");
        setLoading(false);
      }
    };

    fetchProductById();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="w-screen h-screen flex flex-row  p-6 mt-28">
      {/* Image Section */}
      <div className="relative w-[950px] h-[600px] group">
        {/* Image */}
        <img
          src={product.main_image_link}
          alt="Axolo  Sneakers"
          className="w-full h-full object-cover"
        />

      </div>

      {/* Product Details Section */}
      <div className="relative left-10 top-16 ">
        <h2 className="text-4xl font-bold">{product.name}</h2>
        <p className="text-gray-600 font-semibold">{product.material}</p>
        <div className="flex items-center mt-2">
          <span className="text-lg font-semibold">★★★★★</span>
          <span className="ml-2 text-gray-500">2 Reviews</span>
        </div>
        <p className="text-2xl font-bold mt-3 mb-6">{product.cost}₹</p>
        <hr className="border-t border-gray-300 opacity-50 my-4" />

        {/* Color Selection */}
        <div className="mt-4">
          <p className="text-sm font-medium">Color</p>
          <div className="flex gap-3 mt-2 mb-9">
            {colors.map((color, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mt-4">
          <p className="text-sm font-medium">Select your size</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={`px-4 py-2 border rounded-md ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-6 w-full bg-black text-white py-3 rounded-lg text-lg font-semibold"
        >
          Add to cart
        </button>

        {/* Shipping Info */}
        <p className="text-gray-500 text-sm mt-3 text-center">
          Free Shipping & Returns <strong>from 50₹ of purchase.</strong>
        </p>
        <p className="text-gray-500 text-sm text-center">
          Delivery between August 23 and 28
        </p>
      </div>
    </div>
  );
};

export default ProductComponent;
