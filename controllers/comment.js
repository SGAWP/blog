const errorHandler = require("../utils/errorHandler");
const db = require("../config/db.config.js");
const Comment = db.comments;
const User = db.users;

module.exports.getAllComments = async function (req, res) {
    const query = {
        where: {
            posts_id: req.query.posts_id,
        },
        include: [
            {
                model: User,
                required: true
            }
        ],
        order: [
            ["createdAt", "desc"]
        ],
        offset: +req.query.pageSize * (+req.query.page - 1),
        limit: +req.query.pageSize
    };
    try {
        const comments = await Comment.findAndCountAll(query);
        res.status(200).json(comments);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.add = async function (req, res) {
    const comment = await new Comment({
        comment: req.body.comment,
        posts_id: req.body.posts_id,
        users_id: req.decoded.user_id
    });
    try {
        await comment.save();
        res.status(201).json(comment);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async function (req, res) {
    try {
        await Comment.destroy({
            where: {
                comment_id: req.params.comment_id,
                users_id: req.decoded.user_id
            }
        });
        res.status(200).json({
            message: "Comment deleted."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

