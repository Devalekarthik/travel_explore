import React, { useEffect, useState } from "react";
import ReadMoreandLess from "./ReadMoreandLess";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-scroll";
import Select from "react-select";

const MoreDetails = (props) => {
  const { Data, selectedCard, setBookedDestination, setBookedHotel, id } =
    props;

  const [inputData, setInputData] = useState({
    Fname: "",
    Email: "",
    MobileNo: "",
    TDate: "",
    Members: "",
    Rooms: "",
  });
  const [error, setError] = useState();

  const handleData = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const [detailsCountry, setDetailsCountry] = useState("");

  const descOffers = Data.Destination?.["destination-offers"];
  const hotelsOffers = Data.Destination?.["hotels-offers"];

  const AllCountry = Data.PhoneNoValidation.sort((a, b) =>
    a.country.localeCompare(b.country)
  );

  const AllCountryOption = AllCountry.map((item) => ({
    label: item.country,
    value: item.country,
  }));

  const dataValidation = () => {
    const redgeEmail = /^[a-z0-9A-Z]+@[a-z]+\.[a-z]{2,3}$/;

    const currentDate = new Date();
    const selectedDate = new Date(inputData.TDate);
    const PhoneNoLength = AllCountry.filter(
      (item) => item.country === detailsCountry
    )[0]?.numberLength;

    const error = {
      Fname: inputData.Fname === "" ? Data.ErrorLabel.name : "",
      Email: !redgeEmail.test(inputData.Email)
        ? Data.ErrorLabel.invalidEmail
        : "",
      Country: detailsCountry === "" ? Data.ErrorLabel.selectCountry : "",
      MobileNo:
        detailsCountry === ""
          ? Data.ErrorLabel.verifyMobileNo
          : inputData.MobileNo?.length === Number(PhoneNoLength)
          ? ""
          : Data.ErrorLabel.invalidMobileNo,
      TDate:
        inputData.TDate === ""
          ? Data.ErrorLabel.enterDate
          : selectedDate - currentDate <= 0
          ? Data.ErrorLabel.expiredDate
          : "",
      Members: inputData?.Members === "" ? Data.ErrorLabel.members : "",
      Rooms: inputData?.Rooms === "" ? Data.ErrorLabel.rooms : "",
    };

    if (
      error.Fname === "" &&
      error.Email === "" &&
      error.Country === "" &&
      error.MobileNo === "" &&
      error.TDate === "" &&
      (id === "places" ? error.Members : error.Rooms) === ""
    ) {
      return setError(null);
    }

    return setError(error);
  };

  const handleBooking = () => {
    id === "places"
      ? setBookedDestination(selectedCard)
      : setBookedHotel(selectedCard);
  };

  useEffect(() => {
    setInputData({
      Fname: "",
      Lname: "",
      Email: "",
      MobileNo: "",
      TDate: "",
      Members: "",
      Rooms: "",
    });
    setError("");
  }, [selectedCard]);

  useEffect(() => {
    setError("");
  }, [inputData]);

  return (
    <div className="moreDetails">
      <div
        class="modal fade"
        id={id}
        aria-hidden="true"
        aria-labelledby={id}
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id={`${id}Label`}>
                {id === "places" ? "Trip Details" : "Hotel Details"}
              </h1>
              <button
                type="button"
                class="moreDetails-closeBTN close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="moreDetails-block">
                <div className="moreDetails-box">
                  <span className="moreDetails-boxImg">
                    <img
                      src={selectedCard[0]?.Img}
                      className="moreDetails-img"
                    />
                  </span>
                </div>
                <div className="moreDetails-info">
                  <div className="moreDetails-infoPlace">
                    <h2>{selectedCard[0]?.place}</h2>
                    <h4>
                      <LocationOnIcon />
                      {selectedCard[0]?.country}
                    </h4>
                  </div>
                  <div className="moreDetails-infoRating">
                    <h4>
                      {selectedCard[0]?.rating}
                      <StarRoundedIcon />
                    </h4>
                  </div>
                </div>
                <div className="moreDetails-readMore">
                  {id === "places" && (
                    <ReadMoreandLess Data={Data} text={selectedCard[0]?.desc} />
                  )}
                </div>
                <div className="moreDetails-info">
                  <div>
                    <h3>{Data.LabelData.price}</h3>
                  </div>
                  <div>
                    <h3>{selectedCard[0]?.["avg-cost"]}/-</h3>
                  </div>
                </div>
                <div className="moreDetails-cardDetails">
                  <h3>
                    {id === "places"
                      ? Data.LabelData.tripDetails
                      : Data.LabelData.hotelDetails}
                  </h3>
                  {id === "places" ? (
                    <>
                      {descOffers.map((item) => (
                        <li>{item}</li>
                      ))}
                    </>
                  ) : (
                    <>
                      {hotelsOffers.map((item) => (
                        <li>{item}</li>
                      ))}
                    </>
                  )}
                </div>
                <p className="moreDetails-alertMessage">
                  {Data.LabelData.formoredetailspleasefilltheform}{" "}
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary"
                data-bs-target={`#${id}2`}
                data-bs-toggle="modal"
              >
                {Data.LabelData.form}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id={`${id}2`}
        aria-hidden="true"
        aria-labelledby={`${id}2`}
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id={`${id}Label2`}>
                {Data.LabelData.clientDetails}
              </h1>
              <button
                type="button"
                class="moreDetails-closeBTN close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="moreDetails-form">
                <div className="moreDetails-formInput">
                  <input
                    type="text"
                    placeholder={Data.PlaceHolderLabel.name}
                    name="Fname"
                    onChange={handleData}
                    value={inputData.Fname}
                  />
                  {error?.Fname && (
                    <p className="moreDetails-errorTag">
                      <StarRoundedIcon />
                      {error?.Fname}
                    </p>
                  )}
                </div>
                <div className="moreDetails-formInput">
                  <input
                    type="email"
                    placeholder={Data.PlaceHolderLabel.email}
                    name="Email"
                    onChange={handleData}
                    value={inputData.Email}
                  />
                  {error?.Email && (
                    <p className="moreDetails-errorTag">
                      <StarRoundedIcon />
                      {error?.Email}
                    </p>
                  )}
                </div>
                <div className="moreDetails-formInput">
                  <Select
                    placeholder={Data.PlaceHolderLabel.selectCountry}
                    isSearchable={true}
                    options={AllCountryOption}
                    onChange={(e) => setDetailsCountry(e.value)}
                  />
                  {error?.Country && (
                    <p className="moreDetails-errorTag">
                      <StarRoundedIcon />
                      {error?.Country}
                    </p>
                  )}
                </div>
                <div className="moreDetails-formInput">
                  <input
                    type="number"
                    placeholder={Data.PlaceHolderLabel.mobileNo}
                    name="MobileNo"
                    onChange={handleData}
                    value={inputData.MobileNo}
                  />
                  {error?.MobileNo && (
                    <p className="moreDetails-errorTag">
                      <StarRoundedIcon />
                      {error?.MobileNo}
                    </p>
                  )}
                </div>
                <div className="moreDetails-formInput">
                  <input
                    type="date"
                    placeholder={Data.PlaceHolderLabel.dateTravel}
                    name="TDate"
                    onChange={handleData}
                    value={inputData.TDate}
                    className="moreDetails-formDate"
                  />
                  {error?.TDate && (
                    <p className="moreDetails-errorTag">
                      <StarRoundedIcon />
                      {error?.TDate}
                    </p>
                  )}
                </div>
                <div className="moreDetails-formInput">
                  <input
                    type="number"
                    placeholder={
                      id === "places"
                        ? Data.PlaceHolderLabel.totalMembers
                        : Data.PlaceHolderLabel.roomsRequired
                    }
                    name={id === "places" ? "Members" : "Rooms"}
                    onChange={handleData}
                    value={
                      id === "places" ? inputData.Members : inputData.Rooms
                    }
                  />
                  {(id === "places" ? error?.Members : error?.Rooms) && (
                    <p className="moreDetails-errorTag">
                      <StarRoundedIcon />
                      {id === "places" ? error.Members : error.Rooms}
                    </p>
                  )}
                </div>
                <textarea
                  placeholder={Data.PlaceHolderLabel.specificRequirement}
                  className="moreDetails-textarea"
                />
                {error ? (
                  <p className="moreDetails-errorVarify">
                    {Data.LabelData.pleaseEnterAll} <StarRoundedIcon />{" "}
                    {Data.LabelData.form}
                  </p>
                ) : (
                  error === null && (
                    <p className="moreDetails-successVarify">
                      {Data.LabelData.formisvarified}{" "}
                    </p>
                  )
                )}
              </div>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary"
                data-bs-target={`#${id}`}
                data-bs-toggle="modal"
              >
                {Data.LabelData.backtoDetails}
              </button>
              <button
                class={error === null ? "btn btn-success" : "btn btn-primary"}
                data-bs-target={`#${id}3`}
                onClick={error === null ? handleBooking : dataValidation}
                data-bs-toggle={error === null ? "modal" : ""}
              >
                {error === null
                  ? Data.LabelData.bookNow
                  : Data.LabelData.verifyForms}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id={`${id}3`}
        aria-hidden="true"
        aria-labelledby={`${id}3`}
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header modal3">
              <button
                type="button"
                class="moreDetails-closeBTN close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>
                <h1>{Data.LabelData.thankyou}</h1>
                {Data.LabelData.thankyouInfo}
              </p>
              {id === "places" && (
                <>
                  <p className="moreDetails-noteInfo">
                    <h2>{Data.LabelData.note}:</h2>
                    {Data.LabelData.noteInfo}
                  </p>
                  <p className="moreDetails-bookHotel">
                    {Data.LabelData.visitHotels}
                  </p>
                  <button
                    class="btn btn-primary"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    href=""
                  >
                    <Link
                      activeClass="active"
                      to="Hotels"
                      spy={true}
                      smooth={true}
                      offset={-150}
                      duration={1000}
                    >
                      {Data.LabelData.bookHotel}
                    </Link>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MoreDetails;
