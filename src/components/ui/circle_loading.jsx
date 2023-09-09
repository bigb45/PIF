import React from "react";

function CircleLoading({ count }) {
  return [...Array(count)].map((e, i) => (
    <div
      key={i}
      className="w-[15px] h-[15px] rounded-full bg-zinc-400 animate-pulse"
    ></div>
  ));
}

export default CircleLoading;
