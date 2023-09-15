import React from "react";
import { Button } from "./button";

function ChatSelectionButtons({ setSelection }) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <Button
        variant="outline"
        onClick={() => {
          setSelection("find_similar_companies");
        }}>
        Similar companies
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          setSelection("predict_success");
        }}>
        Investment evaluation
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          setSelection("suggest_sectors");
        }}>
        Best investment for you
      </Button>
    </div>
  );
}

export default ChatSelectionButtons;
