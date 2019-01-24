const events = require('../modules/events.js');
const app = require('./app.js');
const fs = require('fs');
const db = require('../modules/database');
require('./light-listen');

events.on('check-data', handleData);
events.on('new-list', handleNewList);
events.on('add', handleUpdateList);

function handleData(arr){

  if(arr[1].trim()==='new list'){
    events.emit('new-list', arr[2], arr[3]);
    events.emit('blue-off');
    events.emit('green-flash');
  }
  if(arr[1].trim() === 'add') {
    events.emit('add', arr[2]);
    events.emit('green-flash');
  }
}

function handleNewList(type, data){
  let listType = type;
  let list = new ListMaker(data, listType);
  db.insert(list);
}



function handleUpdateList(data){
  db.update(data);
  events.emit('green-flash');
}


function ListMaker(str, listType) {
  this.type = listType,
  this.items = str,
  this.date = new Date();
}

