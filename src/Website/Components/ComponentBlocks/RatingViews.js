const RatingViews = (props) => {
  const { Data } = props;

  return (
    <div className="rating-views" id="Rating">
      <div className="rating-grid">
        {Data.Rating.map((item) => {
          return (
            <span className="rating-block">
              <div className="rating-number">{item.ratingNumber}</div>
              <p className="rating-type">{item.ratingDesc}</p>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default RatingViews;
