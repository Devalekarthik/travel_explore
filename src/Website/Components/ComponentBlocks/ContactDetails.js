import { useEffect, useState } from "react";
import "bootstrap-4-react";
import "bootstrap";
import { validateContactForm } from "../Common/Validation";
import FormInput from "../Common/FormInput";

const ContactDetails = (props) => {
  const { Data } = props;

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    message: "",
  });
  const [contactError, setContactError] = useState();
  const [contactFormVarify, setcontactFormVarify] = useState(false);

  const handleContactInput = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const contactDataValidation = () => {
    const error = validateContactForm(contactData, Data.ErrorLabel);

    if (error === null)
      return setContactError(null), setcontactFormVarify(!contactFormVarify);
    return setContactError(error);
  };

  useEffect(() => {
    setContactError("");
  }, [contactData]);

  return (
    <div className="contact" id="Contact">
      <div className="contact-details">
        <div className="contact-img">
          <img src="./ContactUs/ContactUs.jpg" className="contact-image" />
        </div>
        <div className="contact-form">
          <div className="contact-title">{Data.ContactUs.Title}</div>
          <p className="contact-subTitle">{Data.ContactUs["title-info"]}</p>
          <div class="form-group">
            <FormInput
              type="text"
              name="name"
              placeholder={Data.PlaceHolderLabel.name}
              value={contactData.name}
              onChange={(e) => handleContactInput(e)}
              error={contactError?.name}
              errorClassName="contact-error"
            />
            <FormInput
              type="email"
              name="email"
              placeholder={Data.PlaceHolderLabel.email}
              value={contactData.email}
              onChange={(e) => handleContactInput(e)}
              error={contactError?.email}
              errorClassName="contact-error"
            />
            <FormInput
              type="number"
              name="phoneNo"
              placeholder={`${Data.PlaceHolderLabel.mobileNo} ${Data.PlaceHolderLabel.optional}`}
              value={contactData.phoneNo}
              onChange={(e) => handleContactInput(e)}
            />
            <textarea
              class="form-control"
              placeholder={Data.PlaceHolderLabel.message}
              rows="2"
              name="message"
              value={contactData.message}
              onChange={(e) => handleContactInput(e)}
            />
            <div className="contact-formbtn">
              <button
                className={`contact-submitbtn
                  ${
                    contactError === null
                      ? "btn btn-success"
                      : "btn btn-primary"
                  }
                `}
                onClick={() =>
                  contactError === null
                    ? setContactData({
                        name: "",
                        email: "",
                        phoneNo: "",
                        message: "",
                      })
                    : contactDataValidation()
                }
              >
                {contactError === null
                  ? Data.LabelData.submit
                  : Data.LabelData.varifyDetails}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactDetails;
