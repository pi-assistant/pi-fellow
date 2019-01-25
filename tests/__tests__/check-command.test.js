'use strict'

const c = require('../../src/check-command');
require('../../modules/events.js');
const events = require('./events.js');
jest.mock('./events.js');


describe('EventEmitter', function() {
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

describe('play music', function() {

  // it('calls console log when play music is called', () =>{
  //   const spy = jest.spyOn(console, 'log');
  //   c.playMusic();
  //   expect(spy).toHaveBeenCalled();
  //   spy.mockRestore();
  // });

})
})


