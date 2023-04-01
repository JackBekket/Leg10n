import React, { useState } from "react";
import TelegramBot from "node-telegram-bot-api";

const token = "YOUR_TELEGRAM_BOT_TOKEN";
const chat_id = "";

const TelegramMessage = () => {
  const [message, setMessage] = useState("");

  /*
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  */

  const handleSendMessage = () => {
    const bot = new TelegramBot(token, { polling: false });
    bot.sendMessage(chat_id, message);
  };

  return (
    <div>
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default TelegramMessage;
