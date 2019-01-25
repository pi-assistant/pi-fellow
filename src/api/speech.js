'use strict';

const speech = require('@google-cloud/speech');

let client = new speech.SpeechClient();
const record = require('node-record-lpcm16');

const events = require('../../modules/events.js');
require('../check-data.js');
require('../check-command.js');
require('../light-listen');


const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';


let dataArr = [];
let parsedString = [];
const magVariants = ['hey magpie', 'a magpie', 'hey McFly','hey man cry', 'play magpie', 'play Mac Dre', 'hey Meg big fat guy', 'magpie'];

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  interimResults: false, 
};

const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', handleData);

/**
 * @function listen listens for user input and emits 
 * @fires blue-on when user says 'MagPi'
 * @fires 'blue-flash'
 * @param {*} arr
 */
function listen(arr) {
  if(magVariants.includes(arr[0])){
    if(arr.length === 1){
      events.emit('blue-on');
      events.emit('tweet');
      events.emit('tweet');
    }
    if(arr[1]){
      if(arr.length === 2){
      events.emit('check-command', arr);
      events.emit('blue-flash');
      }
    if(arr[2]) {
      events.emit('blue-flash');
      events.emit('blue-on');
    }
    if(arr[3]){
      events.emit('check-data', arr);
    }
    } 
  }
}


/**
 * @function handleData empties the array appropriatly as user continues to give input
 * @param {*} data
 */
function handleData (data){
  if(data.results[0] && data.results[0].alternatives[0]) {
    dataArr.push(data.results[0].alternatives[0].transcript.trim());       
    listen(dataArr);
  }

  events.on('send-list', ()=>{
    dataArr=[];
  })
            
  if(dataArr.length > 3){
    dataArr = [];
    events.emit('blue-off');
  }
    
  if(!magVariants.includes(dataArr[0]) ) {
    dataArr = [];
    events.emit('blue-off');
  }
}
  

// Start recording and send the microphone input to the Speech API
record
.start({
  sampleRateHertz: sampleRateHertz,
  threshold: 0,
  verbose: false,
  recordProgram: 'rec', // Try also "arecord" or "sudo apt"
  silence: '10.0',
  device: 'plughw:1',
})
.on('error', console.error)
.pipe(recognizeStream);

console.log('Listening, press Ctrl+C to stop.');


