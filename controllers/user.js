const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/errorHandler");
const Sequelize = require("sequelize");
const db = require("../config/db.config.js");
const User = db.users;
const v_user = db.v_users;
const Op = Sequelize.Op;

module.exports.getAllUsers = async function (req, res) {
    const query = {
        where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        {
                            username: {
                                [Op.iLike]: `%${req.query.search}%`
                            }
                        },
                        {
                            email: {
                                [Op.iLike]: `%${req.query.search}%`
                            }
                        },
                        {
                            role_name: {
                                [Op.iLike]: `%${req.query.search}%`
                            }
                        }
                    ]
                },
                Sequelize.where(
                    Sequelize.cast(Sequelize.col('createdAt'), 'varchar'),
                    {
                        [Op.like]: `%${req.query.date}%`
                    }
                )
            ]
        },
        order: [
            [req.query.sort, req.query.order]
        ],
        offset: +req.query.pageSize * (+req.query.page - 1),
        limit: +req.query.pageSize
    };
    try {
        const users = await v_user.findAndCountAll(query);
        res.status(200).json(users);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getProfile = async function (req, res) {
    try {
        const user = await v_user.findByPk(req.decoded.user_id);
        res.status(200).json(user);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.editRole = async function (req, res) {
    const query = {
        where: {
            user_id: req.params.user_id
        }
    };
    let role = {
        roles_id: req.body.roles_id
    };
    try {
        let user = await User.findOne(query);
        if (user._previousDataValues.username === 'admin') {
            res.status(403).json({
                message: "Forbidden."
            });
        } else {
            await User.update(role, query);
            res.status(200).json(role);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.changeEmail = async function (req, res) {
    try {
        const user = await User.update(
            {
                email: req.body.email
            },
            {
                where: {
                    user_id: req.decoded.user_id
                }
            }
        );
        res.status(200).json(user);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.avatar = async function (req, res) {
    try {
        const user = await User.update(
            {
                avatar: req.file ? req.file.path : ''
            },
            {
                where: {
                    user_id: req.decoded.user_id
                }
            }
        );
        res.status(200).json(user);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.changePassword = async function (req, res) {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const password = await req.body.password;
        const user = await User.update(
            {
                password: bcrypt.hashSync(password, salt)
            },
            {
                where: {
                    user_id: req.params.user_id
                }
            }
        );
        res.status(200).json(user);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.resetPassword = async function (req, res) {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const password = await req.body.password;
        const user = await User.update(
            {
                password: bcrypt.hashSync(password, salt)
            },
            {
                where: {
                    user_id: req.decoded.user_id
                }
            }
        );
        res.status(200).json(user);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async function (req, res) {
    const query = {
        where: {
            user_id: req.params.user_id
        }
    };
    try {
        let user = await User.findOne(query);
        if (user._previousDataValues.username === 'admin') {
            res.status(403).json({
                message: "You cannot delete this user."
            });
        } else {
            await User.destroy(query);
            res.status(200).json({
                message: "User deleted."
            });
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
