import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom"; // Import ScrollRestoration
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";
import App from "./App.jsx";

import AuthLayout from "../src/components/AuthLayout.jsx"

import ProductPage from "./pages/productPage.jsx";
import HomePage from "./pages/homePage.jsx";
import ProductInfoPage from "./pages/productinfoPage.jsx";
import Checkoutpage from "./pages/Checkoutpage.jsx";
import AuthPage from "./pages/registerPage.jsx"
import LoginPage from "./pages/LoginPage.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Check from "./pages/Check.jsx";


import Dashboard from "./pages/Dashboard.jsx"
import Adminorders from "./components/Dashboard/Adminorders.jsx"

import AdminReview from "./components/Dashboard/AdminReview.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <AuthPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/product",
        element: <ProductPage />,
      },
      {
        path: "/product/:productId",
        element: <ProductInfoPage />,
      },
      {
        path: "/receipt",
        element: <Check />,
      },
      {
        path: "/checkout",
        element: (
        
            <Checkoutpage />
     
        ),
      },
      {
        path: "/userprofile",
        element: <UserProfile />,
      },
      // ✅ Nested routes for Dashboard
      {
        path: "/dashboard",
        element: <Dashboard />, // Parent layout
        children: [
          { path: "", element: <Adminorders /> },
          { path: "reviews", element: <AdminReview /> },
          // Add more admin sections as needed
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  </StrictMode>
);
