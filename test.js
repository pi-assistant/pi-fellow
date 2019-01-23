'use strict';
var Gpio = require('onoff').Gpio;
var LED = new Gpio(23,'out');
var blinkInterval;
console.log('test file');


function blinkLED() {
	if (LED.readSync() === 0) {
		LED.writeSync(1);
	} else {
		LED.writeSync(0);
	}
}

function endBlink() {
	clearInterval(blinkInterval);
	LED.writeSync(0);
	LED.unexport();
}

function blinker() {
	blinkInterval = setInterval(blinkLED, 150);
	setTimeout(endBlink, 1000);
}

blinker();

//setTimeout(endBlink, 1000);
