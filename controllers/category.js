const errorHandler = require("../utils/errorHandler");
const Sequelize = require("sequelize");
const db = require("../config/db.config.js");
const Category = db.categories;
const Op = Sequelize.Op;

module.exports.getAllSprCategories = async function (req, res) {
    const query = {
        where: {
            category_name: {
                [Op.iLike]: `%${req.query.search}%`
            }
        },
        order: [
            [req.query.sort, req.query.order]
        ],
        offset: +req.query.pageSize * (+req.query.page - 1),
        limit: +req.query.pageSize
    };
    try {
        const categories = await Category.findAndCountAll(query);
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getSelectCategories = async function (req, res) {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, e);
    }
};


module.exports.getAllCategories = async function (req, res) {
    const query = {
        where: {
            category_name: {
                [Op.iLike]: `%${req.query.search}%`
            }
        },
        order: [
            ["category_name", "asc"]
        ],
        offset: +req.query.pageSize * (+req.query.page - 1),
        limit: +req.query.pageSize
    };
    try {
        const categories = await Category.findAndCountAll(query);
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getCategoryById = async function (req, res) {
    try {
        const query = {
            where: {
                category_id: req.params.category_id
            }
        };
        const category = await Category.findOne(query);
        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.add = async function (req, res) {
    const category = await new Category({
        category_name: req.body.category_name
    });
    try {
        await category.save();
        res.status(201).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        const category = await Category.update({
            category_name: req.body.category_name
        }, {
            where: {
                category_id: req.params.category_id
            }
        });
        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async function (req, res) {
    try {
        await Category.destroy({
            where: {
                category_id: req.params.category_id
            }
        });
        res.status(200).json({
            message: "Category deleted."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

