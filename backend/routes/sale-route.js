const express = require("express");
const checkAuth = require("../middleware/checkauth");
const SaleController = require("../controllers/sale-controller");

const router = express.Router();

//create
router.post("/add-sale", checkAuth, SaleController.addSale);

//read
router.get("/get-sales", checkAuth, SaleController.getSales);
router.get("/group-sales", checkAuth, SaleController.getGroupSales);

//update
router.put("/update-sale/", checkAuth, SaleController.updateSale);

//delete
router.delete("/delete-sale/:id", checkAuth, SaleController.deleteSale);

module.exports = router;