'use strict';
process.env.GOOGLE_APPLICATION_CREDENTIALS = '/Users/hannahingham/codefellows/401/labs/projects/pi-fellow/cloud.json'

const dataCheck = require('../../src/check-data');
// require('../../modules/events');


describe('handleData()', () => {
    it('takes in an array, trims it, and emits events based on length', () => {
        let arr = ['hey magpie', 'new list', 'groceries', 'apples and bananas'];
        const spy = jest.spyOn(console, 'log');
        dataCheck.handleData(arr);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});

describe('handleNewList()', () => {
    it('takes in a list name and data', () => {
        let type = 'new list';
        let data = 'apples and bananas';
        const spy = jest.spyOn(console, 'log');
        dataCheck.handleNewList(type, data);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});

describe('handleUpdateList()', () => {
    it('takes in an existing list type and data to be added', () => {
        let type = 'groceries';
        let data = 'chocolate';
        const spy = jest.spyOn(console, 'log');
        dataCheck.handleUpdateList(type, data);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});





