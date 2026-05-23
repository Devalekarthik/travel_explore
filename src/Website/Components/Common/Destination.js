import { useCallback, useEffect, useMemo, useState } from "react";
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

  const revisedCountry = useMemo(
    () => revisedData.filter((item) => item.country === selectedCountry),
    [revisedData, selectedCountry]
  );

  const countries = useMemo(
    () =>
      ["All Country", ...new Set(revisedData.map((item) => item.country))].sort(),
    [revisedData]
  );
  const countryOption = countries.map((item) => ({ label: item, value: item }));

  const handleNavbar = useCallback((type) => {
    const DataType = (revised) =>
      type !== "All" ? revised.filter((item) => item.type === type) : revised;

    const revisedNavbar =
      selectedCountry === "All Country"
        ? DataType(revisedData)
        : DataType(revisedCountry);
    setNavbarType(type);
    setDestination(revisedNavbar);
  }, [revisedCountry, revisedData, selectedCountry]);

  const navbar = useMemo(() => {
    const navbarItems = [
      ...new Set(
        (selectedCountry === "All Country" ? revisedData : revisedCountry).map(
          (item) => item.type
        )
      ),
    ];
    navbarItems.unshift("All");
    return navbarItems.sort();
  }, [revisedCountry, revisedData, selectedCountry]);

  useEffect(() => {
    setDestination(revisedCountry);
    handleNavbar("All");
  }, [handleNavbar, revisedCountry, selectedCountry]);

  useEffect(() => {
    setDestination(revisedData);
    setSelectedCountry("All Country");
  }, [revisedData]);

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
                key={item}
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
            className={`destination-viewMoreBtn destination-cards${destination.length}`}
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
