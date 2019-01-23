'use strict';


// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const speech = require('@google-cloud/speech');
const fs = require('fs');

const client = new speech.SpeechClient();
const record = require('node-record-lpcm16');

const events = require('../modules/events.js');
require('./check-data.js');
require('./check-command.js');
require('./light-listen');

// const morgan = require('morgan');

// const blinker = require('./util/led.js');

// const Gpio = require('onoff').Gpio;

// const blueLED = new Gpio(4,'out');
// const redLED = new Gpio(16,'out');
// const greenLED = new Gpio(23, 'out');


const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';


let dataArr = [];
let parsedString = [];


const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  interimResults: false, // If you want interim results, set this to true
};

// Create a recognize stream
const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', handleData)
  const magVariants = ['hey magpie', 'a magpie', 'hey McFly','hey man cry', 'play magpie', 'play Mac Dre'];
  
  function listen(arr) {
    if(magVariants.includes(arr[0])){
      events.emit('blue-on');

      if(arr[1]){
        events.emit('check-command', arr);
        events.emit('blue-flash');
        events.emit('blue-on');
        if(arr[2]){
          events.emit('check-data', arr);
          console.log(`dataArr: ${dataArr}`);
          events.emit('green-flash');
        }
        
      if(arr[1]){
        console.log('parsing');
        parsedString = arr[1].split(' ');
        console.log(parsedString);
        parsedString = [];
        events.emit('blue-off');
        

      }else {
        console.log(`arr: ${arr}`);
      }
    } 
  }
}


  function handleData (data){
        if(data.results[0] && data.results[0].alternatives[0]) {
          dataArr.push(data.results[0].alternatives[0].transcript.trim());       
          listen(dataArr);
        }
        
        events.on('send-list', ()=>{
          dataArr=[];
        })
                 
        if(dataArr.length > 2){
          dataArr = [];
        }
          
        if(!magVariants.includes(dataArr[0]) ) {
          dataArr = [];
          }
        
  }
  

// Start recording and send the microphone input to the Speech API
record
  .start({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sudo apt"
    silence: '10.0',
    // device: 'plughw:1',
  })
  .on('error', console.error)
  .pipe(recognizeStream);

console.log('Listening, press Ctrl+C to stop.');



// Prepare the express app
const app = express();

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
  },
};
