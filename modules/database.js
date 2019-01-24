const fs = require('fs');

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
            console.log('the data send with add', str, 'type', type);
           
            if(db[`${type}`]){
                console.log('found that type oflist');
                db[`${type}`].items = db[`${type}`].items.concat(' ', str);
                console.log('just added to database: ');
                write();
                return true;
            }
            else{
                return false;
            }       
        },

        sendList: function(listType){
            if(db[listType]){
                return db[listType].items;
            }
            return null;
        },

        getAll: function(){
            return Object.keys(db);
        }
<<<<<<< HEAD
<<<<<<< HEAD
    }  
}());
=======


    }
  }());
>>>>>>> 8114d7dbb30d70931de963e7f52e4fc222d4a76e
=======
    }  
}());



>>>>>>> a561f6dad9bd2233b52ef4802f569d0b84d259ca




