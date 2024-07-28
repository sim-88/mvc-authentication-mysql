const express = require('express');
const apiErrorsMiddleware = require('@middlewares/apiErrors.middleware');
const registerpageController = require('@controllers/web/registerpage.controller');
const loginpageController = require('@controllers/web/loginpage.controller');
const dashpageController = require("@controllers/web/dash.controller.js")
const projectsController = require('@controllers/web/projects.controller'); // Import projects controller

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // All Routes to Controller
    
    app.use('/register', registerpageController.renderRegisterPage);
    app.use('/dash', dashpageController);

    // Add new routes for project-related pages
    app.get('/projects-grid', projectsController.renderProjectsGrid);
    app.get('/projects-list', projectsController.renderProjectsList);
    app.get('/projects-overview', projectsController.renderProjectsOverview);
    app.get('/projects-create', projectsController.renderProjectsCreate);
    // Log all API thrown errors
    app.use(apiErrorsMiddleware);
};


// const baseController = require('@controllers/web/base.controller');
// const homepageController = require('@controllers/web/homepage.controller');
// const adminController = require('@controllers/web/admin.controller');

// app.use('/api/', baseController);
//     app.use('/', homepageController);
//     app.use('/admin', adminController);