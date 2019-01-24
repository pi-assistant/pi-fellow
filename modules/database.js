const fs = require('fs');
// const dbJson = require('./data/db.json');



module.exports = (function database(){
    var db;

    fs.readFile('./data/db.json', (err,data) => {
        if(err) {
            console.error(err);
        };
        db = JSON.parse(data.toString());
        console.log(db);
    })

    function write() {
        fs.writeFile('./data/db.json', JSON.stringify(db), (err) => {
            if(err) {console.err(err);}
            console.log('file has been saved');
        })
    }

    

    return {

        print: function(){
            console.log(dbArray);
        },

        insert: function(obj){
            // console.log('the list obj', obj);
            if(db[`${obj.type}`]){
                db[`${obj.type}`].items = obj.items;
                db[`${obj.type}`].date = obj.date;
            }
            else{
                db[`${obj.type}`] = obj;
            }
            write();
            console.log('database', db);
        },

        update: function(type, str){
            console.log('the data send with add', str);
           
            if(db[`${type}`]){
                db[`${type}`].items = db[`${type}`].items.concat(' ', str);
                console.log('just added to database: ', db);
                write();
                return true;
            }

            else{
                return false;
            }       
        },

        sendList: function(listType){
            console.log('in send method');
            let conjunctions = ['add', 'and', ','];
           let requestedList = db[listType].items.split(' ');
           console.log('new list array', requestedList);
           const filteredList = requestedList.filter( item => {
               return !conjunctions.includes(item.trim() );
           });
           filteredList.unshift(`Your MagPi ${listType} List: \n`)
           let filteredStr = filteredList.join('\n - ');
           return filteredStr;
        },

        getAll: function(){
            return Object.keys(db);
        }
    }
}());




