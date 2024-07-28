
require('dotenv').config();
require('module-alias/register');//Needed for @ in path
const  path = require('path');
//Init Startup Debuger
const debugStartUp = require('debug')('app:startup');
const pool = require('@helpers/db.connect');

//Init Express App
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();


//Init Startup Error Logger
require('@startup/errorLog.start')(process);
//Starting View Engine
require('@startup/viewEngine.start')(app);

// app.set("view engine", "ejs");
// app.set('views', path.join(__dirname, './app/views'));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
//Init all Databases Here



//Simulate an Uncaught Error code
//throw new Error('Thrown Error');

//Simulate an Unhandled Error code
// const p = Promise.reject(new Error('Thrown Rejected Promise Error'));
// p.then(()=> console.log('done'));



//All Routes //./app/routes/
require('@routes/web.routes')(app);
require('@routes/app.routes')(app);




//Define Important Const / Var / Let
const port = process.env.PORT || 3000;
//App Listen Code
app.listen(port, () => {
  debugStartUp(`Node app Started`);
  console.log(`Node app listening on port ${port}`);
})