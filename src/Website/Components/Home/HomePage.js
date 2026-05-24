import React, { useEffect, useState } from "react";
import LocalData from "../../Data/data.json";
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
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const response = await fetch("http://localhost:8080/api/content");
      if (!response.ok) {
        throw new Error(`Failed to load content: ${response.status}`);
      }
      const json = await response.json();
      if (isMounted) setData(json);
    };

    load().catch((e) => {
      console.error(e);
      if (isMounted) setData(LocalData);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!data) return null;

  const DataJSON = { Data: data };

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
