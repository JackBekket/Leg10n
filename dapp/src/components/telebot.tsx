import React, { useState } from "react";
import TelegramBot from "node-telegram-bot-api";

const token = "";
const chat_id = "YOUR_CHAT_ID";

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

  //      <input type="text" value={message} onChange={handleInputChange} />

  return (
    <div>

      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default TelegramMessage;
