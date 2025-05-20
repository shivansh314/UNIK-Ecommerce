import { X } from "lucide-react";
import CartCard from "./Cards/CartCard.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems } from "../store/CartSlice.js";
import { Link } from "react-router-dom";

const CartDrawer = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items) || []; 

  const userid = userdata?.user?.id;

  useEffect(() => {
    if (userid) {
      dispatch(fetchCartItems(userid));
    }
  }, [userid, dispatch]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed right-200 inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-6/12 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-800 ease-in-out`}
        style={{ marginRight: 0 }}
      >
        {/* Close Button */}
        <button
          className="absolute top-12 right-10 text-black"
          onClick={() => setIsOpen(false)}
        >
          <X size={38} />
        </button>

        {/* Cart Title */}
        <div className="flex justify-center p-12">
          <h2 className="text-5xl font-semibold font-[inter] mb-4">CART</h2>
        </div>

        <div className="overflow-y-auto border-b border-gray-300 h-[430px]">
          {cartItems.map((item) => (
          
              <CartCard
                id={item.id}
                name={item.name}
                color={item.color}
                quantity={item.quantity}
                size={item.size}
                cost={item.cost}
                main_image_link={item.main_image_link}
              />
        
          ))}
        </div>

        {/* Order Button */}
        <div className="bg-[#212322] h-[140px] flex justify-center items-center ">
          <Link to="/checkout">
            <button
              className="text-white text-4xl h-30 w-3xl "
              onClick={() => {
                setIsOpen(false);
              }}
            >
              ORDER
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
