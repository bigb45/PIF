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
import { useEffect, useRef, useState } from "react";
import CompanyCard from "@/components/ui/company_card";
import Searchbar from "@/components/ui/Searchbar";
import Scrollable from "@/components/ui/scrollable";
import SearchContext from "@/components/context/SearchContext";
import FloatingChatbot from "@/components/ui/floating_chatbot";
import {
  Dataset,
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Opacity,
  Twitter,
} from "@mui/icons-material";
import BarChart from "@/components/ui/barchart";
import DatePicker from "@/components/ui/date_picker";
import { Loader2 } from "lucide-react";
import GradientCard from "@/components/ui/gradient_card";
import axios from "axios";
import descriptions from "@/components/utils/descriptions";
import Footer from "@/components/ui/Footer";

const labels = ["Success rate"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Success Evaluation",
      data: [0],
      backgroundColor: ["rgb(32, 33, 35, 0.8)"],
      borderColor: ["rgb(0, 0, 0)"],
      borderWidth: 1,
      borderRadius: 20,
      borderSkipped: false,
    },
  ],
};

export default function Home() {
  const scrollRef = useRef(null);

  // search hooks
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);

  // UI state hooks
  const [isExpanded, setIsExpanded] = useState(false);
  const [actualValue, setActualValue] = useState(0); // Set your actual value here
  const [counterValue, setCounterValue] = useState(0);

  // success rate hooks
  const [chartData, setChartData] = useState(data);
  const [fundingRounds, setFundingRounds] = useState("");
  const [totalFunding, setTotalFunding] = useState("");
  const [firstFundDate, setFirstFundDate] = useState(null); // Assuming you're using a date picker component that returns a date object
  const [shortDescription, setShortDescription] = useState("");
  const [foundationDate, setFoundationDate] = useState(null); // Assuming you're using a date picker component that returns a date object
  const [successRequestLoading, setSuccessRequestLoading] = useState(false);

  // recommended investment hooks
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [hasCardCategory, setHasCardCategory] = useState(false);
  const [cardCategories, setCardCategories] = useState([]);
  const [investmentRequestLoading, setInvestmentRequestLoading] =
    useState(false);

  // handle investment categories request handler
  const handleInvestmentRequest = async () => {
    setInvestmentRequestLoading(true);
    let res = null;
    try {
      res = await axios.post(`http://127.0.0.1:5000/suggest_sectors`, {
        investment_amount: investmentAmount,
      });
    } catch (e) {
      console.log(e);
    }
    setInvestmentRequestLoading(false);
    setHasCardCategory(true);

    const categories = res?.data?.message;

    const keyValueArray = Object.entries(categories);
    keyValueArray.sort((a, b) => b[1] - a[1]);
    const sortedKeys = keyValueArray.map((item) => item[0]);
    console.log(sortedKeys);
    setCardCategories(sortedKeys); // res.data
  };

  // handle search request handler
  const handleSearch = async () => {
    console.log(searchQuery);
    setSearchResultsLoading(true);
    setSearchResultsVisible(true);

    let res = null;
    try {
      res = await axios.post(`http://127.0.0.1:5000/find_similar_companies`, {
        description: searchQuery,
      });
    } catch (e) {
      console.log(e);
    }
    setSearchResultsLoading(false);
    setSearchResults([
      {
        title: searchQuery,
        matchPercentage: 100,
        description: "the greatest apple in the world",
      },
    ]);
  };

  // handle success rate request handler
  async function handleSuccessRequest() {
    setCounterValue(0);
    setActualValue(0);
    formattedFirstFundDate = `${firstFundDate.getFullYear()}-${firstFundDate.getMonth()}-${firstFundDate.getDate()}`; // 2021-10-20
    formattedFoundationDate = `${foundationDate.getFullYear()}-${foundationDate.getMonth()}-${foundationDate.getDate()}`; // 2021-10-20
    const request = {
      funding_rounds: fundingRounds,
      funding_total_usd: totalFunding,
      first_funding_date: formattedFirstFundDate,
      short_description: shortDescription,
      date_of_foundation: formattedFoundationDate,
    };
    console.log(request);
    setSuccessRequestLoading(true);
    let res = null;
    try {
      res = await axios.post("http://127.0.0.1:5000/predict_success", request);
    } catch (e) {
      console.log(e);
    }
    setSuccessRequestLoading(false);
    setIsExpanded(true);

    updateChartData();
    // data.datasets[0].data = [Number(fundingRounds)]; // res.data.successrate
    setActualValue(Number(res.data.message)); // res.data.successrate
  }
  useEffect(() => {
    const step = Math.ceil(actualValue / 100); // Define the step size for counting
    const duration = 1000; // Define the duration for the counting animation in milliseconds
    const interval = duration / actualValue; // Calculate the interval between each step

    if (counterValue < actualValue) {
      const timer = setInterval(() => {
        setCounterValue((prevCounter) =>
          prevCounter + step <= actualValue ? prevCounter + step : actualValue
        );
      }, interval);

      return () => clearInterval(timer); // Clean up the interval timer
    }
  }, [actualValue]);

  const handleFundDateSelect = (date) => {
    setFirstFundDate(date);
  };

  const handleFoundationDateSelect = (date) => {
    setFoundationDate(date);
  };

  const updateChartData = () => {
    // Create a deep copy of chartData
    const newChartData = JSON.parse(JSON.stringify(chartData));

    // Modify the chart data as needed
    newChartData.datasets[0].data = [Number(fundingRounds)]; // res.data.successrate

    // Update the state with the new data
    setChartData(newChartData);
  };
  return (
    <SearchContext.Provider value={{ setSearchResultsVisible, setSearchQuery }}>
      <div>
        <FloatingChatbot className={"fixed bottom-[40px] right-[40px] z-10"} />
        <div className="fixed top-0 z-20 flex items-center justify-center w-full p-4 space-x-24 text-lg text-white bg-primary h-fit text-onPrimary">
          <a href="/about">About</a>
          <a href="#home-section">Home</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-screen transition-all duration-1000 searchbar bg-slate-200">
          {/* bg-[url('/background.jpg')] */}
          <p className="animated-title text-[80px]  text-white font-thin">
            The best investment tool for you.
          </p>
          <div className="transition-all hover:scale-105">
            <button
              variant="outline"
              size="lg"
              className="bg-[#1c1917] hover:bg-[#32302e] transition-all duration-200 text-white  rounded-full animated-title py-7 px-10 text-[30px] font-thin hover:scale-110 cursor-pointer"
              onClick={() => {
                scrollRef.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get started
            </button>
          </div>
        </div>
        <main
          className="flex flex-col items-center justify-center min-h-screen pt-2 pb-2"
          ref={scrollRef}
        >
          <div
            className={`flex flex-col justify-center  transition-all duration-700 items-center space-y-4 ${
              hasCardCategory
                ? "max-h-[1000px]"
                : "max-h-[300px] translate-y-[20%]"
            }`}
          >
            <Card className={` w-[800px] `}>
              <CardHeader>
                <CardTitle>Find your next investment</CardTitle>
                <CardDescription>
                  We&apos;ll help find the best investment for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <Label>Funds</Label>
                  <Input
                    type="number"
                    placeholder="Amount of money to be invested"
                    onChange={(e) => {
                      setInvestmentAmount(e.target.value);
                    }}
                  ></Input>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  disabled={investmentRequestLoading}
                  size="lg"
                  onClick={() => {
                    if (!investmentAmount) {
                      alert("Please fill all the fields");
                    } else {
                      handleInvestmentRequest();
                    }
                  }}
                >
                  {investmentRequestLoading ? (
                    <div className="flex ">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Please wait
                    </div>
                  ) : (
                    "Find investment"
                  )}
                </Button>
              </CardFooter>
            </Card>
            <div
              className={`flex items-center justify-center transition-all duration-500 overflow-hidden ${
                hasCardCategory ? "opacity-1" : "opacity-0"
              }`}
            >
              <div className="grid grid-cols-2 grid-rows-3 gap-2 place-items-center ">
                {cardCategories.map((element, index) => (
                  <GradientCard
                    key={index}
                    imageUrl={encodeURIComponent(element)}
                    description={descriptions[element]}
                    category={element}
                    className={""}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>

        <div className="flex items-center justify-center w-full h-screen">
          <Card
            className={`${
              isExpanded
                ? "max-w-[800px] min-h-[800px] translate-y-3"
                : "max-w-[650px] min-h-[500px] "
            } transition-all duration-700 w-full h-fit `}
          >
            <CardHeader>
              <CardTitle>Likelihood of success</CardTitle>
              <CardDescription>
                How likely are you to get a return on your investment?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 content">
              <div>
                <Label>Funding rounds</Label>
                <Input
                  type="number"
                  placeholder="How many times the company has been funded"
                  onChange={(e) => {
                    setFundingRounds(e.target.value);
                  }}
                ></Input>
              </div>
              <div>
                <Label>Total Funding</Label>
                <Input
                  type="number"
                  placeholder="Total amount of money funded"
                  onChange={(e) => {
                    setTotalFunding(e.target.value);
                  }}
                ></Input>
              </div>
              <div className="flex flex-col">
                <Label>First fund date</Label>
                <div className="flex justify-center">
                  <DatePicker onDateSelect={handleFundDateSelect} />
                </div>
              </div>

              <div>
                <Label>Short description</Label>
                <Input
                  onChange={(e) => {
                    setShortDescription(e.target.value);
                  }}
                  type="text"
                  placeholder="Company description"
                ></Input>
              </div>
              <div>
                <Label>Foundation date</Label>
                <div className="flex justify-center">
                  <DatePicker onDateSelect={handleFoundationDateSelect} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center footer">
              <Button
                disabled={successRequestLoading}
                onClick={() => {
                  if (
                    !fundingRounds ||
                    !totalFunding ||
                    !firstFundDate ||
                    !shortDescription ||
                    !foundationDate
                  ) {
                    alert("Please fill all the fields");
                  } else {
                    handleSuccessRequest();
                  }
                }}
                size="lg"
              >
                {successRequestLoading ? (
                  <div className="flex ">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Please wait
                  </div>
                ) : (
                  "Find investment"
                )}
              </Button>
            </CardFooter>

            <CardContent
              className={`content flex flex-col items-center h-[200px] justify-center space-y-4 ${
                isExpanded ? "visible" : "hidden"
              }`}
            >
              <div
                className={`${
                  isExpanded ? "max-h-[600px]" : ""
                } items-center justify-center max-h-[800px] pt-2`}
              >
                {isExpanded && (
                  <div className="flex items-center justify-center w-full space-y-4 ">
                    <div className="flex flex-col items-center justify-center w-full space-y-4">
                      <BarChart data={chartData} />
                    </div>
                    <p className="text-2xl font-bold text-black">
                      Likelihood of success
                    </p>

                    <p className="text-6xl font-bold text-black">
                      {counterValue}%
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="relative transition-all duration-1000 bg-cover h-screen bg-slate-200 w-full flex flex-col justify-center items-center bg-[url('/searchBackground.jpg')]">
          <div
            className={`${searchResultsVisible ? "" : "pt-96"}
             w-full flex justify-center items-center transition-all duration-700`}
          >
            <Searchbar onSubmit={handleSearch}></Searchbar>
          </div>
          <div
            className={`absolute transform w-full transition-all duration-500 ${
              searchResultsVisible ? "opacity-0" : "opacity-1"
            } `}
          >
            <p className="absolute right-[33%] text-white text-[60px] font-bold  translate-y-[70%]">
              Search For Your Next
            </p>
            <p className="absolute right-[15%]  text-black text-[60px] font-bold translate-y-[70%]">
              Investment
            </p>
          </div>

          {
            <Scrollable
              className={`${
                searchResultsVisible ? "opacity-1" : "opacity-0"
              } transition-all duration-700`}
            >
              {searchResultsLoading ? (
                // Render a loading indicator (e.g., spinner) while data is being fetched
                <Loader2 className="w-20 h-20 text-white animate-spin" />
              ) : (
                // Render the cards when data is available
                searchResults.map((card, i) => (
                  <CompanyCard
                    key={i}
                    title={card.title}
                    matchPercentage={card.matchPercentage}
                    description={card.description}
                  />
                ))
              )}
            </Scrollable>
          }
        </div>
      </div>
      <Footer />
    </SearchContext.Provider>
  );
}
