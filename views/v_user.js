module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("v_users", {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        username: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: false
        },
        roles_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        role_name: {
            type: Sequelize.STRING(100),
            allowNull: false
        }
    });
    return User;
};