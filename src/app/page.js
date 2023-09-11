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
import { useState } from "react";
import CompanyCard from "@/components/ui/company_card";
import Searchbar from "@/components/ui/Searchbar";
import Scrollable from "@/components/ui/scrollable";
import SearchContext from "@/components/context/SearchContext";
import FloatingChatbot from "@/components/ui/floating_chatbot";
import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import BarChart from "@/components/ui/barchart";

const labels = ["Success rate"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Success Evaluation",
      data: [65],
      backgroundColor: ["rgb(32, 33, 35, 1)"],
      borderColor: ["rgb(201, 203, 207)"],
      borderWidth: 1,
    },
  ],
};

export default function Home() {
  const [hasSearch, setHasSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsError, setSearchResultsError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <SearchContext.Provider value={{ setHasSearch }}>
      <div>
        <FloatingChatbot className={"fixed bottom-[40px] right-[40px]"} />

        <div className=" transition-all duration-1000 searchbar h-screen bg-slate-200 w-full flex flex-col justify-center items-center bg-[url('/background.jpg')]">
          <div
            className={`${hasSearch ? "" : "pt-96"}
             w-full flex justify-center items-center transition-all duration-700`}
          >
            <Searchbar></Searchbar>
          </div>

          {
            <Scrollable
              className={`${
                hasSearch ? "opacity-1" : "opacity-0"
              } transition-all duration-700`}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <CompanyCard
                  isLoading={searchResultsLoading}
                  key={i}
                  title={"Apple"}
                  matchPercentage={i * 12}
                  description={"Apple computer Inc."}
                />
              ))}
            </Scrollable>
          }
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

          <Card
            className={`${
              isExpanded
                ? "max-w-[800px] min-h-[1000px]"
                : "max-w-[650px] min-h-[500px]"
            } transition-all duration-700 w-full h-full`}
          >
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
              <Button
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
                size="lg"
              >
                Estimate
              </Button>
            </CardFooter>

            <CardContent
              className={`flex flex-col items-center h-[400px] justify-center space-y-4 ${
                isExpanded ? "visible" : "hidden"
              }`}
            >
              <div
                className={`${
                  isExpanded ? "max-h-[600px]" : "max-h-0"
                } items-center justify-center`}
              >
                {isExpanded && (
                  <div className="flex flex-col items-center justify-center space-y-4 h-full w-full">
                    <BarChart data={data} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">
              <FacebookOutlined className="fab fa-facebook-f"></FacebookOutlined>
            </a>
            <a href="#" className="hover:text-gray-400">
              <Twitter className="fab fa-twitter"></Twitter>
            </a>
            <a href="#" className="hover:text-gray-400">
              <Instagram className="fab fa-instagram"></Instagram>
            </a>
            <a href="#" className="hover:text-gray-400">
              <LinkedIn className="fab fa-linkedin-in"></LinkedIn>
            </a>
          </div>
          <p className="text-sm mt-4">
            &copy; {new Date().getFullYear()} Placeholder Technologies. All
            Rights Reserved.
          </p>
        </div>
      </footer>
    </SearchContext.Provider>
  );
}
