import React, { useEffect, useState } from "react";
import ProductComponent from "../components/Product.jsx";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReviewsList from "../components/Reviews/ReviewsList";

import ReviewCard from "../components/Cards/ReviewCard.jsx";
import RatingBox from "../components/RatingBox.jsx";


function ProductInfoPage() {

  const { productId } = useParams();
  const location = useLocation();
 
  useEffect(() => {
    const element = document.getElementById("main-div");
    if (element) element.scrollTop = 0;
  }, [location.pathname]);

  return (
    <div>
      <ProductComponent productId={productId} />
      <div className="p-10 mb-20">
        <Accordion
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            borderBottom: "1px solid #ddd",
            padding: "16px 0",
          }}
        >
          <AccordionSummary
            expandIcon=<X />
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span" sx={{ fontSize: "18px" }}>
              Shipping & Returns
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ fontSize: "16px", color: "#555" }}>
            Your order will be processed within 24 hours and shipped within 5-7
            business days. Returns are accepted within 30 days of purchase.
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            borderBottom: "1px solid #ddd",
            padding: "16px 0",
          }}
        >
          <AccordionSummary
            expandIcon=<X />
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" sx={{ fontSize: "18px" }}>
              Care
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ fontSize: "16px", color: "#555" }}>
            Hand wash cold, do not bleach, tumble dry low, and iron on low heat
            if necessary.
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            borderBottom: "1px solid #ddd",
            padding: "16px 0",
          }}
        >
          <AccordionSummary
            expandIcon=<X />
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span" sx={{ fontSize: "18px" }}>
              Durability & Composition
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ fontSize: "16px", color: "#555" }}>
            Made with 100% organic cotton. Durable, breathable, and
            long-lasting.
          </AccordionDetails>
        </Accordion>
      </div>

      <div>
        <div className="px-72 flex flex-row mb-16">
          <div className="w-[440px] h-auto mr-10 ">
            <img
              src="https://images.prismic.io/ubac/ZquD4B5LeNNTxuFg_520A2786-2.jpeg?auto=format%2Ccompress&rect=0%2C371%2C5464%2C7451&w=900&q=80"
              alt=""
              className="object-cover   transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
          <div className="p-20 ">
            <h1 className="font-bold font-[inter] text-5xl mb-6">
              R-CO VELOURS
            </h1>
            <h1 className="font-semibold  font-[inter] text-2xl mb-3">
              The benefits of recycled cotton
            </h1>
            <p className="text-gray-600 font-[inter] mb-3">
              R-CO VELOURS is recycled, spun and woven in Alicante, Spain.
              <br />
              Thanks to its robust weave, it's a durable, ultra-resistan8t
              <br />
              material. R-CO has the same advantages as conventional cotton:
              <br />
              breathability, comfort and softness.
            </p>
            <h1 className="font-semibold  font-[inter] text-2xl mb-3">
              Encouraging the circular economy
            </h1>
            <p className="text-gray-600 font-[inter] mb-3 mt-3">
              R-CO encourages the development of sorting and recycling
              <br />
              industries, guaranteeing jobs with decent, humane and ethical
              <br />
              working conditions, and all this in Europe.
            </p>
          </div>
        </div>
        <div className="px-72 flex flex-row mb-16">
          <div className="p-20 ">
            <h1 className="font-bold font-[inter] text-5xl mb-6">Impact</h1>
            <h1 className="font-semibold  font-[inter] text-2xl mb-3">
              Cotton recycled in Spain
            </h1>
            <p className="text-gray-600 font-[inter] mb-3">
              Recycled cotton avoids the impact of growing new cotton, while at
              <br />
              the same time recycling our old clothes, which are in large
              <br />
              quantities in Europe and destined for the bin. R-CO limits the use
              <br />
              of water (no dyeing or washing) and does not use pesticides.
            </p>
            <h1 className="font-semibold  font-[inter] text-2xl mb-3">
              VS conventional cotton
            </h1>
            <p className="text-gray-600 font-[inter] mb-3 mt-3">
              R-CO encourages the development of sorting and recycling
              <br />
              industries, guaranteeing jobs with decent, humane and ethical
              <br />
              working conditions, and all this in Europe.
            </p>
          </div>
          <div className="w-[440px] h-auto mr-10 ">
            <img
              src="https://images.prismic.io/ubac/ZquEQB5LeNNTxuFy_520A2709-2.jpeg?auto=format%2Ccompress&rect=0%2C371%2C5464%2C7451&w=900&q=80"
              alt=""
              className="object-cover   transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </div>
        <div className="ml-150">
          <RatingBox sizeValue={0.39} comfortValue={0.8} />
        </div>
        <div className="px-72">
          <h1 className="text-5xl mb-6">Reviews</h1>
          <ReviewsList productId={productId} />
        </div>
      </div>

      <div className="h-auto w-screen bg-white ">
        <div className=" pl-48 pt-20 flex flex-col justify-center">
          <h2 className="text-4xl font-bold select-none">NEWSLETTER</h2>
          <p className="text-gray-600 font-semibold opacity-80 mt-3">
            Discover in preview all our new products, our latest actions and{" "}
            <br /> get 100₹ off your first order by subscribing to our
            newsletter!
          </p>

          {/* Email Input */}
          <div className="mt-10 flex">
            <input
              type="email"
              placeholder="Type your email address here"
              className="w-80 px-4 py-3 border rounded-l-full text-gray-600 outline-none"
            />
            <button className="bg-black text-white px-6 py-3 rounded-r-full">
              Subscribe
            </button>
          </div>
        </div>
        <div className="w-full mt-10 p-10 pb-16 bg-[#212322] text-white py-6 flex justify-center">
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
  );
}

export default ProductInfoPage;
