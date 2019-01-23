const events = require('../modules/events.js');
const app = require('./app.js');
const fs = require('fs');
const db = require('../modules/database');

events.on('check-data', handleData);
events.on('new-list', handleNewList);
events.on('add', handleUpdateList);

function handleData(arr){

    if(arr[1].trim()==='new list'){
        events.emit('new-list', arr[2], arr[3]);
    }
    if(arr[1].trim() === 'add') {
        events.emit('add', arr[2]);
    }
}

function handleNewList(type, data){
    let listType = type;

    let list = new ListMaker(data, listType);
    db.insert(list);
}



function handleUpdateList(data){
    db.update(data);

}

function deleteList(){

}

function sendList(){

}

function ListMaker(str, listType) {
    this.type = listType,
    this.items = str,
    this.date = new Date();
}

