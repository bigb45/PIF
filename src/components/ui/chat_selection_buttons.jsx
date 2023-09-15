import React from "react";
import { Button } from "./button";

function ChatSelectionButtons({ setSelection }) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <Button
        className="p-8 rounded-full"
        variant="outline"
        onClick={() => {
          setSelection("find_similar_companies");
        }}>
        Find similar companies
      </Button>
      <Button
        className="p-8 rounded-full"
        variant="outline"
        onClick={() => {
          setSelection("predict_success");
        }}>
        Find success rate of a company
      </Button>
      <Button
        className="p-8 rounded-full"
        variant="outline"
        onClick={() => {
          setSelection("suggest_sectors");
        }}>
        Find best sectors based on your investment
      </Button>
    </div>
  );
}

export default ChatSelectionButtons;
