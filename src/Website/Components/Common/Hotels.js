import { useEffect, useState } from "react";
import Cards from "./Cards";

const Hotels = (props) => {
  const { Data, revisedData, bookedDestination, setBookedHotel } = props;

  const [AllHotels, setAllHotels] = useState(true);

  const hotelsData = revisedData.map((item) => item.hotels).flat() || [];
  const hotels = hotelsData.sort((a, b) => b.rating - a.rating);

  const filterHotel =
    bookedDestination.length !== 0 && AllHotels
      ? bookedDestination[0]?.hotels
      : hotels;

  const [hotelsList, sethotelsList] = useState(hotels);
  const [hotelsViewMore, setHotelsViewMore] = useState(false);

  const handleHotels = () => {
    sethotelsList(filterHotel);
    setAllHotels(!AllHotels);
  };

  useEffect(() => {
    setAllHotels(filterHotel);
  }, [bookedDestination]);

  const hotelsCardsData = {
    Data: Data,
    destination: hotelsList,
    setBookedHotel: setBookedHotel,
    id: "hotels",
  };

  return (
    <div className="hotels" id="Hotels">
      <div className="hotels-offers">
        <img src="./Hotel/hotelsPlanImg.jpg" className="hotels-bgimg" />
        <span className="hotels-specialTag">
          {Data.LabelData.specialOffers}
        </span>
        <div
          className={`hotels-offersblock ${
            hotelsViewMore && "hotel-offersViewMore"
          }`}
        >
          <div
            className={`hotel-offersTag ${
              hotelsViewMore && "hotel-offersTagViewMore"
            }`}
          >
            <div className="hotels-offersText">
              <span>{Data.LabelData.flat}</span>{" "}
              <span>
                {Data.Destination["hotels-discount"]} <br />
              </span>
              <div className="hotels-offersOnlineText">
                {Data.LabelData.onOnlineBooking}
              </div>
            </div>
          </div>
          <div className="hotel-searchBlock">
            <p className="hotel-searchText">{Data.LabelData.searchHotels}</p>
            <button
              onClick={() => bookedDestination.length !== 0 && handleHotels()}
              className={`hotels-searchBtn ${
                bookedDestination.length !== 0 ? "" : "hotels-searchdisabledBtn"
              }`}
            >
              {!AllHotels
                ? Data.LabelData.searchAllHotelsAvaliable
                : Data.LabelData.searchHotelsnearBookedDestination}
            </button>
          </div>
        </div>
      </div>
      <div className="hotels-cardsBlock">
        <p className="hotels-cardsNote">{Data.LabelData.selectNote}</p>
        <div
          className={`hotels-cards ${
            hotelsViewMore && hotelsList.length > 1
              ? "hotels-viewMore"
              : "hotels-viewMoreHidden"
          }`}
        >
          <Cards {...hotelsCardsData} />
        </div>
        <div className="hotels-cardsviewMoreBlock">
          <button
            className={`hotels-viewMoreBtn
            ${
              hotelsList.length === 2
                ? "hotels-cards2"
                : hotelsList.length === 1
                ? "hotels-cards1"
                : ""
            }
          `}
            onClick={() => setHotelsViewMore(!hotelsViewMore)}
          >
            {hotelsViewMore ? Data.LabelData.viewLess : Data.LabelData.viewMore}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Hotels;
