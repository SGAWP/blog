const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/env");
const errorHandler = require("../utils/errorHandler");
const db = require("../config/db.config.js");
const User = db.users;
const Role = db.roles;

module.exports.signIn = async function (req, res) {
    const query = {
        where: {
            username: req.body.username
        },
        include: [
            {
                model: Role,
                required: true
            }
        ]
    };
    const user = await User.findOne(query);
    if (user) {
        const passwordResult = bcrypt.compareSync(req.body.password, user.password);
        if (passwordResult) {
            const token = jwt.sign({
                user_id: user.user_id,
                role_name: user.role.role_name
            }, config.jwt_key, {
                expiresIn: "5h",
            });
            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            res.status(401).json({
                message:
                    "You have entered the wrong password."
            });
        }
    } else {
        res.status(404).json({
            message:
                "The username you entered doesn't belong to an account. Please check your username and try again."
        });
    }
};

module.exports.signUp = async function (req, res) {
    const username = await User.findOne({
        where: {
            username: req.body.username
        }
    });
    if (username) {
        res.status(409).json({
            message:
                'Sorry, the username you entered is already taken.'
        });
    } else {
        const salt = await bcrypt.genSaltSync(10);
        const password = await req.body.password;
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: bcrypt.hashSync(password, salt),
            roles_id: 2
        });
        try {
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            errorHandler(res, error);
        }
    }
};

function generatePassword() {
    var length = 30,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};

module.exports.resetPassword = async function (req, res) {
    const query = {
        where: {
            email: req.body.email
        }
    };
    const user = await User.findOne(query);
    if (user) {
        const salt = await bcrypt.genSaltSync(10);
        const password = await generatePassword();
        await User.update(
            {
                password: bcrypt.hashSync(password, salt)
            },
            {
                where: {
                    email: user.email
                }
            }
        );
        res.status(200).json({password: password});
    } else {
        res.status(404).json({
            message:
                "The email you entered does not exist."
        });
    }
};