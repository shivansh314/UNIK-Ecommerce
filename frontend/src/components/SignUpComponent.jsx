import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";

// Validation Schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  dob: yup.date().required("Date of birth is required"),
});

function SignUpComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Form Submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/customers/register",
        data
      );
      console.log("Success:", response.data);
      alert("Sign-up successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Sign-up failed!");
    }
  };

  return (
    <div className="flex justify-center items-center  ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#FAFAFA] p-10 rounded-2xl shadow-md w-[384px]"
      >
        <h2 className="text-3xl font-semibold font-[inter] text-center mb-4">
          SIGN UP
        </h2>
        <Link to="/login">
          <p className="font-[inter] text-center text-gray-600 uppercase text-sm">
            {" "}
            sign in{" "}
          </p>
        </Link>

        {/* Username */}
        <label className="font-[inter] block mb-2">Username</label>
        <input
          {...register("username")}
          className="w-full p-2 border rounded"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        {/* Full Name */}
        <label className="font-[inter] block mt-3 mb-2">Full Name</label>
        <input
          {...register("fullName")}
          className="w-full p-2 border rounded"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}

        {/* Email */}
        <label className="font-[inter] block mt-3 mb-2">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full p-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password */}
        <label className="font-[inter] block mt-3 mb-2">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Phone */}
        <label className="font-[inter] block mt-3 mb-2">Phone</label>
        <input
          type="text"
          {...register("phone")}
          className="w-full p-2 border rounded"
        />
        {errors.phone && (
          <p className="text-red-500 font-[inter] text-sm">
            {errors.phone.message}
          </p>
        )}

        {/* Date of Birth */}
        <label className="block font-[inter] mt-3 mb-2">Date of Birth</label>
        <input
          type="date"
          {...register("dob")}
          className="w-full p-2 border rounded"
        />
        {errors.dob && (
          <p className="text-red-500 font-[inter] text-sm">
            {errors.dob.message}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#212322] text-white p-2 rounded mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUpComponent;
