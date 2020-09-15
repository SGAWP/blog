const express = require('express');
const router = express.Router();
const controller = require('../controllers/category');
const JWT = require("../middleware/jwt");
const isRoles = require("../middleware/authRole");
const Role = require("../middleware/role");

router.get("/getAllSprCategories", JWT, isRoles(Role.Admin), controller.getAllSprCategories);
router.get("/getAllCategories", JWT, controller.getAllCategories);
router.get("/getSelectCategories", JWT, controller.getSelectCategories);
router.get("/getCategoryById/:category_id", JWT, controller.getCategoryById);
router.post("/add", JWT, isRoles(Role.Admin), controller.add);
router.patch("/update/:category_id", JWT, isRoles(Role.Admin), controller.update);
router.delete("/delete/:category_id", JWT, isRoles(Role.Admin), controller.delete);

module.exports = router;