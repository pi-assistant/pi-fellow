const commands = require('../../src/check-command');

describe('formatString()', () => {
    it('can format a string for sending list to phone', () => {
        let str = 'apples and bananas';
        let listType = 'groceries';

        let expected = commands.formatString(str, listType);

        let Result = 'Your MagPi groceries List: \n\n - apples\n - bananas';
        
        expect(expected).toEqual(Result);
    });
});

