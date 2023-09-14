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

const labels = ["Success rate"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Success Evaluation",
      data: [100],
      backgroundColor: ["rgb(32, 33, 35, 0.8)"],
      borderColor: ["rgb(0, 0, 0)"],
      borderWidth: 1,
      borderRadius: 20,
      borderSkipped: false,
    },
  ],
};

function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

export default function Home() {
  const descriptions = [
    {
      "Software & Web Development":
        "Tools and platforms for designing, developing, and managing websites and applications.",
      "Mobile Apps & Platforms":
        "Applications, tools, and platforms designed for mobile devices and related commerce.",
      "Biotech & Pharma":
        "Science-driven sectors focusing on life improvement through genetics, diagnostics, and medicines.",
      "E-Commerce & Shopping":
        "Online platforms and tools facilitating purchase, sale, and discovery of products.",
      "Web Content & Communities":
        "Platforms for creating, discovering, and discussing online content.",
      "Health & Wellness":
        "Sectors dedicated to physical, mental, and holistic well-being and medical care.",
      "Business Services & Analytics":
        "Tools and services enhancing business processes, intelligence, and development.",
      "Media, Video & Entertainment":
        "Platforms and tools related to video, music, film, and entertainment consumption.",
      "Gaming & Leisure":
        "Interactive entertainment across online, console, and mobile platforms.",
      "Social Media & Networks":
        "Platforms enabling social interaction, content sharing, and networking.",
      "Financial & Payments":
        "Tools and platforms related to banking, finance, and transaction processing.",
      "Education & Learning":
        "Platforms and tools aimed at teaching, learning, and training across various fields.",
      "Real Estate & Construction":
        "Sectors associated with property trade, construction, and commercial spaces.",
      "Travel & Tourism":
        "Services related to travel, accommodation, and tourism.",
      "Food & Beverages":
        "Sectors related to food production, restaurants, brewing, and drinks.",
      "Advertising & Marketing":
        "Platforms and strategies for promoting, advertising, and optimizing brand presence.",
      "Hardware & Electronics":
        "Physical tech devices, from everyday electronics to innovative wearables.",
      "Energy & Environment":
        "Clean and renewable energy solutions, and environmental conservation initiatives.",
      "Transportation & Vehicles":
        "Automotive solutions, public transport, and innovations in transportation.",
      "Security & Protection":
        "Services and tools ensuring digital, network, and data safety and privacy.",
      "Manufacturing & Robotics":
        "Industrial solutions, automation, and machinery production.",
      "Design & Art":
        "Visual and creative sectors encompassing art, graphic design, and photography.",
      "Networking & Communication":
        "Infrastructure and tools for communication and networking.",
      "Agriculture & Farming":
        "Tech and solutions related to farming, dairy, and sustainable agriculture.",
      "Legal & Regulation":
        "Tech and services aiding legal processes, compliance, and regulatory adherence.",
      "Sports & Recreation":
        "Recreational activities, sports goods, and outdoor adventure.",
      "Fashion & Beauty":
        "Industries related to clothing, cosmetics, jewelry, and beauty.",
      "Pets & Animals":
        "Goods and services related to pet care and animal welfare.",
      "Events & Hospitality":
        "Services and platforms for event management and hospitality solutions.",
      "Collaboration & Productivity":
        "Tools and platforms enhancing team collaboration and task management.",
      "Consumer Services":
        "Goods and services directly catering to consumer needs and interests.",
      "SaaS & Cloud":
        "Software and services provided via the internet, focusing on cloud solutions.",
      "Startups & Small Businesses":
        "Solutions and platforms catering to entrepreneurial ventures and SMBs.",
      "Lifestyle & Consumer Goods":
        "Goods and services aimed at improving and catering to lifestyle choices.",
      "Insurance & Risk":
        "Solutions related to insurance policies and risk management.",
      "Publishing & Journalism":
        "Platforms and services related to journalism, content publishing, and magazines.",
      "IoT & Devices":
        "Tech associated with interconnected devices, wearables, and sensors.",
      "Data & Analytics":
        "Services and tools focused on big data, data visualization, and analytics.",
      "Elderly & Disabled Care":
        "Services and tools designed for the care and well-being of the elderly and disabled.",
      "Nonprofit & Charity":
        "Organizations and initiatives dedicated to philanthropy and social welfare.",
      "Government & Military":
        "Services and innovations related to governance, administration, and defense.",
      "Human Resources & Recruitment":
        "Tools and platforms aiding in HR processes and talent recruitment.",
      "Dating & Relationships":
        "Platforms and services aimed at forming and enhancing personal relationships.",
      "Mental & Psychological Health":
        "Platforms and services catering to mental health and psychology.",
      "Family & Parenting":
        "Services and tools dedicated to family welfare, childcare, and parenting.",
      "Research & Development":
        "Sectors focused on innovation, research, and developmental projects.",
      "Virtual Reality & Augmented Reality":
        "Technologies providing immersive and enhanced virtual experiences.",
      "Blockchain & Cryptocurrency":
        "Tech related to digital currencies and decentralized data structures.",
      "Natural Resources & Agriculture":
        "Sectors focusing on sustainable agriculture and resource management.",
      "Space & Satellite":
        "Technologies and innovations related to space travel and satellite communications.",
      "Drones & Aerial Tech":
        "Technological advancements in unmanned aerial vehicles.",
      "Marine & Water Tech":
        "Solutions related to water purification and marine technologies.",
      "Renewable Tech & Environment":
        "Tech promoting environmental conservation and renewable energy.",
      "Supply Chain & Logistics":
        "Solutions related to supply chain management and logistics.",
      "Cannabis & Marijuana":
        "Industries associated with the production and sale of cannabis products.",
      "Emerging Tech":
        "Frontiers of technology including advanced materials and nanotechnology.",
    },
  ];
  const [hasSearch, setHasSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsError, setSearchResultsError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [actualValue, setActualValue] = useState(data.datasets[0].data[0]); // Set your actual value here
  const [counterValue, setCounterValue] = useState(0);
  const [hasCardCategory, setHasCardCategory] = useState(false);
  const [isFundingExpanded, setIsFundingExpanded] = useState(false);
  const [cardCategories, setCardCategories] = useState([
    "Cannabis & Marijuana",
    "Software & Web Development",
    "Emerging Tech",
    "Renewable Tech & Environment",
    "Drones & Aerial Tech",
    "Government & Military",
  ]);
  const [investmentRequestLoading, setInvestmentRequestLoading] =
    useState(false);
  const [successRequestLoading, setSuccessRequestLoading] = useState(false);
  const scrollRef = useRef(null);
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

  return (
    <SearchContext.Provider value={{ setHasSearch }}>
      <div>
        <FloatingChatbot className={"fixed bottom-[40px] right-[40px]"} />

        <div className=" transition-all duration-1000 searchbar h-screen  bg-slate-200 w-full flex flex-col justify-center items-center  ">
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
          className="flex min-h-screen flex-col items-center justify-between pt-2 pb-2"
          ref={scrollRef}
        >
          <div
            className={`flex flex-col h-screen justify-center transition-all duration-700 items-center space-y-4 ${
              isFundingExpanded ? "h-[900px]" : ""
            }`}
            // pb-[700px],
          >
            <Card className="w-[800px]">
              <CardHeader>
                <CardTitle>Find your next investment</CardTitle>
                <CardDescription>
                  We&apos;ll help find the best investment for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <Label>Funds</Label>
                  <Input placeholder="Amount of money to be invested"></Input>
                </div>
                {/* <div>
                  <Label>Short description</Label>
                  <Input type="text" placeholder="Company description"></Input>
                </div> */}
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  disabled={investmentRequestLoading}
                  size="lg"
                  onClick={() => {
                    setInvestmentRequestLoading(true);
                    setHasCardCategory(true);
                    setIsFundingExpanded(true);
                  }}
                >
                  {investmentRequestLoading ? (
                    <div className="flex ">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </div>
                  ) : (
                    "Find investment"
                  )}
                </Button>
              </CardFooter>
            </Card>
            <div
              className={` flex items-center justify-center transition-all duration-500 overflow-hidden ${
                hasCardCategory ? "max-h-[600px]" : "max-h-0"
              }`}
            >
              <div className="grid grid-cols-2 grid-rows-3  gap-2 place-items-center ">
                {cardCategories.map((element, index) => (
                  <GradientCard
                    key={index} // Add a unique key to each card if these are rendered in a list.
                    imageUrl={encodeURIComponent(element)}
                    description={descriptions[0][element]}
                    category={element}
                    className={""}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full h-screen  flex justify-center items-center">
            <Card
              className={`${
                isExpanded
                  ? "max-w-[800px] min-h-[800px] "
                  : "max-w-[650px] min-h-[500px] "
              } transition-all duration-700 w-full h-fit `}
            >
              <CardHeader>
                <CardTitle>Likelihood of success</CardTitle>
                <CardDescription>
                  How likely are you to get a return on your investment?
                </CardDescription>
              </CardHeader>
              <CardContent className="content space-y-8">
                <div>
                  <Label>Funding rounds</Label>
                  <Input placeholder="How many times the company has been funded"></Input>
                </div>
                <div>
                  <Label>Total Funding</Label>
                  <Input
                    type="text"
                    placeholder="Total amount of money funded"
                  ></Input>
                </div>
                <div className="flex flex-col">
                  <Label>First and last fund dates</Label>
                  <div className="flex justify-center">
                    <DatePicker />
                  </div>
                </div>

                <div>
                  <Label>Short description</Label>
                  <Input type="text" placeholder="Company description"></Input>
                </div>
                <div>
                  <Label>Company age</Label>
                  <Input type="text" placeholder="Age in years"></Input>
                </div>
              </CardContent>
              <CardFooter className="footer flex justify-center">
                <Button
                  disabled={successRequestLoading}
                  onClick={() => {
                    setSuccessRequestLoading(true);

                    setIsExpanded(!successRequestLoading);
                    setTimeout(function () {
                      // scrollToBottom();
                    }, 100);
                    setCounterValue(0);
                  }}
                  size="lg"
                >
                  {successRequestLoading ? (
                    <div className="flex ">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
                    <div className="flex  items-center justify-center space-y-4  w-full ">
                      <div className="flex flex-col items-center justify-center space-y-4 w-full">
                        <BarChart data={data} />
                      </div>
                      <p className="text-black text-2xl font-bold">
                        Likelihood of success
                      </p>

                      <p className="text-black text-6xl font-bold">
                        {counterValue}%
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <div className="relative transition-all duration-1000 bg-cover h-screen bg-slate-200 w-full flex flex-col justify-center items-center bg-[url('/searchBackground.jpg')]">
          <div
            className={`${hasSearch ? "" : "pt-96"}
             w-full flex justify-center items-center transition-all duration-700`}
          >
            <Searchbar></Searchbar>
          </div>
          <div
            className={`absolute transform w-full transition-all duration-500 ${
              hasSearch ? "opacity-0" : "opacity-1"
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
