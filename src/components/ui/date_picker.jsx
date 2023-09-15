import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function DatePicker({ onDateSelect }) {
  const [date, setDate] = useState();

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    if (onDateSelect) {
      onDateSelect(selectedDate); // Pass the selected date to the parent component
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          initialFocus
          mode="single" // range | single
          captionLayout="dropdown"
          fromYear={2000}
          toYear={2023}
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleDateSelect} // Call the handler when a date is selected
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
