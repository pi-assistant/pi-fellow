'use strict';

const Gpio = require('onoff').Gpio;
const led = new Gpio(23,'out');

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

module.exports = blinker;
