const express = require('express');
const router = express.Router();
const authMiddleware = require('@middlewares/auth.middleware');


router.use(authMiddleware);
router.get('/',(req, res) => {
    res.render('dash', {
      layout: 'layouts/layout',
      css_page: '',
      js_page: ''
    });
  });

module.exports=router;