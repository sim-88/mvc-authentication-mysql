const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware');

router.get('/', authMiddleware('admin:get'), (req, res) => {
    res.render('web/admin', { user: req.user });
});

module.exports = router;
