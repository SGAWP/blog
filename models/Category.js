module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categories", {
        category_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
        }
    }, {
        timestamps: false
    });
    return Category;
};