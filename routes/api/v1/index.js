/*
const express = require("express");
var router = express.Router();
const userController = require("../../../src/controllers/userController");
const categoryController = require("../../../src/controllers/categoryController");
const productController = require("../../../src/controllers/productController");
const orderController = require("../../../src/controllers/orderController");

router.post("/user/login", userController.login);
router.post("/user/signup", userController.signup);
router.post("/user/vendor/details", userController.getVendorDetails);
router.post("/user/vendor/payments", userController.getVendorPayments);
router.post("/category/all", categoryController.listCategories);
router.post("/product/all", productController.listProducts);
router.post("/product/add", productController.addProduct);
router.post("/product/details", productController.getProductDetails);
router.post("/order/add", orderController.createOrder);
router.post("/order/details", orderController.getOrderDetails);
router.post("/order/edit", orderController.editOrder);

module.exports = router;
*/

// My Code
const express = require("express");
const categoryController = require("../../../src/controllers/categoryController");
const productController = require("../../../src/controllers/productController");
const orderController = require("../../../src/controllers/orderController");
const userController = require("../../../src/controllers/userController");

var router = express.Router();

router.get("/category/all", categoryController.listCategories);
router.post("/orders/details", orderController.getOrderDetails);
router.post("/product/add", userController.isAuthenticated, productController.addProduct);
router.post("/product/list", productController.listProducts);
// router.post("/user/signup", userController.signupUser);
// router.post("/user/login", userController.loginUser);
router.post("/user/signup", userController.strongSignup);
router.post("/user/login", userController.strongLogin);
router.post("/orders/add", orderController.createOrder);


module.exports = router;