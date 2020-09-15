const errorHandler = require("../utils/errorHandler");
const Sequelize = require("sequelize");
const db = require("../config/db.config.js");
const Bookmark = db.bookmarks;
const Post = db.posts;
const Category = db.categories;
const Op = Sequelize.Op;

module.exports.getAllBookmarks = async function (req, res) {
    try {
        const query = {
            where: {
                users_id: req.decoded.user_id,
                [Op.or]: [
                    Sequelize.where(Sequelize.col((Post, "title"), "varchar"), {
                        [Op.iLike]: `%${req.query.search}%`
                    }),
                    Sequelize.where(Sequelize.col((Post, "description"), "varchar"), {
                        [Op.iLike]: `%${req.query.search}%`
                    }),
                    Sequelize.where(Sequelize.col((Post, "content"), "varchar"), {
                        [Op.iLike]: `%${req.query.search}%`
                    }),
                    Sequelize.where(Sequelize.col((Category, "category_name"), "varchar"), {
                        [Op.iLike]: `%${req.query.search}%`
                    })
                ]
            },
            include: [
                {
                    model: Post,
                    required: true,
                    include: [
                        {
                            model: Category,
                            required: true
                        }
                    ]
                }
            ],
            order: [
                [Post, "createdAt", "desc"]
            ],
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize
        };
        const bookmarks = await Bookmark.findAndCountAll(query);
        res.status(200).json(bookmarks);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getBookmarkByPostsIdAndUsersId = async function (req, res) {
    try {
        const query = {
            where: {
                posts_id: req.query.posts_id,
                users_id: req.decoded.user_id
            }
        };
        const bookmark = await Bookmark.findOne(query);
        res.status(200).json(bookmark);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.add = async function (req, res) {
    const bookmark = await new Bookmark({
        posts_id: req.body.posts_id,
        users_id: req.decoded.user_id
    });
    try {
        await bookmark.save();
        res.status(201).json(bookmark);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async function (req, res) {
    try {
        await Bookmark.destroy({
            where: {
                bookmark_id: req.params.bookmark_id
            }
        });
        res.status(200).json({
            message: "Bookmark deleted."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};


