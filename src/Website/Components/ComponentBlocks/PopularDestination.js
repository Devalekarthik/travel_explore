import React from "react";
import ReadMoreandLess from "../Common/ReadMoreandLess";

const PopularDestination = (props) => {
  const { Data } = props;

  return (
    <div className="popular-destination">
      <div className="popular-wrapper" id="Popular Destinations">
        <p className="popular-title">{Data.PopularDestination.title}</p>
        <div className="popular-subTitle">
          {Data.PopularDestination.subTitle}
        </div>
        {Data.PopularDestination.travelPlaces.map((item) => {
          return (
            <div className="popularBlock">
              <div className="popularBlock-text">
                <div className="popularBlock-title">{item.title}</div>
                <p className="popularBlock-infoMobile">
                  <ReadMoreandLess
                    Data={Data}
                    text={item.info}
                  />
                </p>
                <p className="popularBlock-info">{item.info}</p>
              </div>
              <div className="popularBlock-images">
                <img src={item.img1} alt="" className="popularBlock-img" />
                <img src={item.img2} alt="" className="popularBlock-img" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PopularDestination;
