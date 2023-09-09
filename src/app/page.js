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
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import CompanyCard from "@/components/ui/company_card";
import Searchbar from "@/components/ui/Searchbar";
import Header from "@/components/ui/header";

export default function Home() {
  const ref = useRef();
  const { events } = useDraggable(ref);
  return (
    <div>
      <div className="searchbar h-screen bg-slate-200 w-full flex flex-col justify-center items-center bg-[url('/background.jpg')]">
        <Searchbar></Searchbar>
      </div>
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
          className="fade-edges flex max-w-full h-[600px] items-center justify-between space-x-5 overflow-x-scroll scrollbar-hide px-[30%]"
          {...events}
          ref={ref}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <CompanyCard
              key={i}
              title={"Apple"}
              matchPercentage={i * 12}
              description={"Apple computer Inc."}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
