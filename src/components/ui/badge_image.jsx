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
        style={{ objectFit: "contain" }}
      />
      <Badge className="absolute top-2 right-2 flex justify-center items-center rounded-full text-white">
        {props.matchPercentage + "%" || "0%"}
      </Badge>
    </div>
  );
}

export default BadgeImage;
