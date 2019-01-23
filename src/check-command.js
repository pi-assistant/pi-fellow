const events = require('../modules/events.js');
const app = require('./app.js');
const dbArray = require('../modules/database');
require('../modules/send-message');

events.on('check-command', handleCommand);

function handleCommand(arr){
    console.log('command: ', arr[1]);
    console.log('light is solid');
    if(arr[1].trim() ==='send list'){
        events.emit('send-list', arr[1]);
    }
}


events.on('send-list', handleSend);

function handleSend(){
    //do the stuff and get the info and send it out
    let message = dbArray.sendList();
    events.emit('bot-message', message);
    // console.log('in handle send');
}

