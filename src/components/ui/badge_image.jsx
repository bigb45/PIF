import React from "react";
import { Badge } from "./badge";
import Image from "next/image";

function BadgeImage(props) {
  return (
    <div style={{ position: "relative" }}>
      <Image
        src={props.src}
        alt=""
        width={300}
        height={200}
        style={{ objectFit: "cover" }}
      />
      <Badge className="absolute flex items-center justify-center text-white rounded-full top-2 right-2">
        {Math.round(props.matchPercentage) + "%" || "0%"}
      </Badge>
    </div>
  );
}

export default BadgeImage;
