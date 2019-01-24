'use strict';

/**
 * App
 * exports the server start command and loads middleware
 * @module src/app
 */

// 3rd Party Resources
const express = require('express');
const cors = require('cors');


// App Level MW
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


let isRunning = false;

module.exports = {
  server: app,
  start: (port) => {
    if( ! isRunning ) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server Up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  }
};