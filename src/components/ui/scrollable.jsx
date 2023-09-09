import React, { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

function Scrollable({ children, className }) {
  const ref = useRef();
  const { events } = useDraggable(ref);
  return (
    <div
      className={`fade-edges flex max-w-full h-[600px] items-center justify-between space-x-5 overflow-x-scroll scrollbar-hide px-[30%] ${className}`}
      {...events}
      ref={ref}
    >
      {children}
    </div>
  );
}

export default Scrollable;
