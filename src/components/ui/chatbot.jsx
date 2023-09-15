import React, { useState, useEffect, use } from "react";
import Message from "./Message";
import axios from "axios";
import { Button } from "./button";
import { Send } from "@mui/icons-material";
import ChatSelectionButtons from "./chat_selection_buttons";
import { Icon } from "@mui/material";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const Chatbot = () => {
  const greeting = {
    role: "bot",
    content: "Hello, what can I do for you?",
  };

  const [messages, setMessages] = useState([greeting]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selection, setSelection] = useState(null);
  const [id, setId] = useState(null);
  const messagesRef = React.useRef(null);

  useEffect(() => {
    if (selection) {
      const newMessage = {
        role: "user",
        content: selection,
      };
      setMessages((prev) => {
        return [...prev, newMessage];
      });
      setChatType();
    }
  }, [selection]);

  useEffect(() => {
    console.log("id", id, selection, inputMessage);
  }, [id, selection, inputMessage]);
  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;
    makeApiCall();
  };

  async function setChatType() {
    setInputMessage("");

    setIsTyping(true);
    let startChat = await axios.post(
      "http://127.0.0.1:5000/start_chat",
      {
        endpoint: selection,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    // console.log(startChat);
    setId(startChat.data.conversation_id);

    setIsTyping(false);
    const botResponse = {
      role: "bot",
      content: startChat.data.messages,
    };

    setMessages((prev) => {
      return [...prev, botResponse];
    });
  }
  async function makeApiCall() {
    const newMessage = {
      role: "user",
      content: inputMessage,
    };

    setMessages((prev) => {
      return [...prev, newMessage];
    });

    setInputMessage("");
    setIsTyping(true);

    let startChat = await axios.post(
      `http://127.0.0.1:5000/continue_chat/${id}/${selection}`,
      {
        message: inputMessage,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    setIsTyping(false);
    const botResponse = {
      role: "bot",
      content: startChat.data.message,
    };
    setMessages((prev) => {
      return [...prev, botResponse];
    });
  }
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full space-y-4 chatbot h-fit">
      <div
        className=" pt-8 chatbot-messages overflow-scroll h-[600px] transition-all duration-500 ease-in-out scrollbar-hide"
        ref={messagesRef}>
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
        {isTyping && (
          <Message
            role="bot"
            content="Thinking..."
          />
        )}
        {!selection && <ChatSelectionButtons setSelection={setSelection} />}
      </div>

      <div
        className={`p-4 ${
          selection ? "opacity-1" : "opacity-0"
        } transition-all duration-500`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center justify-">
          <div className="h-full mr-2">
            <Button
              variant="outline"
              onClick={() => {
                setSelection(null);

                setMessages([greeting]);
              }}>
              <PlusCircledIcon className="w-[20px] h-[20px] " />
            </Button>
          </div>

          <input
            className="w-full p-2 rounded-lg shadow-md bg-zinc-200 focus:outline-none"
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button
            type="submit"
            color="default"
            className="absolute right-5">
            <Send className="fab fa-instagram"></Send>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
