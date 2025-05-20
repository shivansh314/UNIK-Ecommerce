import dotenv from "dotenv";
dotenv.config()

import { sequelize } from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError} from "../utils/ApiError.js";


const generateAccessAndRefreshToken = async (userId) => {
  try {
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
      throw new Error("Missing JWT secrets in .env");
    }

    if (!userId) {
      throw new Error("Invalid userId provided for token generation");
    }

    console.log("Generating tokens for user ID:", userId);

    const accessToken = jwt.sign(
      { id: userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: userId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Ensure refresh_token column is updated properly
    const [results] = await sequelize.query(
      "UPDATE customers SET refresh_token = :refreshToken WHERE id = :userId",
      {
        replacements: { refreshToken, userId },
      }
    );

    console.log("Token update results:", results);

    if (results.affectedRows === 0) {
      throw new Error("User not found while updating refresh token");
    }

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token Generation Error:", error.message);
    throw new Error("Token generation failed");
  }
};

//  Register User
export const registerUser = asyncHandler( async (req, res) => {
  try {
  

    const { username, fullName, email, password, phone, dob } = req.body;
    if (!username || !fullName || !email || !password || !phone || !dob) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
  

    const [result] = await sequelize.query(
      `INSERT INTO customers (username, fullName, email, password, phone, dob) VALUES (:username, :fullName, :email, :password, :phone, :dob) RETURNING *`,
      {
        replacements: {
          username,
          fullName,
          email,
          password: hashedPassword,
          phone,
          dob,
        },
      }
    );

    res
      .status(201)
      .json({ message: "User registered successfully", user: result[0] });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
);

//  Login User
export const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email && !username) {
      return res.status(400).json({ message: "Email or username is required" });
    }

    //  Fetch user from DB
    const [users] = await sequelize.query(
      `SELECT * FROM customers WHERE email = :email OR username = :username`,
      {
        replacements: { email, username },
      }
    );

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];
    

    if (!user.password) {
      return res
        .status(500)
        .json({ message: "User password is missing in DB" });
    }

    //  Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if ( isPasswordCorrect) console.log("password is correct");
    

    //  Ensure userId exists
    if (!user.id) {
      return res.status(500).json({ message: "User ID missing" });
    }

    //  Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user.id
    );

    const options = {
      // cookies option
      httpOnly: true,
      secure: true,
    };
    

    res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Login successful",
        user : user,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Logout User
export const logoutUser = async (req, res) => {
  try {
    const { id } = req.body;
    await sequelize.query(
      "UPDATE customers SET refresh_token = NULL WHERE id = :id",
      {
        replacements: { id },
      }
    );

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Refresh Token
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(401).json({ message: "Unauthorized request" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const [users] = await sequelize.query(
      "SELECT * FROM customers WHERE id = :userId",
      {
        replacements: { userId: decoded.id },
      }
    );

    const user = users[0];
    if (!user || user.refresh_token !== refreshToken)
      return res.status(401).json({ message: "Invalid refresh token" });

    const newAccessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

// Fetch all customers
export const getAllCustomers = async (req, res) => {
  try {
    const [customers] = await sequelize.query("SELECT * FROM customers");
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch a customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const [customer] = await sequelize.query(
      "SELECT * FROM customers WHERE id = :id",
      {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get current user 
export const getCurrentUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from verified token

    // Fetch user details from PostgreSQL
    const [users] = await sequelize.query(
      "SELECT id, email, username FROM customers WHERE id = :userId",
      { replacements: { userId } }
    );

    const user = users[0]; // Extract the first user

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Return user data
    return res
      .status(200)
      .json({user});
  } catch (error) {
    throw new ApiError(500, error.message || "Error fetching current user");
  }
});


export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    // Check if customer exists
    const [existingCustomer] = await sequelize.query(
      "SELECT * FROM customers WHERE id = :id",
      {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!existingCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Dynamically generate SET clause for the query
    const fields = Object.keys(updatedFields)
      .map((key) => `${key} = :${key}`)
      .join(", ");

    await sequelize.query(`UPDATE customers SET ${fields} WHERE id = :id`, {
      replacements: { ...updatedFields, id },
      type: sequelize.QueryTypes.UPDATE,
    });

    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
