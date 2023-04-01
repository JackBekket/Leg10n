import React, { useState } from "react";
import TelegramBot from "node-telegram-bot-api";
import type { GetServerSideProps } from "next";

import fs from "fs"; // our server-only import

const token = "YOUR_TELEGRAM_BOT_TOKEN";
const chat_id = "";

type Props = {

    doesFileExist: boolean;
}

const TelegramMessage = (props:Props) => {


  const [message, setMessage] = useState("");


   const getServerSideProps: GetServerSideProps = async () => {
    const fileExists = fs.existsSync("/some-file"); 
  
    return {
      props: {
        doesFileExist: fileExists,
      },
    };
  };




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
      <div>File exists?: {doesFileExist ? "Yes" : "No"}</div>;
    </div>
    
  );
};

export default TelegramMessage;
