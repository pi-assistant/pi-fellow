'use strict';

/**
 * Check Commands
 * functions to handle user commands: 'new-list' or 'add' command with data
 * @module src/check-commands
 */

const events = require('../modules/events.js');
const app = require('./app.js');
const db = require('../modules/database');
const Sound = require('node-aplay');
const magpiTweet = new Sound('./assets/baby-magpi.wav');
const magpiError = new Sound('./assets/peacock-error.wav');
const successSound = new Sound('./assets/success.wav');
const song = new Sound('./assets/song.wav');


require('./api/send-message');
require('./light-listen');

events.on('send-list', handleSend);
events.on('check-command', handleCommand);
events.on('play', playMusic);
events.on('stop', stopMusic);
events.on('tweet', playTweet);

function playTweet(){
  magpiTweet.play();
}


/**
 * @function handleCommand checks the user command for a MagPi match
 * @param {array} arr
 * @fires green-flash
 * @fires blue-off
 * @fires send-list
 */
function handleCommand(arr){
  console.log('command: ', arr[1]);
  let sendCheck = arr[1].split(' ')[0].trim();

  if(sendCheck ==='send'){
    let listType = arr[1].split(' ')[1].trim();
    events.emit('green-flash')
    events.emit('blue-off');
    events.emit('send-list', listType);
  }
  if(arr[1].trim() === 'add') {
      events.emit('blue-flash');
  }

  if(arr[1].trim() === 'play music') {
    events.emit('play');
    events.emit('green-flash');
    events.emit('blue-off');
  }
  if(arr[1]=== 'stop music'){
    events.emit('stop');
    events.emit('red-flash');
  }

  if (arr[1] === 'new list') {
    events.emit('blue-flash');
    events.emit('green-flash');
    events.emit('blue-on');
  }

}


/**
 * @function handleSend retrieves the items requested, calls the format function, and emits the message to be sent
 * @param {str} listType
 * @fires bot-message calls handleMessage in send-message.js
 * @fires green-flash 
 */
function handleSend(listType){
  if(listType === 'all' || listType === 'lists'){
    let listArr = db.getAll();
    console.log(listArr);
    listArr.forEach( list => {
    let requestedItems = db.sendList(list);
    let message = formatString(requestedItems, list);
    events.emit('bot-message', message);
    events.emit('green-flash');
    events.emit('success');
    })        
  }
  else{
    let requestedItems = db.sendList(listType);

    if(requestedItems === null){
        console.error('error');
        events.emit('red-flash');
        events.emit('error');
    }
    else{
        let message = formatString(requestedItems, listType);
        console.log(listType, message);
        events.emit('bot-message', message);
        events.emit('green-flash');
        events.emit('success');
    }
  }
}

/**
 *
 * @function formatString formats a list
 * @param {string} items
 * @param {string} listType
 * @returns {string} a string that formatted to print as a list
 */
function formatString(str, listType){
    let conjunctions = ['add', 'and', ','];
   let strArr = str.split(' ');
   const filteredStr = strArr.filter( item => {
       return !conjunctions.includes(item.trim() );
   });
   filteredStr.unshift(`Your MagPi ${listType} List: \n`);
   let myList = filteredStr.join('\n - ');
   return myList;
}

//play song function
function playMusic() {
    console.log('in play music');
      song.play();
      setTimeout(function() {
        song.pause();
      }, 10000); 
}

function stopMusic(){
    
}



module.exports = {handleCommand, formatString, handleSend}
