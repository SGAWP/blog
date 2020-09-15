const express = require('express');
const router = express.Router();
const controller = require('../controllers/post');
const upload = require('../middleware/upload');
const JWT = require("../middleware/jwt");

router.get("/getAllPosts", JWT, controller.getAllPosts);
router.get("/getUserPosts", JWT, controller.getUserPosts);
router.get("/getPostById/:post_id", JWT, controller.getPostById);
router.get("/getAllPostsCategories", JWT, controller.getAllPostsCategories);
router.post("/add", JWT, upload.single('image'), controller.add);
router.patch("/update/:post_id", JWT, upload.single('image'), controller.update);
router.delete("/delete/:post_id", JWT,  controller.delete);

module.exports = router;