'use strict'

process.env.GOOGLE_APPLICATION_CREDENTIALS = '/Users/hannahingham/codefellows/401/labs/projects/pi-fellow/cloud.json'

const c = require('../../src/check-command');
// require('../../modules/events.js');
// jest.mock('./events.js');


describe('handle command', function() {
  describe('handle command', function() {

   it('calls console log when hey magpie is followed a known command', () =>{
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

 })

 describe('handleSend', function() {

  it('calls console log when hey magpie is followed a known command', () =>{
    const spy = jest.spyOn(console, 'log');
    c.handleSend('all');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

   it('it calls console error if the list type is not in db', () =>{
    const spy = jest.spyOn(console, 'error');
    c.handleSend('foo');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
})

})


