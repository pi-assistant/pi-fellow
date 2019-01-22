'use strict';
var os = require('os'); 
os.tmpDir = os.tmpdir;

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');
const speech = require('@google-cloud/speech');

const fs = require('fs');

const client = new speech.SpeechClient();

const record = require('node-record-lpcm16');



const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';


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
    //process.stdout.write(
      //data.results[0] && data.results[0].alternatives[0]
        //? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
        //: `\n\nReached transcription time limit, press Ctrl+C\n`
    //)
    
  //;
  const magVariants = ['hey magpie', 'a magpie', 'hey McFly','hey man cry'];
  
  function listen(arr) {
    console.log('listen called', arr);
    if(magVariants.includes(arr[0])){
      // turn on light
      console.log('turned on light');
      if(arr[1]){
        console.log('parsing');
        parsedString = arr[1].split(' ');
        console.log(parsedString);
        parsedString = [];
      }else {
        
        console.log(`arr: ${arr}`);
      }
    } 

  }
  let dataArr = [];
  let parsedString = [];
  function handleData (data){
    
     
        if(data.results[0] && data.results[0].alternatives[0]) {
          dataArr.push(data.results[0].alternatives[0].transcript.trim());
          
          listen(dataArr);
          console.log(`dataArr: ${dataArr}`);
        }
        
             
        if(dataArr.length > 1){
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
    device: 'plughw:1',
  })
  .on('error', console.error)
  .pipe(recognizeStream);

console.log('Listening, press Ctrl+C to stop.');



// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
// app.use(morgan('dev'));

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
