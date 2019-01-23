![CF](http://i.imgur.com/7v5ASc8.png) Mid Term Project
=================================================

## Mag-Pi

### Author: The Pi-Fellows Team: 
Hannah Ingham, Heather Cherewaty, George Raymond, Michael George

### Links and Resources
* [repo](https://github.com/pi-assistant/pi-fellow)
* [travis](http://xyz.com)
* [back-end](http://xyz.com) (when applicable)
* [front-end](http://xyz.com) (when applicable)

#### Documentation
* [swagger](http://xyz.com) (API assignments only)
* [jsdoc](http://xyz.com) (All assignments)

### Modules
#### `modulename.js`
##### Exported Values and Methods

###### `foo(thing) -> string`
Usage Notes or examples

###### `bar(array) -> array`
Usage Notes or examples

### Setup
#### `.env` requirements
* `PORT` - Port Number
* `MONGODB_URI` - URL to the running mongo instance/db

#### Running the app
* `npm start`
* Endpoint: `/foo/bar/`
  * Returns a JSON object with abc in it.
* Endpoint: `/bing/zing/`
  * Returns a JSON object with xyz in it.
  
#### Tests
* How do you run tests?
* What assertions were made?
* What assertions need to be / should be made?

#### UML
Link to an image of the UML for your application and response to events

## How to Set-up Your Raspberry Pi Device:
[Raspberry Pi 3 Setup](https://www.google.com/search?q=raspberry+pi+getting+started&rlz=1C1CHBF_enUS749US749&oq=raspb&aqs=chrome.0.69i59j0j69i60j69i59j69i57j69i60.1520j0j9&sourceid=chrome&ie=UTF-8#kpvalbx=1)

The video above covers everything you need to set up your Raspberry Pi 3 from out of the box. This is what we used to setup, install, and configure ours. 


## How to Set-up Your Microphone and Headphones on Your Raspberry Pi Device:
I followed this tutorial to set up our Audo input and output: [Audio Setup](https://maker.pro/raspberry-pi/tutorial/the-best-voice-recognition-software-for-raspberry-pi)

We used the USB Microphone from VALinks [Microphone on Amazon](https://www.amazon.com/VAlinks-Microphone-Recording-Compatible-Raspberry/dp/B014MASID4)

In summary:

To get started, unpackage your microphone and plug it into an available USB slot on your Raspberry Pi device. 

To make sure that your Raspberry Pi device recognizes your usb microphone, type 'lsusb' in your terminal. 
You should see something like 'Bus 001 Device 010: ID 8086:080 Intel Corp.' along with any other usb device you had plugged in. 
You're really looking for the Intel Corp. If you see that, your device recognizes it. 

The next step is to create an audio recording through your device for proof of life. To do this, type “arecord -D plughw:1,0 -d 3 test.wav”
This will create a 3 second audio recording, and it is listening for sounds from the microphone. So as soon as you hit enter, begin speaking into the microphone for 3 seconds. 

After you have completed the recording, type “aplay test.wav” in your terminal, and your recording should be playing!

#### If you are using your monitor or an HDMI device as your sound output device, please disregard these next steps:
Only procede with these next steps if you are using an analouge headset with an 3.5mm AUX plug in:

In your terminal type:
  amixer cset numid=3 1

This will switch your audio output device to your 3.5mm AUX headphones.




## How to Set-up the Google Speech API to Parse Audio to Text: 