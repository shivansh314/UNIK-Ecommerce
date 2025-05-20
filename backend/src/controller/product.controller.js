import { sequelize } from "../db/index.js";

// ✅ Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const [products] = await sequelize.query(
      "SELECT * FROM products ORDER BY name ASC"
    );
    res.json(products);
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};


// ✅ Get Products by Filters (Category, Cost, Color, Material)
export const getFilteredProducts = async (req, res) => {
  const { category, min_cost, max_cost, color, material , gender } = req.query;

  let query = "SELECT * FROM products WHERE 1=1";
  let replacements = {};

  if (category) {
    query += " AND name ILIKE :category";
    replacements.category = `%${category}%`;
  }
  if (min_cost) {
    query += " AND cost >= :min_cost";
    replacements.min_cost = min_cost;
  }
  if (max_cost) {
    query += " AND cost <= :max_cost";
    replacements.max_cost = max_cost;
  }
  if (color) {
    query += " AND color ILIKE :color";
    replacements.color = `%${color}%`;
  }
  if (material) {
    query += " AND material ILIKE :material";
    replacements.material = `%${material}%`;
  }
  if (gender) {
    query += " AND gender = :gender";
    replacements.gender = gender;
  }

  try {
    const [products] = await sequelize.query(query, { replacements });
    res.json(products);
  } catch (error) {
    console.error("Get filtered products error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ Get Product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const [product] = await sequelize.query(
      "SELECT * FROM products WHERE id = :id",
      { replacements: { id } }
    );

    if (product.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product[0]);
  } catch (error) {
    console.error("Get product by ID error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
