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
        events.emit('add', arr[2], arr[3]);
    }
}

function handleNewList(type, data){
    let listType = type;

    let list = new ListMaker(data, listType);
    db.insert(list);
}



function handleUpdateList(type, data){

    if(db.update(type, data)){
        return;
    }
    // else{
    //    //run error function
    //    events.emit('error-occurred', 'error'); 
    //    handleError();
    // }

}

// events.on('error-occurred', redLight);

// function redLight() {
//     //turn on the right light
// }

// function handleError(){
//     console.log('Oops.  Error occurred.');
// }

function ListMaker(str, listType) {
    this.type = listType,
    this.items = str,
    this.date = new Date();
}

