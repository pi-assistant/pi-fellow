'use strict';

function lightSolid(led) {
	led.writeSync(1);
}

function blinker(led) {
	let thisLight = led;
	
	let blinkInterval = setInterval( (led) => {
		if (thisLight.readSync() === 0) {
			thisLight.writeSync(1);
		} else {
			thisLight.writeSync(0);
		}	
	}, 150);
	
	setTimeout( (light) => {
		clearInterval(blinkInterval);
	}, 1000);
	
};

function kill(led) {
	led.writeSync(0);
}

function killAll() {
	redLED.writeSync(0);
	greenLED.writeSync(0);
	blueLED.writeSync(0);
}


module.exports = {lightSolid, blinker, kill, killAll};
