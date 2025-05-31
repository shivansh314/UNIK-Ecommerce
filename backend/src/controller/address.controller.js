import { sequelize } from "../db/index.js";
import { QueryTypes } from "sequelize"; 
// Add Address
export const addAddress = async (req, res) => {
  try {
    const {
      user_id,
      address_name,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      country,
    } = req.body;

    if (!user_id || !address_line1 || !city || !state || !pincode || !country || !address_name) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const [newAddress] = await sequelize.query(
      `INSERT INTO addresses (user_id,address_name , address_line1, address_line2, city, state, pincode, country)
       VALUES (:user_id, :address_name , :address_line1, :address_line2, :city, :state, :pincode, :country)
       RETURNING *`,
      {
        replacements: {
          user_id,
          address_name,
          address_line1,
          address_line2,
          city,
          state,
          pincode,
          country,
        },
        type: QueryTypes.INSERT,
      }
    );

    res
      .status(201)
      .json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Address
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { address_line1, address_line2, city, state, pincode, country } =
      req.body;

    const [updatedAddress] = await sequelize.query(
      `UPDATE addresses 
       SET address_line1 = :address_line1, address_line2 = :address_line2, 
           city = :city, state = :state, pincode = :pincode, country = :country
       WHERE id = :id RETURNING *`,
      {
        replacements: {
          id,
          address_line1,
          address_line2,
          city,
          state,
          pincode,
          country,
        },
        type: QueryTypes.UPDATE,
      }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//get address
export const getAddressByUserId = async (req, res) => {
  try {

    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }


    const addresses = await sequelize.query(
      `SELECT * FROM addresses WHERE user_id = :user_id`,
      {
        replacements: { user_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    
    if (!addresses || addresses.length === 0) {
      return res
        .status(404)
        .json({ message: "No addresses found for this user" });
    }

    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAddressbyid = async (req, res) => {
  try {
    const { user_id, address_id } = req.params;

    // Ensure at least one parameter is provided
    if (!user_id && !address_id) {
      return res
        .status(400)
        .json({ message: "User ID or Address Name is required" });
    }

    let query = "SELECT * FROM addresses WHERE";
    let replacements = {};

    // Dynamically build query based on provided parameters
    if (user_id) {
      query += " user_id = :user_id";
      replacements.user_id = user_id;
    }

    if (address_id) {
      query += user_id
        ? " AND id = :address_id"
        : " id = :address_id";
      replacements.address_id = address_id;
    }

    // Execute the query
    const addresses = await sequelize.query(query, {
      replacements,
      type: sequelize.QueryTypes.SELECT,
    });

    // If no addresses found
    if (!addresses || addresses.length === 0) {
      return res.status(404).json({ message: "No addresses found" });
    }

    // Return addresses
    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Server error" });
  }
};
