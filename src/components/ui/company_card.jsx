import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import BadgeImage from "./badge_image";
import ImageSkeleton from "./image_skeleton";
import TextSkeleton from "./text_skeleton";
import SocialLinks from "./social_media";
import CircleLoading from "./circle_loading";

function CompanyCard(props) {
  return (
    <div>
      <Card className="min-w-[350px] h-[500px] flex flex-col justify-between hover:scale-105  transition-all ease-linear">
        <CardHeader className="flex items-end">
          {props.isLoading ? (
            <ImageSkeleton />
          ) : (
            <div
              className="rounded-xl"
              style={{ width: "300px", height: "200px", overflow: "hidden" }}
            >
              <BadgeImage
                src={props.src || "/test.jpg"}
                matchPercentage={props.matchPercentage}
              />
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-8">
          {props.isLoading ? (
            <TextSkeleton count={3} />
          ) : (
            <div>
              <CardTitle>{props.title}</CardTitle>
              <CardDescription>{props.description}</CardDescription>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {props.isLoading ? <CircleLoading count={3} /> : <SocialLinks />}
        </CardFooter>
      </Card>
    </div>
  );
}

export default CompanyCard;
