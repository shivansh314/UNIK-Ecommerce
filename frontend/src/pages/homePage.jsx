import React from "react";
import mainBanner from "../assets/mainBanner.png";
import banner1 from "../assets/banner1.png"
import banner2 from "../assets/banner2.png";
import grassland from "../assets/grassland.png";
import image2 from "../assets/image2.png"
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image1 from "../assets/image1.png";
import Card1 from "../components/Cards/Card1.jsx";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef ,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVolaProducts } from "../store/ProductSlice.js";


function HomePage() {

    const dispatch = useDispatch();
    const { volaProducts } = useSelector(
      (state) => state.products
    );

    useEffect(() => {
      dispatch(getVolaProducts());
    }, [dispatch]);


    const scrollRef = useRef(null);
    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    };
  return (
    <div className="h-screen w-screen">
      <div
        className="relative flex flex-col items-center justify-center h-screen w-screen
         inset-0 bg-cover bg-center before:absolute before:inset-0 before:bg-black before:opacity-10"
        style={{ backgroundImage: `url(${mainBanner})` }}
      >
        <div className="relative flex flex-col items-center justify-center">
          <p className="text-lg font-semibold text-white m-3 font-inter select-none">
            ULTRA WATERPROOF
          </p>
          <h1 className="text-6xl font-semibold text-white font-inter select-none ">
            AXOLO R-SKIN®
          </h1>
        </div>
      </div>

      {/* page 2  */}
      <div className="h-[130vh] w-screen bg-[#F7F6F3] pt-16 relative">
        {/* Title */}
        <h1 className="font-[inter] text-3xl font-semibold mb-4 mt-8 select-none pl-40">
          VOLVO CLASSICS
        </h1>

        {/* Scrollable Container */}
        <div>
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-20 top-[450px] transform -translate-y-1/2 bg-gray-100 hover:bg-gray-300 p-2 rounded-full "
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute left-20 top-[380px] transform -translate-y-1/2 bg-gray-100 hover:bg-gray-300 p-2 rounded-full "
          >
            <ChevronRight size={24} />
          </button>
          {/* Cards Wrapper */}
          <div
            ref={scrollRef}
            className="flex flex-row gap-3 h-[100vh] overflow-x-auto scroll-smooth scrollbar-hide whitespace-nowrap w-[80%] mx-auto"
          >
            {volaProducts.map((product) => (
              <Card1
                image={product.main_image_link}
                name={product.name}
                cost={product.cost}
                key={product.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* banner1 image  */}
      <div
        className="relative flex items-center justify-center h-screen w-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${banner1})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Text Content */}
        <h1 className="relative text-6xl font-semibold text-white select-none">
          NEWS
        </h1>
      </div>

      {/* banner2 image  */}
      <div
        className="relative flex flex-col items-center justify-center h-10/12 w-screen
         inset-0 bg-cover bg-center before:absolute before:inset-0 before:bg-black before:opacity-10"
        style={{ backgroundImage: `url(${banner2})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        {/* Text Content */}
        <h1 className="relative text-6xl select-none font-semibold text-white">
          VELVET CAPSULE
        </h1>
      </div>

      {/* grassland image */}
      <div
        className="relative flex flex-col items-center justify-center h-3/5 w-screen
         inset-0 bg-cover bg-center before:absolute before:inset-0 before:bg-black before:opacity-10"
        style={{ backgroundImage: `url(${grassland})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        {/* Text Content */}
        <h1 className="relative text-6xl font-semibold select-none text-white">
          UBAC VISION
        </h1>
      </div>

      {/* info */}
      <div className="w-screen h-auto  bg-[#F7F6F3] flex pt-36 align-middle flex-col">
        <h1 className="text-6xl font-bold font-inter select-none text-[#212322] text-center leading-tight ">
          "INSPIRED BY NATURE, DESIGNED <br /> FOR FUTURE."
        </h1>
        <p className="text-3xl font-normal mb-32 select-none text-[#212322] font-inter mt-5 text-center leading-tight">
          WE CREATE SNEAKERS THAT CONNECT NATURAL <br />
          MATERIALS TO A BOLD DESIGN BY PRIORITIZING LOCAL <br />
          MANUFACTURING OF COMPONENTS TO ASSEMBLY, <br />
          PROMISING A MINIMAL IMPACT ON THE ENVIRONMENT.
        </p>

        <h1 className="font-bold uppercase select-none text-4xl ml-12 mb-4">
          What makes UNIK unique
        </h1>

        <div className="flex flex-row gap-3 justify-center mb-48">
          <div className="w-[344px] bg-white  overflow-hidden">
            {/* Image */}
            <div className="h-[320px] w-auto flex items-center justify-center overflow-hidden">
              <img
                src={image2}
                alt="Product"
                className="object-cover object-center  transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>

            <div className="p-6 ">
              <span className="inline-block px-3 py-1 text-sm font-medium text-black border border-black rounded-full">
                SUGAR CANE
              </span>
              {/* Heading */}
              <h3 className="text-xl font-bold mt-3">Green EVA®</h3>
              {/* Description */}
              <p className="text-gray-600 font-semibold text-sm mt-2 mb-16 leading-relaxed">
                Discover ultra-lightness with our emblematic VOLA model,
                featuring a light sugarcane sole for comfort and cushioning.
              </p>
            </div>
          </div>

          <div className="w-[344px] bg-white overflow-hidden">
            {/* Image */}
            <div className="h-[320px] w-auto flex items-center justify-center overflow-hidden">
              <img
                src={image3}
                alt="Product"
                className="object-cover object-center  transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>

            <div className="p-6 ">
              <span className="inline-block px-3 py-1 text-sm font-medium text-black border border-black rounded-full">
                SUGAR CANE
              </span>
              {/* Heading */}
              <h3 className="text-xl font-bold mt-3">Green EVA®</h3>
              {/* Description */}
              <p className="text-gray-600 font-semibold text-sm mt-2 mb-16 leading-relaxed">
                Discover ultra-lightness with our emblematic VOLA model,
                featuring a light sugarcane sole for comfort and cushioning.
              </p>
            </div>
          </div>

          <div className="w-[344px] bg-white overflow-hidden">
            {/* Image */}
            <div className="h-[320px] w-auto flex items-center justify-center overflow-hidden">
              <img
                src={image1}
                alt="Product"
                className="object-cover object-center  transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>

            <div className="p-6 ">
              <span className="inline-block px-3 py-1 text-sm font-medium text-black border border-black rounded-full">
                SUGAR CANE
              </span>
              {/* Heading */}
              <h3 className="text-xl font-bold mt-3">Green EVA®</h3>
              {/* Description */}
              <p className="text-gray-600 font-semibold text-sm mt-2 mb-16 leading-relaxed">
                Discover ultra-lightness with our emblematic VOLA model,
                featuring a light sugarcane sole for comfort and cushioning.
              </p>
            </div>
          </div>

          <div className="w-[344px] bg-white overflow-hidden">
            {/* Image */}
            <div className="h-[320px] w-auto flex items-center justify-center overflow-hidden">
              <img
                src={image4}
                alt="Product"
                className="object-cover object-center  transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>

            <div className="p-6 ">
              <span className="inline-block px-3 py-1 text-sm font-medium text-black border border-black rounded-full">
                SUGAR CANE
              </span>
              {/* Heading */}
              <h3 className="text-xl font-bold mt-3">Green EVA®</h3>
              {/* Description */}
              <p className="text-gray-600 font-semibold text-sm mt-2 mb-16 leading-relaxed">
                Discover ultra-lightness with our emblematic VOLA model,
                featuring a light sugarcane sole for comfort and cushioning.
              </p>
            </div>
          </div>
        </div>

        {/* end page */}
        <div className="h-auto w-screen bg-white">
          <div className=" pl-48 pt-20 flex flex-col justify-center">
            <h2 className="text-4xl font-bold select-none">NEWSLETTER</h2>
            <p className="text-gray-600 font-semibold opacity-80 mt-3">
              Discover in preview all our new products, our latest actions and{" "}
              <br /> get 10₹ off your first order by subscribing to our
              newsletter!
            </p>

            {/* Email Input */}
            <div className="mt-10 flex">
              <input
                type="email"
                placeholder="Type your email address here"
                className="w-80 px-4 py-3 border rounded-l-full text-gray-600 outline-none"
              />
              <button className="bg-black  text-white px-6 py-3 rounded-r-full">
                Subscribe
              </button>
            </div>
          </div>
          <div className="w-full mt-30 p-10 pb-16  bg-[#212322] text-white py-6 flex justify-center">
            <div className="max-w-7xl w-full px-6 grid grid-cols-4 gap-6 text-sm">
              <div className="flex flex-col space-y-2">
                <a href="#" className="hover:underline">
                  Contact us
                </a>
                <a href="#" className="hover:underline">
                  Terms and conditions of sale
                </a>
              </div>
              <div className="flex flex-col space-y-2">
                <a href="#" className="hover:underline">
                  Ubac vision
                </a>
                <a href="#" className="hover:underline">
                  Legal information
                </a>
              </div>
              <div className="flex flex-col space-y-2">
                <a href="#" className="hover:underline">
                  100₹ on your first order
                </a>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </div>
              <div className="flex flex-col space-y-2">
                <a href="#" className="hover:underline">
                  Manage cookies
                </a>
                <a href="#" className="hover:underline">
                  Site Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default HomePage;
