import React from "react";

function GradientCard({ imageUrl, className, category, description }) {
  let url = "/" + imageUrl + ".jpg";
  console.log(url);
  const backgroundImageStyle = {
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      className={`${className} rounded-md bg-auto w-[400px] h-[150px]  `}
      style={backgroundImageStyle}
    >
      <div className="bottom-0 bg-gradient-to-t  from-black from-10% to-60% to-transparent text-white w-full h-full flex flex-col justify-end p-4 rounded-md">
        <p className="text-lg">{category || "this is not working"}</p>
        <p className="text-sm">{description || "this is not working"}</p>
      </div>
    </div>
  );
}

export default GradientCard;
