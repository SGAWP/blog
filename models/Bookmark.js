module.exports = (sequelize, Sequelize) => {
    const Bookmark = sequelize.define("bookmarks", {
        bookmark_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        timestamps: false,
        indexes: [
            {
                unique: true, fields: ['posts_id', 'users_id']
            }
        ]
    });
    return Bookmark;
};