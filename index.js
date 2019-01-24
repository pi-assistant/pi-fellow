'use strict';

require('dotenv').config();


// Start the web server
require('./src/app.js').start(process.env.PORT);

// setTimeout( () =>{
//   process.exit(0);
// }, 5000);
