import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { sequelize } from "../db/index.js"; // Import your Sequelize instance

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Get access token from cookies or Authorization header
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      throw new ApiError(400, "Access token not found");
    }

    // Decode and verify the access token
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Query the user from PostgreSQL
    const [users] = await sequelize.query(
      "SELECT id, email, username FROM customers WHERE id = :userId",
      {
        replacements: { userId: decodedToken.id },
      }
    );

    const user = users[0]; // Extract the first user (if found)
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    // Attach user to request object
    req.user = user;

    // Proceed to next middleware
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

export { verifyJWT };
