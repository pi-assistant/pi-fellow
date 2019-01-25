'use strict';

const listen = require('../../src/light-listen');
require('../../modules/events.js');
process.env.GOOGLE_APPLICATION_CREDENTIALS = '/Users/hannahingham/codefellows/401/labs/projects/pi-fellow/cloud.json'


describe('Light Listen', function() {
  describe('handler commands', function() {
    it('calls the blue on function', () => {
      const spy = jest.spyOn(listen, 'handleBlueOn');
      listen.handleBlueOn();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
    it('calls the blue off function', () => {
      const spy = jest.spyOn(listen, 'handleBlueOff');
      listen.handleBlueOff();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
    it('calls the blue flash function', () => {
      const spy = jest.spyOn(listen, 'handleBlueFlash');
      listen.handleBlueFlash();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
    it('calls the green flash function', () => {
      const spy = jest.spyOn(listen, 'handleGreenFlash');
      listen.handleGreenFlash();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
    it('calls the blue Flash function', () => {
      const spy = jest.spyOn(listen, 'handleRedFlash');
      listen.handleRedFlash();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
    it('calls console.log in blue on function', () => {
      const spy = jest.spyOn(console, 'log');
      listen.handleBlueOn();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
    it('calls console.log in blue off function', () => {
      const spy = jest.spyOn(console, 'log');
      listen.handleBlueOff();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
    it('calls console.log handleGreenFlash function', () => {
      const spy = jest.spyOn(console, 'log');
      listen.handleGreenFlash();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
    it('calls console.log handleRedFlash function', () => {
      const spy = jest.spyOn(console, 'log');
      listen.handleRedFlash();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
    it('calls console.log handleBlueFlash function', () => {
      const spy = jest.spyOn(console, 'log');
      listen.handleBlueFlash();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});