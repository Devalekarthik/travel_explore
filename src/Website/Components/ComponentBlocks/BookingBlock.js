import React, { useState } from "react";
import Destination from "../Common/Destination";
import Hotels from "../Common/Hotels";

const BookingBlock = (props) => {
  const { Data } = props;

  const [bookedDestination, setBookedDestination] = useState([]);
  const [bookedHotel, setBookedHotel] = useState([]);

  let revisedData = Data.Destination.places.sort((a, b) => b.rating - a.rating);

  revisedData = revisedData
    .map((item, index) => [
      {
        ...item,
        id: index + 1,
        hotels: item.hotels
          .map((ht) => [{ ...ht, country: item.country }])
          .flat(),
      },
    ])
    .flat();

  const destinationData = {
    Data: Data,
    revisedData: revisedData,
    setBookedDestination: setBookedDestination,
  };

  const hotelsData = {
    Data: Data,
    revisedData: revisedData,
    bookedDestination: bookedDestination,
    setBookedHotel: setBookedHotel,
  };

  return (
    <div className="booking">
      <Destination {...destinationData} />
      <Hotels {...hotelsData} />
    </div>
  );
};

export default BookingBlock;
