import React, { useEffect, useState } from "react";
import Select from "react-select";
import Cards from "./Cards";

const Destination = (props) => {
  const { Data, revisedData, setBookedDestination } = props;

  const [destination, setDestination] = useState([]);
  const [navbarType, setNavbarType] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState();
  const [searchBox, setSearchBox] = useState("");
  const [destinationViewMore, setDestinationViewMore] = useState(false);

  const search = () => {
    setSelectedCountry(searchBox);
  };

  const revisedCountry = revisedData.filter(
    (item) => item.country === selectedCountry
  );

  const countries = [...new Set(revisedData.map((item) => item.country))];
  countries.unshift("All Country");
  countries.sort();
  const countryOption = countries.map((item) => ({ label: item, value: item }));

  const handleNavbar = (type) => {
    const DataType = (revised) =>
      type !== "All" ? revised.filter((item) => item.type === type) : revised;

    const revisedNavbar =
      selectedCountry === "All Country"
        ? DataType(revisedData)
        : DataType(revisedCountry);
    setNavbarType(type);
    setDestination(revisedNavbar);
  };

  const navbar = [
    ...new Set(
      (selectedCountry === "All Country" ? revisedData : revisedCountry).map(
        (item) => item.type
      )
    ),
  ];
  navbar.unshift("All");
  navbar.sort();

  useEffect(() => {
    setDestination(revisedCountry);
    handleNavbar("All");
  }, [selectedCountry]);

  useEffect(() => {
    setDestination(revisedData);
    setSelectedCountry("All Country");
  }, []);

  const destinationCardData = {
    Data: Data,
    destination: destination,
    setBookedDestination: setBookedDestination,
    id: "places",
  };

  return (
    <>
      <div className="destination" id="Search Destinations">
        <p className="destination-title">{Data.Destination.title}</p>
        <p className="destination-subTitle">{Data.Destination.subTitle}</p>

        <div className="destination-search">
          <Select
            placeholder={Data.PlaceHolderLabel.selectCountry}
            isSearchable={true}
            options={countryOption}
            onChange={(e) => setSearchBox(e.value)}
          />
          <button
            onClick={() => search()}
            className={`destination-searchBtn ${
              searchBox !== "" ? "" : "destination-disabledBtn"
            }`}
            disabled={searchBox !== "" ? false : true}
          >
            {Data.LabelData.search}
          </button>
        </div>

        <div className="destination-navbar">
          {navbar.map((item) => {
            return (
              <button
                onClick={() => handleNavbar(item)}
                className={`destination-navbarBtn ${
                  navbarType === item ? "destination-selectedButton" : ""
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
        <p className="destination-cardsNote">{Data.LabelData.selectNote}</p>
        <div
          className={`destination-cards 
          ${
            destinationViewMore && destination.length > 1
              ? "destination-viewMore"
              : ""
          }
          `}
        >
          <Cards {...destinationCardData} />
        </div>
        <div className="destination-viewMoreBlock">
          <button
            className={`destination-viewMoreBtn
            ${
              destination.length === 4
                ? "destination-cards4"
                : destination.length === 3
                ? "destination-cards3"
                : destination.length === 2
                ? "destination-cards2"
                : destination.length === 1
                ? "destination-cards1"
                : ""
            }`}
            onClick={() => setDestinationViewMore(!destinationViewMore)}
          >
            {destinationViewMore
              ? Data.LabelData.viewLess
              : Data.LabelData.viewMore}
          </button>
        </div>
      </div>
    </>
  );
};
export default Destination;
