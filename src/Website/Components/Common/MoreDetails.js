import React, { useEffect, useState } from "react";
import ReadMoreandLess from "./ReadMoreandLess";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-scroll";
import Select from "react-select";
import { validateBookingForm } from "./Validation";
import FormInput from "./FormInput";
import Modal from "./Modal";
import StarRating from "./StarRating";

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
    const error = validateBookingForm(
      inputData,
      detailsCountry,
      AllCountry,
      id,
      Data.ErrorLabel
    );

    if (error === null) {
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
      <Modal
        id={id}
        title={id === "places" ? "Trip Details" : "Hotel Details"}
        showCloseButton={true}
      >
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
                <StarRating rating={selectedCard[0]?.rating} />
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
        <div class="modal-footer">
          <button
            class="btn btn-primary"
            data-bs-target={`#${id}2`}
            data-bs-toggle="modal"
          >
            {Data.LabelData.form}
          </button>
        </div>
      </Modal>
      <Modal
        id={`${id}2`}
        title={Data.LabelData.clientDetails}
        showCloseButton={true}
      >
        <div className="moreDetails-form">
          <div className="moreDetails-formInput">
            <FormInput
              type="text"
              placeholder={Data.PlaceHolderLabel.name}
              name="Fname"
              onChange={handleData}
              value={inputData.Fname}
              error={error?.Fname}
              errorClassName="moreDetails-errorTag"
            />
          </div>
          <div className="moreDetails-formInput">
            <FormInput
              type="email"
              placeholder={Data.PlaceHolderLabel.email}
              name="Email"
              onChange={handleData}
              value={inputData.Email}
              error={error?.Email}
              errorClassName="moreDetails-errorTag"
            />
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
            <FormInput
              type="number"
              placeholder={Data.PlaceHolderLabel.mobileNo}
              name="MobileNo"
              onChange={handleData}
              value={inputData.MobileNo}
              error={error?.MobileNo}
              errorClassName="moreDetails-errorTag"
            />
          </div>
          <div className="moreDetails-formInput">
            <FormInput
              type="date"
              placeholder={Data.PlaceHolderLabel.dateTravel}
              name="TDate"
              onChange={handleData}
              value={inputData.TDate}
              inputClassName="moreDetails-formDate"
              error={error?.TDate}
              errorClassName="moreDetails-errorTag"
            />
          </div>
          <div className="moreDetails-formInput">
            <FormInput
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
              error={id === "places" ? error?.Members : error?.Rooms}
              errorClassName="moreDetails-errorTag"
            />
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
      </Modal>
      <Modal
        id={`${id}3`}
        title=""
        showCloseButton={true}
        className="modal3"
      >
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
      </Modal>
    </div>
  );
};
export default MoreDetails;
