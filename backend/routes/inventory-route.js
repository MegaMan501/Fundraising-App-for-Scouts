const express = require("express");
const InventoryController = require("../controllers/inventory-controller");

const router = express.Router();

router.get("/getAllProducts", InventoryController.getAllProducts);

module.exports = router;