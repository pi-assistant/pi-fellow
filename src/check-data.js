const events = require('../modules/events.js');
const app = require('./app.js');
const fs = require('fs');
const dbArray = require('../modules/database');

// let db = [];



events.on('check-data', handleData);
events.on('new-list', handleNewList);
events.on('add', handleUpdateList);

function handleData(arr){

    if(arr[1].trim()==='new list'){
        // console.log('in if statement: ', arr[2]);
        events.emit('new-list', arr[2]);
    }
    if(arr[1].trim() === 'add') {
        events.emit('add', arr[2]);
    }
}

function handleNewList(data){
    // console.log('in handleNewList', data);
    let list = new ListMaker(data);
    // console.log(list);
    dbArray.insert(list);
    // console.log('in handle new list', data);
}



function handleUpdateList(data){
    dbArray.update(data);

}

function deleteList(){

}

function sendList(){

}

function ListMaker(str) {
    // this.id = uuid();
    this.items = str,
    this.date = new Date();
}

