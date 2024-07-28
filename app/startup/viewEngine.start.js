const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const path=require('path');
module.exports = function (app) {
    app.use(expressLayouts);
    app.set("view engine", "ejs");
    app.set('views','./app/views');
    // app.use(express.static(path.join(__dirname, 'public')));
    app.set('layout', 'layouts/layout');
    app.get('/',(req,res) => {
        res.render('./layouts/login',{layout:'./layouts/login'})
    })
}

// app.get('/admin',(req,res) => {
    //   res.render('dashboard');
    // }
    // )