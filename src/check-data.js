'use strict';

/**
 * Check Data
 * functions that fire when users gives 'new-list' or 'add' command with data
 * @module src/check-data
 */

const events = require('../modules/events.js');
const app = require('./app.js');
const fs = require('fs');
const db = require('../modules/database');
require('./light-listen');
const Sound = require('node-aplay');
const magpiError = new Sound('./assets/peacock-error.wav');


// const magpiError = new Sound('./assets/peacock-error.wav');
// const successSound = new Sound('./assets/success.wav');


events.on('check-data', handleData);
events.on('new-list', handleNewList);
events.on('add', handleUpdateList);
events.on('error', handleError);

/**
 * @function handleData handles incoming commands 'add' and 'new list' commands from user
 * @param {array} arr
 * @fires new-list calls handleNewList
 * @fires blue-off 
 * @fires green-flash
 */
function handleData(arr){
  if(arr[1].trim()==='new list'){
    events.emit('new-list', arr[2], arr[3]);
    events.emit('blue-off');
    events.emit('green-flash');
  }
  if(arr[1].trim() === 'add') {
    console.log('in handleData arr[3]', arr[3]);
    events.emit('add', arr[2], arr[3]);
    events.emit('green-flash');
  }

}

/**
 *
 * @function handleNewList
 * @param {*} type
 * @param {*} data
 */
function handleNewList(type, data){
  console.log('in handleNewList');
  let listType = type;
  let list = new ListMaker(data, listType);
  db.insert(list);
  events.emit('success');
}

/**
 *
 * @function handleUpdateList
 * @param {*} type
 * @param {*} data
 */
function handleUpdateList(type, data){
    console.log('data in handleUpdateList', data);
    let updatedDB = db.update(type, data);
    events.emit('success');
   
    if(!updatedDB) {
        console.error('error');
        events.emit('red-flash');
        events.emit('red-flash');
        events.emit('error');
    }
}

const handleError = ( (err) => {
  console.log('error', err);
  magpiError.play();
});

/**
 *
 * @constructor ListMaker
 * @param {*} str
 * @param {*} listType
 */
function ListMaker(str, listType) {
  this.type = listType,
  this.items = str,
  this.date = new Date();
}

module.exports = {handleData, handleNewList, handleUpdateList, handleError, ListMaker};



