const Banner = (prop) => {
  const { Data } = prop;

  return (
    <div className="banner">
      <img src={Data?.Header?.bannerImg} className="banner-video" />
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
