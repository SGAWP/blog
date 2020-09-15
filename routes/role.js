const express = require('express');
const router = express.Router();
const controller = require('../controllers/role');
const JWT = require("../middleware/jwt");
const isRoles = require("../middleware/authRole");
const Role = require("../middleware/role");

router.get("/getAllRoles", JWT, isRoles(Role.Admin), controller.getAllRoles);

module.exports = router;