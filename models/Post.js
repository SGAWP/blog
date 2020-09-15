module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        post_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        content: {
            type: Sequelize.STRING(9999),
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ''
        }
    }, {
        indexes: [
            {
                unique: true, fields: ['title', 'users_id', 'categories_id']
            }
        ]
    });
    return Post;
};