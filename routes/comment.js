const express = require('express');
const router = express.Router();
const controller = require('../controllers/comment');
const JWT = require("../middleware/jwt");

router.get("/getAllComments", JWT, controller.getAllComments);
router.post("/add", JWT, controller.add);
router.delete("/delete/:comment_id", JWT, controller.delete);

module.exports = router;