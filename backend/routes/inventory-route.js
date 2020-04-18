const express = require("express");
const InventoryController = require("../controllers/inventory-controller");

const router = express.Router();

router.get("/getAllProducts", InventoryController.getAllProducts);
router.get("/getGroupProducts", InventoryController.getGroupProducts);
router.post("/updateProduct", InventoryController.updateProduct);
router.post("/addProduct", InventoryController.addProduct);
router.post("/deleteProduct", InventoryController.deleteProduct);

module.exports = router;