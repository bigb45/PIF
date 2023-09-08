import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CompanyCard(props) {
  return (
    <div>
      <Card className="min-w-[350px] h-[500px] flex flex-col justify-between">
        <CardHeader>
          <div
            className="rounded-xl"
            style={{ width: "300px", height: "200px", overflow: "hidden" }}
          >
            <Image
              src="/test.jpg"
              alt=""
              width={300}
              height={200}
              style={{ objectFit: "contain" }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="flex space-x-5">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com"
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CompanyCard;
