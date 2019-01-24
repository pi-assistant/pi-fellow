'use strict';

const events = require('../modules/events.js');
const app = require('./app.js');
const db = require('../modules/database');
const Sound = require('node-aplay');
const music = new Sound('../assets/testingfile.wav');
require('../modules/send-message');
require('./light-listen');

events.on('check-command', handleCommand);

function handleCommand(arr){
  console.log('command: ', arr[1]);
  let sendCheck = arr[1].split(' ')[0].trim();
  if(sendCheck ==='send'){
    let listType = arr[1].split(' ')[1].trim();
    events.emit('green-flash')
    events.emit('blue-off');
    events.emit('send-list', listType);
  }
  if(arr[1].trim() === 'play music'){
    events.emit('play')
  }
}

events.on('send-list', handleSend);

function handleSend(listType){
  if(listType === 'list'){
    return 'all lists';
    // ???? What does this do?
  }
  else if(listType === 'all'){
    //get array of all lists
    let listArr = db.getAll();
    console.log(listArr);
    listArr.forEach( list => {
    let message = db.sendList(list);
    events.emit('bot-message', message);
    events.emit('green-flash');
    return;
    })        
  }
  else{
    let message = db.sendList(listType);
    console.log(listType, message);
    events.emit('bot-message', message);
  }
}

events.on('play', playMusic);

function playMusic() {
  console.log('in play music');
  music.play();
}

