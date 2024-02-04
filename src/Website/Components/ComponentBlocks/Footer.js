import { useEffect, useState } from "react";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const Footer = (props) => {
  const { Data } = props;

  const PortfolioData = Data.Portfolio;

  const [subEmail, setSubEmail] = useState({
    email: "",
  });

  const [footerError, setFooterError] = useState();
  const [emailSuccess, setEmailSuccess] = useState(false);

  const handlefooteremail = (e) => {
    setSubEmail({ ...subEmail, [e.target.name]: e.target.value });
  };

  const footervalidation = () => {
    const redgeEmail = /^[a-z0-9A-Z]+@[a-z]+\.[a-z]{2,3}$/;

    const error = {
      email:
        subEmail.email?.length === 0
          ? Data.ErrorLabel.enterEmail
          : !redgeEmail.test(subEmail.email)
          ? Data.ErrorLabel.email
          : "",
    };

    if (error.email === "") return setFooterError(null), setEmailSuccess(true);

    return setFooterError(error);
  };

  useEffect(() => {
    setFooterError("");
    setEmailSuccess(false);
  }, [subEmail]);

  return (
    <div className="footer">
      <div className="footer-company">
        <div className="footer-title">{Data.Header.company}</div>
        <p className="footer-subTitle">{Data.Header.subTitle}</p>
        <p className="footer-info">{Data.Footer["footer-info"]}</p>
      </div>
      <div className="footer-connections">
        <div className="footer-subscribtion">
          <div className="footer-connectionTitle">
            {Data.LabelData.keepConnected}
          </div>
          <div class="form-group">
            <label
              for="recipient-name"
              class="col-form-label footer-emailLabel"
            >
              {Data.LabelData.subscribe}
            </label>
            <input
              type="text"
              class="form-control"
              id="recipient-name"
              name="email"
              placeholder={Data.PlaceHolderLabel.email}
              value={subEmail.email}
              onChange={(e) => handlefooteremail(e)}
            />
            {footerError?.email && (
              <p className="footer-error">*{footerError?.email}</p>
            )}
            {emailSuccess && (
              <p className="footer-success">
                {Data.LabelData.subscriptionSuccessful}
              </p>
            )}
            <button
              onClick={() =>
                emailSuccess ? setSubEmail({ email: "" }) : footervalidation()
              }
              className="footer-subscribeBtn"
            >
              {Data.LabelData.subscribe}
            </button>
          </div>
        </div>
        <div className="footer-contactInfo">
          <div className="footer-connectionTitle">
            {Data.LabelData.contactInfo}
          </div>
          <p className="footer-tagsInfo">
            <li>
              <PhoneAndroidRoundedIcon />{" "}
              {PortfolioData["Personal-Details"]["Mobile-No"]}
            </li>
            <li>
              <MailOutlinedIcon /> {PortfolioData["Personal-Details"].Gmail}
            </li>
            <li>
              <a href={PortfolioData["Personal-Details"]["LinkedIn-Link"]}>
                <LinkedInIcon />{" "}
                {PortfolioData["Personal-Details"]["LinkedIn-Name"]}
              </a>
            </li>
            <li>
              <HomeOutlinedIcon /> {PortfolioData["Personal-Details"].Address}
            </li>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
