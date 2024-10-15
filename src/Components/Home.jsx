import React, { useState } from "react";
import Services from "./Services";
import Portfolios from "./Portfolios";
import Blogs from "./Blogs";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Team from "./Team";
import SubHome from "./SubHome";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosContact } from "react-icons/io";

const Home = ({ active, setActive, messages = [] }) => {
  // Ensure messages has a default value as an array
  const [newList, setNewList] = useState([]);
  const [portfolioList, setPortfolioList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [teamList, setTeamList] = useState([]);

  return (
    <section className="relative">
      {/* Fixed Header */}
      <div className="h-14 bg-white rounded-r-lg w-[82%] md:none border border-b-2 fixed top-0 z-50">
        <div className="flex flex-wrap justify-between items-center h-full text-[#2986FE] pr-6">
          <div>
            <h2 className="font-mono text-xl ms-4">DashBoard</h2>
          </div>
          {messages.length === 0 ? (
            <></>
          ) : (
            <div className="bg-red-500 w-2 h-2 rounded-full absolute right-20 top-3"></div>
          )}
          <div className="flex">
            <IoIosNotificationsOutline className="mx-2 cursor-pointer text-3xl" />
            <IoIosContact className="mx-2 cursor-pointer text-3xl" />
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex">
        {/* Main content based on the active state */}
        <div className="w-full mt-16 relative z-0">
          {active === "Home" && (
            <SubHome
              newList={newList}
              setNewList={setNewList}
              portfolioList={portfolioList}
              setPortfolioList={setPortfolioList}
              serviceList={serviceList}
              setServiceList={setServiceList}
              messages={messages} // Ensure messages is passed correctly
            />
          )}
          {active === "Services" && (
            <Services
              newList={newList}
              setNewList={setNewList}
              portfolioList={portfolioList}
              setPortfolioList={setPortfolioList}
              serviceList={serviceList}
              setServiceList={setServiceList}
              messages={messages}
            />
          )}
          {active === "Blogs" && (
            <Blogs
              newList={newList}
              setNewList={setNewList}
              portfolioList={portfolioList}
              setPortfolioList={setPortfolioList}
              serviceList={serviceList}
              setServiceList={setServiceList}
              messages={messages}
            />
          )}
          {active === "Portfolios" && (
            <Portfolios
              portfolioList={portfolioList}
              setPortfolioList={setPortfolioList}
              newList={newList}
              setNewList={setNewList}
              serviceList={serviceList}
              setServiceList={setServiceList}
              messages={messages}
            />
          )}
          {active === "Testimonials" && (
            <Testimonials
              newList={newList}
              setNewList={setNewList}
              portfolioList={portfolioList}
              setPortfolioList={setPortfolioList}
              serviceList={serviceList}
              setServiceList={setServiceList}
              customerList={customerList}
              setCustomerList={setCustomerList}
              messages={messages}
            />
          )}
          {active === "Team" && (
            <Team
              newList={newList}
              setNewList={setNewList}
              portfolioList={portfolioList}
              setPortfolioList={setPortfolioList}
              serviceList={serviceList}
              setServiceList={setServiceList}
              customerList={customerList}
              setCustomerList={setCustomerList}
              messages={messages}
              teamList={teamList}
              setTeamList={setTeamList}
            />
          )}
          {active === "Contact" && (
            <Contact
              newList={newList}
              setNewList={setNewList}
              portfolioList={portfolioList}
              setPortfolioList={setPortfolioList}
              serviceList={serviceList}
              setServiceList={setServiceList}
              messages={messages}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
