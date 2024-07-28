const express = require('express');
const router = express.Router();

router.get('/', (req, res) => 
    {
    res.send('Hello /');
    console.log('base.controller.js');
    
  })


module.exports = router;