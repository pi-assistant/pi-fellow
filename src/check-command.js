const events = require('../modules/events.js');
const app = require('./app.js');
const db = require('../modules/database');
require('../modules/send-message');

events.on('check-command', handleCommand);

function handleCommand(arr){
    console.log('command: ', arr[1]);
    console.log('light is solid');
    let sendCheck = arr[1].split(' ')[0].trim();
    if(sendCheck ==='send'){
        let listType = arr[1].split(' ')[1].trim();
        events.emit('send-list', listType);
    }
}


events.on('send-list', handleSend);

function handleSend(listType){

    if(listType === 'list'){
        return 'all lists';
    }
    else if(listType === 'all'){
        //get array of all lists
        let listArr = db.getAll();
        console.log(listArr);
        listArr.forEach ( list => {
        console.log('in for each', list);
        let message = db.sendList(list);
        events.emit('bot-message', message);
        return;
        })        
    }
    else{
        let message = db.sendList(listType);
        console.log('all the stuff', listType, message);
        events.emit('bot-message', message);
    }
 
}

