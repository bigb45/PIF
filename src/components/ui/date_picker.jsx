// import React, { useState, useEffect } from "react";
// import { format, addYears, subYears } from "date-fns";
// import {
//   Calendar as CalendarIcon,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// export function DatePicker() {
//   const [date, setDate] = useState({
//     from: new Date(2000, 0, 20),
//     to: new Date(2022, 0, 25),
//   });

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-[280px] justify-start text-left font-normal",
//             !date && "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {date ? format(date, "PPP") : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         {/* <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           initialFocus
//         /> */}
//         <Calendar
//           initialFocus
//           mode="range" // range | single
//           captionLayout="dropdown"
//           // Optionally, enables the year and month drop-down selector.
//           // also: dropdown-buttons | dropdown | buttons
//           fromYear={2000}
//           toYear={2023}
//           defaultMonth={date?.from}
//           selected={date}
//           onSelect={setDate}
//           numberOfMonths={2}
//         />
//       </PopoverContent>
//     </Popover>
//   );
// }

"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ className }) {
  const [date, setDate] = React.useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range" // range | single
            captionLayout="dropdown"
            // Optionally, enables the year and month drop-down selector.
            // also: dropdown-buttons | dropdown | buttons
            fromYear={2000}
            toYear={2023}
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
