import { ShoppingBag, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import CartDrawer from "./CartDrawer";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = ["/", "/register", "/login"].includes(
    location.pathname.toLowerCase()
  );

  const textColor = isHomePage ? "text-white" : "text-black";

  // handling cart
  const [isOpen, setIsOpen] = useState(false);


  const cartData = useSelector((state) => state.cart.items) || [];
  const [totalItems, setTotalItems] = useState(0);

  // Calculate the total number of items in the cart
  useEffect(() => {
    const count = cartData.reduce((total, item) => total + item.quantity, 0);
    setTotalItems(count);
  }, [cartData]);

  const isLoggedIn = useSelector((state) => state.auth.status);


  return (
    <nav className="w-full h-16 flex items-center justify-between px-10 bg-transparent absolute top-0 left-0">
      {/* Left Logo */}
      <Link to="/" className={`font-bold text-xl ${textColor}`}>
        UNIK
      </Link>

      {/* Center Links */}
      <div className={`flex space-x-8 font-semibold ${textColor}`}>
        <Link to="/product" className="hover:opacity-75">
          WOMAN
        </Link>
        <Link to="/product" className="hover:opacity-75">
          MAN
        </Link>
        <Link to="/login" className="hover:opacity-75">
          LOGIN
        </Link>

        {/* Conditionally render PROFILE link */}
        <Link
          to={isLoggedIn ? "/userprofile" : "/login"}
          className="hover:opacity-75"
        >
          PROFILE
        </Link>
      </div>
      {/* Right Icons */}
      <div className="flex items-center space-x-4">
        {/* Cart Button */}
        <button className="relative" onClick={() => setIsOpen(true)}>
          <ShoppingBag className={`w-5 h-5 ${textColor}`} />
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">
            {totalItems}
          </span>
        </button>

        {/* Cart Drawer */}
        <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* User Icon */}
        <Link to="/register">
          <User className={`w-5 h-5 ${textColor}`} />
        </Link>
        {/* Login Button */}
        <button className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full font-semibold">
          IN
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
