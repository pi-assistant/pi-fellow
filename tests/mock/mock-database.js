

module.exports = (function database(){
    var db = {};

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
            console.log('database', db);
            return db;
        },

        update: function(type, str){
            console.log('the data send with add', str, 'type', type);
           
            if(db[`${type}`]){
                console.log('found that type oflist');
                db[`${type}`].items = db[`${type}`].items.concat(' ', str);
                console.log('just added to database: ');
                return db;
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
    }  
}());