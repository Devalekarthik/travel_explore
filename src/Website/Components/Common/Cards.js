import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";
import MoreDetails from "./MoreDetails";
import StarRating from "./StarRating";

const Cards = (props) => {
  const { Data, destination, setBookedDestination, setBookedHotel, id } = props;

  const [selectedCard, setSelectedCard] = useState([]);

  const moreDetailsData = {
    Data: Data,
    selectedCard: selectedCard,
    setBookedDestination: setBookedDestination,
    setBookedHotel: setBookedHotel,
    id: id,
  };

  return (
    <div className="cards">
      {destination.map((item) => {
        return (
          <div className="cards-block" key={`${id}-${item?.place}`}>
            <div className="cards-blockImg">
              <img
                src={item?.Img}
                className="cards-img"
                alt={item?.place || "Destination"}
              />
              <div className="cards-details">
                <div className="cards-info">
                  <div>
                    {item?.place.length > 10
                      ? `${item?.place.substring(0, 15)}...`
                      : item?.place}
                    <div className="cards-location">
                      <LocationOnIcon /> {item?.country}
                    </div>
                  </div>
                  <div className="cards-rating">
                    <StarRating rating={item?.rating} />
                  </div>
                </div>
              </div>
              <div className="cards-onhover">
                <button
                  className="cards-onhoverBTN btn btn-primary"
                  data-bs-target={`#${id}`}
                  data-bs-toggle="modal"
                  onClick={() => setSelectedCard([item])}
                >
                  {Data.LabelData.moreDetails}
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <MoreDetails {...moreDetailsData} />
    </div>
  );
};
export default Cards;
