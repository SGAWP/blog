const env = require('./env.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models

db.bookmarks = require('../models/Bookmark')(sequelize, Sequelize);
db.categories = require('../models/Category')(sequelize, Sequelize);
db.comments = require('../models/Comment')(sequelize, Sequelize);
db.posts = require('../models/Post')(sequelize, Sequelize);
db.roles = require('../models/Role')(sequelize, Sequelize);
db.users = require('../models/User')(sequelize, Sequelize);

// Associations

db.categories.hasMany(db.posts, { foreignKey: { name: 'categories_id', allowNull: false }, onDelete: 'restrict' });
db.posts.belongsTo(db.categories, { foreignKey: { name: 'categories_id', allowNull: false }, onDelete: 'restrict' });

db.posts.hasMany(db.comments, { foreignKey: { name: 'posts_id', allowNull: false }, onDelete: 'restrict' });
db.comments.belongsTo(db.posts, { foreignKey: { name: 'posts_id', allowNull: false }, onDelete: 'restrict' });

db.posts.hasMany(db.bookmarks, { foreignKey: { name: 'posts_id', allowNull: false }, onDelete: 'restrict' });
db.bookmarks.belongsTo(db.posts, { foreignKey: { name: 'posts_id', allowNull: false }, onDelete: 'restrict' });

db.users.hasMany(db.bookmarks, { foreignKey: { name: 'users_id', allowNull: false }, onDelete: 'restrict' });
db.bookmarks.belongsTo(db.users, { foreignKey: { name: 'users_id', allowNull: false }, onDelete: 'restrict' });

db.users.hasMany(db.comments, { foreignKey: { name: 'users_id', allowNull: false }, onDelete: 'restrict' });
db.comments.belongsTo(db.users, { foreignKey: { name: 'users_id', allowNull: false }, onDelete: 'restrict' });

db.users.hasMany(db.posts, { foreignKey: { name: 'users_id', allowNull: false }, onDelete: 'restrict' });
db.posts.belongsTo(db.users, { foreignKey: { name: 'users_id', allowNull: false }, onDelete: 'restrict' });

db.roles.hasMany(db.users, { foreignKey: { name: 'roles_id', allowNull: false }, onDelete: 'restrict' });
db.users.belongsTo(db.roles, { foreignKey: { name: 'roles_id', allowNull: false }, onDelete: 'restrict' });

// Views

db.v_users = require('../views/v_user')(sequelize, Sequelize);

module.exports = db;