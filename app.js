const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db.config');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');
const categoryRoutes = require('./routes/category');
const postRoutes = require('./routes/post');
const bookmarkRoutes = require('./routes/bookmark');
const commentRoutes = require('./routes/comment');

db.sequelize.sync().then(() => {
    console.log('PostgreSQL Database connected.');
});

const app = express();

app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;