import React from "react";
import Data from "../../Data/data.json";
import Navbar from "../ComponentBlocks/Navbar";
import Banner from "../ComponentBlocks/Banner";
import RatingViews from "../ComponentBlocks/RatingViews";
import PopularDestination from "../ComponentBlocks/PopularDestination";
import BookingBlock from "../ComponentBlocks/BookingBlock";
import ChooseUs from "../ComponentBlocks/ChooseUs";
import ClientsReview from "../ComponentBlocks/ClientsReview";
import ContactDetails from "../ComponentBlocks/ContactDetails";
import Portfolio from "../ComponentBlocks/Portfolio";
import Footer from "../ComponentBlocks/Footer";

const HomePage = () => {
  let DataJSON = {
    Data: Data,
  };

  return (
    <div className="home">
      <Navbar {...DataJSON} />
      <Banner {...DataJSON} />
      <div className="home-info">
        <RatingViews {...DataJSON} />
        <PopularDestination {...DataJSON} />
        <BookingBlock {...DataJSON} />
        <ChooseUs {...DataJSON} />
        <ClientsReview {...DataJSON} />
        <ContactDetails {...DataJSON} />
        <Portfolio {...DataJSON} />
      </div>
      <Footer {...DataJSON} />
    </div>
  );
};
export default HomePage;
