const path = require('path');

// Render Projects Grid
exports.renderProjectsGrid = (req, res) => {
    res.render('projects-grid', {
        layout: 'layouts/layout',
        css_page: '',
        js_page: ''
    });
};

// Render Projects List
exports.renderProjectsList = (req, res) => {
    res.render('projects-list', {
        layout: 'layouts/layout',
        css_page: ''
    });
};

// Render Project Overview
exports.renderProjectsOverview = (req, res) => {
    res.render('projects-overview', {
        layout: 'layouts/layout',
        css_page: '',
        js_page: ''
    });
};

// Render Create New Project
exports.renderProjectsCreate = (req, res) => {
    res.render('projects-create', {
        layout: 'layouts/layout',
        css_page: '',
        js_page: ''
    });
};

