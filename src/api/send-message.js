'use strict';

const telegram = require('telegram-bot-api');
const events = require('../../modules/events');
require('../check-command');

events.on('bot-message', handleMessage);

function handleMessage(message) {
  const api = new telegram({
    token: process.env.TELEGRAM_BOT,
  });

  api.sendMessage({
    chat_id: process.env.TELEGRAM_CHAT_ID,
    text: message,
  })

    .catch(function(err)
    {
      console.log(err);
    });
}