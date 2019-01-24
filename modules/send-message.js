const telegram = require('telegram-bot-api');
const events = require('./events');
require('../src/check-command');

events.on('bot-message', handleMessage);

function handleMessage(message) {

  const api = new telegram({
    token: process.env.TELEGRAM_BOT
  });

  api.sendMessage({
    chat_id: 743775658,
    text: message,
  })

  .catch(function(err)
  {
    console.log(err);
  })

}