import React from "react";

const Banner = (prop) => {
  const { Data } = prop;

  return (
    <div className="banner">
      <img src={Data?.Header?.bannerImg} className="banner-video" />
      {/* <video
        src={Data?.Header?.bannerVideo}
        className="banner-video"
        autoPlay
        loop
        muted
      /> */}
      {Data?.Header?.title && (
        <div className="banner-info">
          <div className="banner-title">{Data?.Header?.title}</div>
          <p className="banner-text">{Data?.Header?.subTitle}</p>
        </div>
      )}
    </div>
  );
};
export default Banner;
