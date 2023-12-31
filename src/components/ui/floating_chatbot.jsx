import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MessageIcon from "@mui/icons-material/Message";
import Chatbot from "@/components/ui/chatbot";
import { Button } from "./button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
function FloatingChatbot({ className }) {
  const [childKey, setChildKey] = useState(1);
  const [restartchat, setRestartchat] = useState(false);
  useEffect(() => {
    setChildKey(2);
  }, [restartchat]);
  return (
    <div className={`${className}`}>
      <Popover variant="responsive">
        <PopoverTrigger asChild>
          <div className="w-[64px] h-[64px] hover:scale-110 transition duration-300 rounded-full bg-black flex justify-center items-center">
            <MessageIcon className="text-white w-8 h-8" />
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-[600px] max-h-[700px] flex flex-col items-center justify-center">
          <Chatbot />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default FloatingChatbot;
