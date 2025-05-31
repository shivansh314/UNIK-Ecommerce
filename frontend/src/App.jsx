import "./App.css";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { login, logout } from "./store/AuthSlice";
import axios from "axios";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/dashboard" , "/dashboard/orders" , "/dashboard/customers" , "/dashboard/reviews"];

  useEffect(() => {
    const element = document.getElementById("main-div");
    if (element) element.scrollTop = 0; // Scroll to top
  }, [location.pathname]);

  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is authenticated on app load
    axios
      .get("http://localhost:8000/api/v1/customers/me", {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(login({ user: res.data.user }));
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [dispatch]);

  
  return (
    <>
      <div
        id="main-div"
        className="h-screen w-screen m-0 p-0 overflow-x-hidden bg-[#F7F6F3]"
      >
        <div className="relative z-10 top-6">
          {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
