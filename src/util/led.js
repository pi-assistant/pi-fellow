'use strict';

const Gpio = require('onoff').Gpio;
const greenLED = new Gpio(23,'out');

function lightSolid(led) {
	led.writeSync(1);
}

function lightBlink() {
	if (led.readSync() === 0) {

		led.writeSync(1);
		
	} else {
		
		led.writeSync(0);
		
	}
}


function blinker(led) {
	let blinkInterval = setInterval(lightBlink, 150);
	
	setTimeout( (light) => {
		clearInterval(blinkInterval);
	}, 1000);
};


lightSolid(greenLED);

module.exports = blinker;
