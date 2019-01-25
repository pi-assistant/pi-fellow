'use strict'

const c = require('../../src/check-command');
require('../../modules/events.js');
const events = require('./events.js');
jest.mock('./events.js');


describe('EventEmitter', function() {
  describe('handle command', function() {

   it('logs error saved when error', () =>{
      const spy = jest.spyOn(console, 'log');
      c.handleCommand(['hey magpie', 'send groceries']);
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('does not console log if the command is unknown', () =>{
      const spy = jest.spyOn(console, 'log');
      c.handleCommand(['hey magpie', 'groceries']);
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });

    it('does emit an event', () =>{
      const spy = jest.spyOn(c, 'handleCommand');
      c.handleCommand(['hey magpie', 'new List']);
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
 })
})


