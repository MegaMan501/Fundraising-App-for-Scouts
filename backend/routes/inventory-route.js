const express = require("express");
const checkAuth = require("../middleware/checkauth");
const InventoryController = require("../controllers/inventory-controller");

const router = express.Router();

// router.get("/getAllProducts", InventoryController.getAllProducts);
// router.get("/getGroupProducts", InventoryController.getGroupProducts);
// router.post("/updateProduct", InventoryController.updateProduct);
// router.post("/addProduct", InventoryController.addProduct);
// router.post("/deleteProduct", InventoryController.deleteProduct);

// Get Path
router.get("/products", checkAuth, InventoryController.getProducts);    // all products
router.get("/products/:id", checkAuth, InventoryController.getProduct); // one product

// Update Path
router.put("/products/:id", checkAuth, InventoryController.updateProduct); 

// Add Path
router.post("/products-add", checkAuth, InventoryController.addProduct);

// Delete Path
router.delete("/products/:id", checkAuth, InventoryController.deleteProduct);

module.exports = router;