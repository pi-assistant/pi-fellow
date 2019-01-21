'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');
const speech = require('@google-cloud/speech');
const fs = require('fs');

const client = new speech.SpeechClient();

const audioFile = './assets/hey-test.flac';

const file = fs.readFileSync(audioFile);
const audioBytes = file.toString('base64');

const audio = {
  content: audioBytes,
};

const config = {
  encoding: 'FLAC',
  SampleRateHertz:48000,
  languageCode: 'en-US',
};

const request = {
  audio: audio,
  config: config,
};

client 
  .recognize(request)
  .then(data =>{
    const response = data[0];
    const transcription = response.results
      .map(result=>result.alternatives[0].transcript)
      .join('\n');
    console.log(`transcript: ${transcription}`);

  })
  .catch(err => console.error('error', err));

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
