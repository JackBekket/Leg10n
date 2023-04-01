import React, { useState } from "react";




const TelegramChat = () => {
  const [message, setMessage] = useState("");
  const chatid = "yourchatid"; // replace with your actual chatid
  const tg_bot = process.env.TELEGRAM_KEY;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    //var url1 = 'https://api.telegram.org/bot'
    const url = `https://api.telegram.org/bot${tg_bot}/sendMessage?chatid=${chatid}&text=${message}`;
    // replace <yourbottoken> with your actual bot token

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setMessage("");
  };

  return (
    <div>
      <input type="text" value={message} onChange={handleInputChange} />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default TelegramChat;