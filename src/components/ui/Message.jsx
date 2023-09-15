import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";

const Message = ({ role, content }) => {
  const isUserMessage = role === "user";
  const renderers = {
    link: (props) => (
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    ),
    list: (props) => <ul>{props.children}</ul>,
    listItem: (props) => <li>{props.children}</li>,
    paragraph: (props) => <p>{props.children}</p>, // Add this renderer for line breaks
  };
  return (
    <div
      className={`flex space-x-4 items-center p-4 ${
        isUserMessage ? "justify-end" : ""
      } `}
    >
      {isUserMessage ? null : (
        <Image
          className="rounded-sm"
          src="/chatbotAvatar.jpg"
          width={40}
          height={40}
          alt="chatbot avatar"
        />
      )}
      <div
        className={`message flex flex-col p-4 ${
          isUserMessage
            ? "items-end ml-24 bg-[#202123] text-white"
            : "items-start mr-24 bg-gray-300"
        }   rounded-lg p-2 m-4 hover:shadow-lg transition`}
      >
        <p
          className={`${
            isUserMessage ? "text-white" : "text-zinc-400"
          } text-sm mb-1 first-letter:uppercase`}
        >
          {isUserMessage ? null : role}
        </p>
        <ReactMarkdown renderers={renderers} className="text-sm line-break">
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Message;
