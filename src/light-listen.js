'use strict';

const events = require('../modules/events');
const app = require('./app');

const ledController = require('./util/led.js');
<<<<<<< HEAD

//const Gpio = require('onoff').Gpio;
//const blueLED = new Gpio(4, 'out');
// const greenLED = new Gpio(23, 'out');
// const redLED = new Gpio(16, 'out');
=======
const Gpio = require('onoff').Gpio;

const blueLED = new Gpio(4, 'out');
const greenLED = new Gpio(23, 'out');
const redLED = new Gpio(16, 'out');
>>>>>>> bf6588ba6196fae7c1ee992922e5d17f74012634

events.on('blue-on', handleBlueOn);
events.on('blue-off', handleBlueOff);
events.on('blue-flash',handleBlueFlash);
events.on('green-flash', handleGreenFlash);
events.on('red-flash', handleRedFlash);

function handleBlueOn(){
  ledController.lightSolid(blueLED);
  console.log('blue light on');
}

function handleBlueOff() {
  ledController.kill(blueLED);
  console.log('blue light off');
}

function handleGreenFlash() {
  ledController.blinker(greenLED);
  console.log('green light flash');
}

function handleRedFlash() {
  ledController.blinker(redLED);
  console.log('red light flash');
}

function handleBlueFlash() {
  ledController.blinker(blueLED);
  console.log('blue light flash');
}
