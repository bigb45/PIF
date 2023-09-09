import React from "react";

function TextSkeleton({ count }) {
  return [...Array(count)].map((e, i) => (
    <div
      key={i}
      className="w-[200px] h-[15px] bg-zinc-400 animate-pulse rounded-md"
    ></div>
  ));
}

export default TextSkeleton;
