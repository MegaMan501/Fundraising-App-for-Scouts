const express = require("express");
const SaleController = require("../controllers/sale-controller");

const router = express.Router();

router.post("/addSale", SaleController.addSale); 

module.exports = router;