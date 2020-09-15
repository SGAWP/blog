const errorHandler = require("../utils/errorHandler");
const Sequelize = require("sequelize");
const db = require("../config/db.config.js");
const Post = db.posts;
const Category = db.categories;
const User = db.users;
const Op = Sequelize.Op;

module.exports.getAllPosts = async function (req, res) {
    const query = {
        where: {
            [Op.or]: [
                {
                    title: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                },
                {
                    description: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                },
                {
                    content: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                },
                Sequelize.where(Sequelize.col((Category, "category_name"), "varchar"), {
                    [Op.iLike]: `%${req.query.search}%`
                }),
                Sequelize.where(Sequelize.col((User, "username"), "varchar"), {
                    [Op.iLike]: `%${req.query.search}%`
                })
            ]
        },
        include: [
            {
                model: User,
                required: true
            },
            {
                model: Category,
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
        const posts = await Post.findAndCountAll(query);
        res.status(200).json(posts);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getUserPosts = async function (req, res) {
    const query = {
        where: {
            users_id: req.decoded.user_id,
            [Op.or]: [
                {
                    title: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                },
                {
                    description: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                },
                {
                    content: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                },
                Sequelize.where(Sequelize.col((Category, "category_name"), "varchar"), {
                    [Op.iLike]: `%${req.query.search}%`
                })
            ]
        },
        include: [
            {
                model: Category,
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
        const posts = await Post.findAndCountAll(query);
        res.status(200).json(posts);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getAllPostsCategories = async function (req, res) {
    const query = {
        where: {
            categories_id: req.query.categories_id,
            [Op.or]: [
                {
                    title: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                },
                {
                    description: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                },
                {
                    content: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                },
                Sequelize.where(Sequelize.col((User, "username"), "varchar"), {
                    [Op.iLike]: `%${req.query.search}%`
                })
            ]
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
        const posts = await Post.findAndCountAll(query);
        res.status(200).json(posts);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getPostById = async function (req, res) {
    try {
        const query = {
            where: {
                post_id: req.params.post_id
            },
            include: [
                {
                    model: User,
                    required: true
                },
                {
                    model: Category,
                    required: true
                }
            ]
        }
        const post = await Post.findOne(query);
        res.status(200).json(post);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.add = async function (req, res) {
    const post = await new Post({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        categories_id: req.body.categories_id,
        image: req.file ? req.file.path : '',
        users_id: req.decoded.user_id
    });
    try {
        await post.save();
        res.status(201).json(post);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        const post = await Post.update({
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            categories_id: req.body.categories_id
        }, {
            where: {
                post_id: req.params.post_id
            }
        });
        res.status(200).json(post);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async function (req, res) {
    try {
        await Post.destroy({
            where: {
                post_id: req.params.post_id,
                users_id: req.decoded.user_id
            }
        });
        res.status(200).json({
            message: "Post deleted."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

