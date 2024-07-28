// const multer = require('multer');
// const path = require('path');

// // Define storage settings for multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads'); // Adjust the path as necessary
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
//     }
// });

// // Initialize multer with the storage settings
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 2 * 1024 * 1024 // Limit file size to 2MB
//     },
//     fileFilter: function (req, file, cb) {
//         // Only accept image files
//         const filetypes = /jpeg|jpg|png|gif/;
//         const mimetype = filetypes.test(file.mimetype);
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//         if (mimetype && extname) {
//             return cb(null, true);
//         } else {
//             cb(new Error('Only image files are allowed!'));
//         }
//     }
// }).single('profile_pic'); // The name of the file input field in the form

// module.exports = upload;


// app/helpers/fileupload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Adjust the path as necessary
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
