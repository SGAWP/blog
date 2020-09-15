const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookmark');
const JWT = require("../middleware/jwt");

router.get("/getAllBookmarks", JWT, controller.getAllBookmarks);
router.get("/getBookmarkByPostsIdAndUsersId", JWT, controller.getBookmarkByPostsIdAndUsersId);
router.post("/add", JWT, controller.add);
router.delete("/delete/:bookmark_id", JWT, controller.delete);

module.exports = router;