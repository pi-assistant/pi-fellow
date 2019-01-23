module.exports = (function database(){
  var db = {};

  return {

    print: function(){
      console.log(dbArray);
    },

    insert: function(obj){

      if(db[`${obj.type}`]){
        db[`${obj.type}`].items = obj.items;
        db[`${obj.type}`].date = obj.date;
      }
      else{
        db[`${obj.type}`] = obj;
      }

      console.log('database', db);
    },

    update: function(str){
      dbArray[0].items = dbArray[0].items.concat(' ', str);
      console.log('adding something', dbArray);
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




