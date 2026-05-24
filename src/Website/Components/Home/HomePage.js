import React, { useCallback, useEffect, useState } from "react";
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
import { fetchAllContent } from "../../api/contentApi";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(({ signal } = {}) => {
    setIsLoading(true);
    setError(null);

    return fetchAllContent({ signal })
      .then((json) => {
        setData(json);
      })
      .catch((e) => {
        if (e?.name === "AbortError") return;
        console.error(e);
        setData(null);
        setError("Unable to load website content. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load({ signal: controller.signal });
    return () => controller.abort();
  }, [load]);

  if (isLoading) return <div className="home">Loading...</div>;

  if (error) {
    return (
      <div className="home" style={{ padding: 24 }}>
        <h2 style={{ margin: 0, marginBottom: 8 }}>Something went wrong</h2>
        <p style={{ margin: 0, marginBottom: 16 }}>{error}</p>
        <button type="button" onClick={() => load()}>
          Retry
        </button>
      </div>
    );
  }

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
