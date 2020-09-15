const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        if (req.baseUrl == '/api/users') {
            cb(null, 'uploads/avatars/');
        } else if (req.baseUrl == '/api/posts') {
            cb(null, 'uploads/posts/');
        }
    },
    filename(req, file, cb) {
        cb(null, `${moment().format('DDMMYYYY-HHmmss_SSS')}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});