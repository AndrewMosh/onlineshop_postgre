const express = require("express");
const router = express.Router();
const { Sequelize, DataTypes } = require("sequelize");

// Replace the connection details with your PostgreSQL database configuration
const sequelize = new Sequelize("bd name", "username", "password", {
  host: "localhost",
  dialect: "postgres",
});

// Define the Product model
const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
})();

// GET all products
router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET a single product by ID
router.get("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new product
router.post("/api/products", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = await Product.create({ name, description, price });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT (Update) a product by ID
router.put("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price } = req.body;
    const [updatedCount, updatedProduct] = await Product.update(
      { name, description, price },
      { where: { id: productId }, returning: true }
    );
    if (updatedCount > 0) {
      res.status(200).json(updatedProduct[0]);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a product by ID
router.delete("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.destroy({ where: { id: productId } });
    if (deletedProduct > 0) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
