import { useState } from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ClientsReview = (props) => {
  const { Data } = props;

  let clientData = Data.ClientReview.sort((a, b) => b.stars - a.stars);

  let stars = (star) => {
    return (
      <span className="clients-reviewStars">
        {[...Array(star)].map(() => (
          <StarRoundedIcon />
        ))}
        {[...Array(5 - star)].map(() => (
          <StarOutlineRoundedIcon />
        ))}
      </span>
    );
  };

  const [selectedAccordion, setSelectedAccordion] = useState(0);
  const [groupImg, setGroupImg] = useState(clientData[0].groupImg);

  const [clientViewMore, setClientViewMore] = useState(false);

  const handleChange = (accordionIndex) => {
    setSelectedAccordion(
      accordionIndex === selectedAccordion ? null : accordionIndex
    );
    setGroupImg(clientData[accordionIndex].groupImg);
  };

  return (
    <>
      <div className="clients">
        <div className="clients-details">
          <div
            className={`clients-accordian ${
              clientViewMore && "clients-viewMore"
            }`}
          >
            {clientData.map((item, index) => {
              return (
                <div>
                  <Accordion
                    expanded={selectedAccordion === index}
                    defaultExpanded={selectedAccordion === 0 ? true : false}
                    onChange={() => handleChange(index)}
                    className={
                      selectedAccordion === index ? "clients-selectedCard" : ""
                    }
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div className="clients-review">
                        <div>
                          <img
                            src={item.profileImg}
                            className="clients-reviewImg"
                          />
                        </div>
                        <div className="clients-reviewTitle">
                          <span className="clients-reviewName">
                            {item.name} {stars(item.stars)}
                          </span>
                          <div className="clients-reviewEmail">
                            {item.email}
                          </div>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{item.review}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              );
            })}
          </div>
          <div className="clients-viewMoreBlock">
            <button
              className="clients-viewMoreBtn"
              onClick={() => setClientViewMore(!clientViewMore)}
            >
              {clientViewMore
                ? Data.LabelData.viewLess
                : Data.LabelData.viewMore}
            </button>
          </div>
        </div>
        <div className="clients-images">
          <img
            src={groupImg}
            className={`client-pic ${clientViewMore && "clients-viewMorePic"} `}
          />
          <img
            src="./ClientReview/ClientReview.PNG"
            className={`client-bgPic ${
              clientViewMore && "clients-viewMoreBgPic"
            }`}
          />
        </div>
      </div>
    </>
  );
};
export default ClientsReview;
