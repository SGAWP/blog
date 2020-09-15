const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const upload = require('../middleware/upload');
const JWT = require("../middleware/jwt");
const isRoles = require("../middleware/authRole");
const Role = require("../middleware/role");

router.get("/getAllUsers", JWT, isRoles(Role.Admin), controller.getAllUsers);
router.get("/getProfile", JWT, controller.getProfile);
router.patch("/editRole/:user_id", JWT, isRoles(Role.Admin), controller.editRole);
router.patch("/changeEmail", JWT, controller.changeEmail);
router.patch("/avatar", JWT, upload.single('avatar'), controller.avatar);
router.patch("/changePassword/:user_id", JWT, isRoles(Role.Admin), controller.changePassword);
router.patch("/resetPassword", JWT, controller.resetPassword);
router.delete("/delete/:user_id", JWT, isRoles(Role.Admin), controller.delete);

module.exports = router;