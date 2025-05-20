import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenProducts } from "../store/ProductSlice.js";
import Card2 from "../components/Cards/Card2.jsx";
import { useNavigate } from "react-router-dom";

function ProductPage() {


  const dispatch = useDispatch();
  const { menProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getMenProducts());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="w-screen h-auto bg-[#F7F6F3] flex flex-col items-center gap-2 justify-center mt-24">
      <div className="w-10/12 flex justify-center mb-14 mt-10">
        <div className="max-w-7xl w-full flex flex-row items-center">
          {/* Left Content */}
          <div className="w-1/2 pr-10 text-center h-[352.818px] p-10 bg-white flex flex-col justify-center">
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              HOME · <span className="font-semibold">COLLECTION HOMME</span>
            </p>
            <h1 className="text-4xl font-bold mt-4">SNEAKERS</h1>
            <p className="text-lg text-gray-600 mt-3 leading-relaxed">
              Discover our sneakers designed from{" "}
              <span className="font-semibold">a rigorous selection</span> of{" "}
              <span className="font-semibold">
                natural and recycled materials
              </span>
              : recycled wool, hemp, linen, and recycled cotton.
            </p>
          </div>

          {/* Right Image */}
          <div className="w-1/2">
            <img
              src="https://images.prismic.io/ubac/ZqtLOh5LeNNTxtch_22.jpg?auto=format%2Ccompress&rect=0%2C0%2C3400%2C2000&w=1920&q=80"
              alt="Sneakers Collection"
              className="w-full h-auto shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 ml-24">
        {/* Banner Section */}
        <img
          src="https://images.prismic.io/ubac/ZqtEXB5LeNNTxtWd_6.jpg?auto=format%2Ccompress&rect=200%2C0%2C3000%2C2000&w=1400&q=80"
          alt="Banner 1"
          className="w-[684px] h-[450px] shadow-lg mb-4"
        />

        {/* Products Section */}
        {menProducts.slice(0, 9).map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="cursor-pointer"
          >
            <Card2
              image={product.main_image_link}
              name={product.name}
              cost={product.cost}
            />
          </div>
        ))}
      </div>

      <div className="w-full flex flex-wrap gap-3 justify-center my-4">
        <img
          src="https://images.prismic.io/ubac/ZqtLOh5LeNNTxtch_22.jpg?auto=format%2Ccompress&rect=200%2C0%2C3000%2C2000&w=1400&q=80"
          alt="Banner 2"
          className="w-[684px] h-[450px] shadow-lg mb-4"
        />

        {menProducts.slice(9, 15).map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="cursor-pointer"
          >
            <Card2
              image={product.main_image_link}
              name={product.name}
              cost={product.cost}
            />
          </div>
        ))}
      </div>

      <div className="w-full flex flex-wrap gap-3 ml-44">
        <img
          src="https://images.prismic.io/ubac/ZqtWTB5LeNNTxtm-_17.jpg?auto=format%2Ccompress&rect=200%2C0%2C3000%2C2000&w=1400&q=80"
          alt="Banner 3"
          className="w-[684px] h-[450px] shadow-lg mb-4"
        />
        {menProducts.slice(15, 19).map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="cursor-pointer"
          >
            <Card2
              image={product.main_image_link}
              name={product.name}
              cost={product.cost}
            />
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center my-4 gap-3">
        {menProducts.slice(19, 21).map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="cursor-pointer"
          >
            <Card2
              image={product.main_image_link}
              name={product.name}
              cost={product.cost}
            />
          </div>
        ))}

        <img
          src="https://images.prismic.io/ubac/ZquMIR5LeNNTxuL1_10.jpg?auto=format%2Ccompress&rect=200%2C0%2C3000%2C2000&w=1400&q=80"
          alt="Banner 4"
          className="w-[684px] h-[450px] shadow-lg mb-4"
        />
      </div>
    </div>
  );
}

export default ProductPage;
