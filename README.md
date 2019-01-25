![CF](http://i.imgur.com/7v5ASc8.png) Mid Term Project
=================================================

## Mag-Pi

### Author: The Pi-Fellows Team: 
Hannah Ingham, Heather Cherewaty, George Raymond, Michael George

### Links and Resources
* [repo](https://github.com/pi-assistant/pi-fellow)
* [travis](http://xyz.com)
* [back-end](http://xyz.com) (when applicable)

#### Documentation
* [jsdoc] 
navigate to docs folder in terminal, then `live-server`

### Modules
#### `src/light-listen.js`
##### Exported Values and Methods
handleBlueOn()
handleBlueOff()
handleGreenFlash()
handleRedFlash()
handleBlueFlash() 
#### `src/check-data.js
##### Exported Values and Methods
handleData()
handleNewList()
handleUpdateList()
handleError()
ListMaker()
#### `src/check-command.js`
##### Exported Values and Methods
handleCommand()
formatString()
handleSend()
events()
triggerMock()
#### `src/app.js`
##### Exported Values and Methods
This file exports the server object with a start method.
#### `src/util/led.js`
##### Exported Values and Methods
lightSolid()
blinker()
kill()
#### `src/api/send-message.js`
##### Exported Values and Methods
handleMessage()
#### `src/api/speech.js`
##### Exported Values and Methods
listen()
handleData()

###### `bar(array) -> array`
Usage Notes or examples

### Setup
#### `.env` requirements
* `PORT` - defned in `.env`
* telegram account 
* your peronsal telegram chat_id with @MagPi
* telegram MagPi bot id
* google-cloud speech api json key

#### Running the app
* `node index.js`
* Interacting with your MagPi:
- speak clearly
- pause and wait for device light confirmation 
- on MagPi/user error, expect red flashing lights

##### To create new list
`hey magpi` pause `new list` pause `{listname}` pause `{items to add to list}`

##### To add to existing list
`hey magpi` pause `add` pause `{name of exiting list}` pause `{items to add to list}`

##### To send your lists
`hey magpi` pause `send` pause `{list to be sent}`

##### To send all your lists
`hey magpi` pause `send all`

##### On MagPi/user error
`hey Siri`

#### Tests
* npm run test-watch
* What assertions were made?
* What assertions need to be / should be made?

#### UML
Link to an image of the UML for your application and response to events

## How to Set-up Your Raspberry Pi Device:
[Raspberry Pi 3 Setup](https://www.google.com/search?q=raspberry+pi+getting+started&rlz=1C1CHBF_enUS749US749&oq=raspb&aqs=chrome.0.69i59j0j69i60j69i59j69i57j69i60.1520j0j9&sourceid=chrome&ie=UTF-8#kpvalbx=1)

The video above covers everything you need to set up your Raspberry Pi 3 from out of the box. This is what we used to setup, install, and configure ours. 

### How to Set-up Your Microphone and Headphones on Your Raspberry Pi Device:
I followed this tutorial to set up our Audo input and output: [Audio Setup](https://maker.pro/raspberry-pi/tutorial/the-best-voice-recognition-software-for-raspberry-pi)

We used the USB Microphone from VALinks [Microphone on Amazon](https://www.amazon.com/VAlinks-Microphone-Recording-Compatible-Raspberry/dp/B014MASID4)

### Getting Started:

To get started, unpackage your microphone and plug it into an available USB slot on your Raspberry Pi device. 

To make sure that your Raspberry Pi device recognizes your usb microphone, type 'lsusb' in your terminal. 
You should see something like 'Bus 001 Device 010: ID 8086:080 Intel Corp.' along with any other usb device you had plugged in. 
You're really looking for the Intel Corp. If you see that, your device recognizes it. 

The next step is to create an audio recording through your device for proof of life. To do this, type “arecord -D plughw:1,0 -d 3 test.wav”
This will create a 3 second audio recording, and it is listening for sounds from the microphone. So as soon as you hit enter, begin speaking into the microphone for 3 seconds. 

After you have completed the recording, type “aplay test.wav” in your terminal, and your recording should be playing!

#### Setting up microphone on raspberry pi:
To use an analouge headset with an 3.5mm AUX plugin type of the follwing command in the terminal to switch your audio output device to your 3.5mm AUX headphones:

  amixer cset numid=3 1

## API setup
* set up a google project account
* add the google speech cloud api
* run `brew install sox` on your computer
