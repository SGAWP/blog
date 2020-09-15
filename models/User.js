module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING(200),
            allowNull: false,
            unique: true
        },
        username: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ''
        }
    });
    return User;
};