import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/AuthSlice.js";

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form Submission

const onSubmit = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/customers/login",
      data,
      { withCredentials: true }
    );

    console.log("Login Success:", response.data); // Debugging

    
    console.log("Dispatching action:", login(response.data));
    dispatch(
      login({
        user: response.data.user,
      })
    );

    navigate("/");
    alert("Login successful");
  } catch (error) {
    console.error("Login Error:", error);
    alert("Login failed!");
  }
};


  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#FAFAFA] p-10 rounded-2xl shadow-md w-[384px]"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">LOGIN</h2>
        <Link to="/register">
          <p className="font-[inter] text-center text-gray-600 uppercase text-sm">
            {" "}
            sign up{" "}
          </p>
        </Link>

        {/* Email */}
        <label className="block font-[inter] mb-2">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full p-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Username */}
        <label className="block font-[inter] mt-3 mb-2">Username</label>
        <input
          {...register("username")}
          className="w-full p-2 border rounded"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        {/* Password */}
        <label className="block font-[inter] mt-3 mb-2">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#212322] text-white p-2 rounded mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginComponent;
