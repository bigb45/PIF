import React, { useState, useEffect } from "react";
import Message from "./Message";
import axios from "axios";
import { Button } from "./button";
import { Icon } from "@mui/material";
import { Send } from "@mui/icons-material";

const Chatbot = ({ id }) => {
  const greeting = {
    role: "bot",
    content: "Hello, what can I do for you?",
  };

  const [messages, setMessages] = useState([greeting]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = React.useRef(null);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      role: "user",
      content: inputMessage,
    };
    setMessages((prev) => {
      return [...prev, newMessage];
    });
    setInputMessage("");

    setIsTyping(true);
    let startChat = await axios.get("https://catfact.ninja/fact");
    setIsTyping(false);
    const botResponse = {
      role: "bot",
      content: startChat.data.fact,
    };
    setMessages((prev) => {
      return [...prev, botResponse];
    });
  };

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full space-y-4 chatbot h-fit">
      <div
        className=" pt-8 chatbot-messages overflow-scroll h-[600px] transition-all duration-500 ease-in-out scrollbar-hide"
        ref={messagesRef}
      >
        <div className="w-full h-[60px] text-white bg-black flex justify-center items-center rounded-tr-md rounded-tl-md fixed top-0 right-0">
          <p className="text-2xl">Messages</p>
        </div>
        {messages.map((message, index) => (
          <Message
            className={"transition-all duration-500 ease-in-out"}
            key={index}
            role={message.role}
            content={message.content}
          />
        ))}
        {isTyping && <Message role="bot" content="Thinking..." />}
      </div>
      <div className="p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(inputMessage);
            handleSendMessage();
          }}
          className="flex items-center justify-"
        >
          <input
            className="w-full p-2 rounded-lg shadow-md bg-zinc-200 focus:outline-none"
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button type="submit" color="default" className="absolute right-5">
            <Send className="fab fa-instagram"></Send>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
