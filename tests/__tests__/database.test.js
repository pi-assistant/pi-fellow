const db = require('../mock/mock-database');
// process.env.GOOGLE_APPLICATION_CREDENTIALS = '/Users/hannahingham/codefellows/401/labs/projects/pi-fellow/cloud.json'


describe('database methods', () => {
    it('can insert into the database', () => {
        let testList = 
        
            {
                type: 'groceries',
                items: 'apples bananas',   
            }
        let results = db.insert(testList);
        expect(results['groceries']).toEqual(testList);
    });

    it('can update an existing list', () => {
        let oldList = 
        
            {  
                type: 'reminders',
                items: 'dentist',   
            }
        db.insert(oldList);
        let newList = db.update('reminders', 'gym');

        let expectedList =
        {
            "groceries": {
                "items": "apples bananas", "type": "groceries"
            }, "reminders": {
                "items": "dentist gym", "type": "reminders"
            }
        }

        
        expect(newList).toEqual(expectedList);
    });

    it('it can send a list', () => {
        let listType = 'groceries';
        let expectedResult = db.sendList(listType);
        expect(expectedResult).toEqual('apples bananas');
    });

    it('can send all lists', () => {
        let listType = 'groceries';
        let expectedResult = db.getAll(listType);
        expect(expectedResult).toEqual(['groceries', 'reminders']);
    })
});
