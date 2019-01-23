module.exports = (function database(){
    var dbArray = [];

    return {

        print: function(){
            console.log(dbArray);
        },

        insert: function(obj){
            dbArray.unshift(obj);
            console.log('in database IFFE', dbArray);
        },

        update: function(str){
            dbArray[0].items = dbArray[0].items.concat(' ', str);
            console.log('adding something', dbArray);
        },

        sendList: function(){
            let conjunctions = ['add', 'and', ','];
           let newList = dbArray[0].items.split(' ');
           console.log('new list array', newList);
           const filteredList = newList.filter( item => {
               return !conjunctions.includes(item.trim() );
           });
           filteredList.unshift('Your MagPi List: \n')
           let filteredStr = filteredList.join('\n - ');
           return filteredStr;
        }
    }
}());

