"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Draggable from "react-draggable";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import CompanyCard from "@/components/ui/company_card";

export default function Home() {
  const ref = useRef();
  const { events } = useDraggable(ref);
  return (
    <div>
      <div className="header w-full bg-black h-[60px] flex space-x-24 items-center justify-center fixed top-0 z-10">
        <a
          href="https://www.pif.ps/home/"
          className="text-white hover:opacity-70 text-lg font-medium transition-all duration-300"
        >
          PIF
        </a>
        <p className="text-white hover:opacity-70 text-lg font-medium transition-all duration-300">
          Home
        </p>
        <p className="text-white hover:opacity-70 text-lg font-medium transition-all duration-300">
          About
        </p>
      </div>
      <div className="h-screen bg-slate-200"></div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 space-y-5 ">
        <Card className="w-[650px]">
          <CardHeader>
            <CardTitle>Find your next investment</CardTitle>
            <CardDescription>
              We'll help find the best investment for you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <Label>Funds</Label>
              <Input placeholder="Amount of money"></Input>
            </div>
            <div>
              <Label>Short description</Label>
              <Input type="text" placeholder="Company description"></Input>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button size="lg">Estimate</Button>
          </CardFooter>
        </Card>
        <Card className="w-[650px]">
          <CardHeader>
            <CardTitle>Likelihood of success</CardTitle>
            <CardDescription>
              How likely are you to get a return on your investment?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <Label>Startup funds</Label>
              <Input placeholder="Amount of money"></Input>
            </div>
            <div>
              <Label>Startup sector</Label>
              <Input
                type="text"
                placeholder="The sector of the startup"
              ></Input>
            </div>
            <div>
              <Label>Short description</Label>
              <Input type="text" placeholder="Company description"></Input>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button size="lg">Estimate</Button>
          </CardFooter>
        </Card>

        <div
          className="fade-edges flex max-w-full h-fit align-middle justify-between space-x-3 overflow-x-scroll scrollbar-hide px-[30%]"
          {...events}
          ref={ref}
        >
          <CompanyCard title={"Apple"} description={"Apple computer Inc."} />
          <CompanyCard title={"Meta"} description={"Social Media company"} />
          <CompanyCard
            title={"Tesla"}
            description={"Electric cars of the future!"}
          />
          <CompanyCard
            title={"TSMC"}
            description={"the engine of the world, chip manufacturer"}
          />
          <CompanyCard
            title={"Google"}
            description={"Google, collecting your data without you knowing"}
          />

          <CompanyCard
            title={"lorem"}
            description={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit omnis id voluptatum est sequi sunt hic numquam nihil quaerat iste."
            }
          />
          <CompanyCard title={"Apple"} description={"Apple computer Inc."} />
          <CompanyCard title={"Apple"} description={"Apple computer Inc."} />
        </div>
      </main>
    </div>
  );
}
