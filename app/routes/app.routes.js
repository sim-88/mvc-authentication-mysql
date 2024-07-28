const express = require('express');

const viewErrorsMiddleware = require('@middlewares/viewErrors.middleware');
const registrationController = require('@controllers/app/registration.controller.js')
const upload = require('@helpers/fileUpload');
const loginController = require('@controllers/app/login.controller.js') 
// const dashController = require("@controllers/app/dash.controller.js")
const logoutController = require("@controllers/app/logout.controller.js")
const authMiddleware = require('@middlewares/auth.middleware.js');

module.exports = function (app) {
  app.use(express.json());
  
  // app.use('/api/register', registrationController)
  app.post('/api/register', upload.single('profile_pic'), registrationController.register);
  app.post('/api/login', loginController );
  // app.use('/api/logout', logoutController );
  app.post('/api/logout', authMiddleware, logoutController);

  // app.use("/api/dash", dashController);
  //Log all thrown errors
  app.use(viewErrorsMiddleware);

}

// const baseController = require('@controllers/app/base.controller');
// const testController = require('@controllers/app/test.controller');
// const test2Controller = require('@controllers/app/test2.controller');
// app.use('/admin/', baseController)
//   app.use('/admin/test', testController)
//   app.use('/admin/test2', test2Controller)