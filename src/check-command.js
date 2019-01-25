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
const mapgiTweet = new Sound('../assets/baby-magpi.wav');
const magpiError = new Sound('../assets/peacock-error.wav');
const song = new Sound('../assets/song.wav');


require('./api/send-message');
require('./light-listen');

events.on('send-list', handleSend);
events.on('check-command', handleCommand);
events.on('play', playMusic);


/**
 * @function handleCommand checks the user command for a MagPi match
 * @param {array} arr
 * @fires green-flash
 * @fires blue-off
 * @fires send-list
 */
function handleCommand(arr){
  let sendCheck = arr[1].split(' ')[0].trim();

  if(sendCheck ==='send'){
    console.log('send');
    let listType = arr[1].split(' ')[1].trim();
    events.emit('green-flash')
    events.emit('blue-off');
    events.emit('send-list', listType);  
  }

  if(arr[1].trim() === 'play music') {
    console.log('play music');
    events.emit('play');
    events.emit('green-flash');
  }


  if (arr[1] === 'new list') {
    console.log('new list');
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
    console.log('all');
    let listArr = db.getAll();
    listArr.forEach( list => {
    let requestedItems = db.sendList(list);
    let message = formatString(requestedItems, list);
    events.emit('bot-message', message);
    events.emit('green-flash');
    })        
  }
  else{
    let requestedItems = db.sendList(listType);

    if(requestedItems === null){
        console.error('error');
        events.emit('red-flash');
    }
    else{
        let message = formatString(requestedItems, listType);
        console.log(listType, message);
        events.emit('bot-message', message);
        events.emit('green-flash');
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
/**
 * @function playMusic uses node-aplay to play a wav file
 *
 */
function playMusic() {
    console.log('in play music');
      song.play();
}


module.exports = {handleCommand, formatString, handleSend,playMusic}




