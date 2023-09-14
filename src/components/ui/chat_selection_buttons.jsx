import React from "react";
import { Button } from "./button";

function ChatSelectionButtons({ setSelection }) {
  return (
    <div className="flex space-x-4 justify-center items-center">
      <Button
        variant="outline"
        onClick={() => {
          setSelection("similar companies");
        }}
      >
        Similar companies
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          setSelection("investment evaluation");
        }}
      >
        Investment evaluation
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          setSelection("best investment for you");
        }}
      >
        Best investment for you
      </Button>
    </div>
  );
}

export default ChatSelectionButtons;
