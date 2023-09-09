import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
function FloatingChatbot() {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80"></PopoverContent>
      </Popover>
    </div>
  );
}

export default FloatingChatbot;
