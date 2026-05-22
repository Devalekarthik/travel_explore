import { useState } from "react";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Portfolio = (props) => {
  const { Data } = props;

  const [selectedPortfolioCard, setSelectedPortfolioCard] =
    useState("Career Objective");

  const handlePortfolio = (title) => {
    setSelectedPortfolioCard(title === selectedPortfolioCard ? null : title);
  };

  const accordion = (title, details) => {
    return (
      <>
        <div className="portfolio-accordion">
          <Accordion
            defaultExpanded={title === "Career Objective" ? true : false}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="accordion-title">{title}</div>
            </AccordionSummary>
            <AccordionDetails>{details}</AccordionDetails>
          </Accordion>
        </div>
        <div className="portfolio-accordion-mobile">
          <Accordion
            expanded={selectedPortfolioCard === title}
            defaultExpanded={title === "Career Objective" ? true : false}
            onChange={() => handlePortfolio(title)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="accordion-title">{title}</div>
            </AccordionSummary>
            <AccordionDetails>{details}</AccordionDetails>
          </Accordion>
        </div>
      </>
    );
  };

  const PortfolioData = Data.Portfolio;

  const Portfolio = Object.entries(PortfolioData).map(([title, details]) => ({
    title,
    details,
  }));

  const PortfolioDetails = (title, details) => {
    const CareerObj = (Careerdetails) => {
      return <div className="portfolio-careerDetails">{Careerdetails}</div>;
    };

    const Skills = (SkillDetails) => {
      return (
        <div className="portfolio-skillsDetails">
          {Array.isArray(SkillDetails) ? SkillDetails.map((item, index) => (
            <div key={index}>{item}</div>
          )) : <div>{SkillDetails}</div>}
        </div>
      );
    };

    const Experience = (experienceDetails) => {
      return (
        <div className="portfolio-experienceDetails">
          <h2>
            {experienceDetails.Company} : {experienceDetails.Years}
          </h2>
          {experienceDetails?.Desc?.map((item) => (
            <div>{item}</div>
          ))}
        </div>
      );
    };

    const Education = (educationDetails) => {
      return (
        <div className="portfolio-educationDetails">
          {Object.entries(educationDetails).map(([key, value], index) => (
            <li key={index}>
              {key} : {value}
            </li>
          ))}
        </div>
      );
    };

    const Languages = (languageDetails) => {
      return (
        <div className="portfolio-languageDetails">
          {Array.isArray(languageDetails) ? languageDetails.map((item, index) => (
            <div key={index}>{item}</div>
          )) : <div>{languageDetails}</div>}
        </div>
      );
    };

    const Projects = (projectDetails) => {
      return (
        <div className="portfolio-projectDetails">
          <h3>
            {projectDetails?.Website?.Title}:{" "}
            <a href={projectDetails?.Website?.Link}>
              {projectDetails?.Website?.Name}
            </a>
          </h3>
          <h4>{projectDetails?.["Website-Desc"]?.["Desc-Title"]} :</h4>
          {projectDetails?.["Website-Desc"]?.Desc?.map((item) => (
            <li>{item}</li>
          ))}
        </div>
      );
    };

    const Certification = (certificateDetails) => {
      return (
        <div className="portfolio-certificateDetails">
          {Array.isArray(certificateDetails) ? certificateDetails.map((item, index) => (
            <li key={index}>{item}</li>
          )) : <li>{certificateDetails}</li>}
        </div>
      );
    };

    return (
      <>
        {
          {
            "Career Objective": accordion(title, CareerObj(details)),
            Skills: accordion(title, Skills(details)),
            Experience: accordion(title, Experience(details)),
            Projects: accordion(title, Projects(details)),
            Languages: accordion(title, Languages(details)),
            Education: accordion(title, Education(details)),
            Certification: accordion(title, Certification(details)),
          }[title]
        }
      </>
    );
  };

  return (
    <div className="portfolio" id="Creater">
      <div className="portfolio-details">
        <div>
          <img
            src={PortfolioData["Personal-Details"].Img}
            className="portfolio-img"
          />
        </div>
        <div className="portfolio-texts">
          <div className="portfolio-name">
            {PortfolioData["Personal-Details"].Name}
          </div>
          <div className="portfolio-role">
            {PortfolioData["Personal-Details"].Role}
          </div>
          <div className="portfolio-role">
            {PortfolioData["Personal-Details"].Designation}
          </div>
          <p className="portfolio-info">
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
      <div className="portfolio-accordionCards">
        <div className="portfolio-careerAccordion">
          {Portfolio.map((item) =>
            item.title === "Career Objective"
              ? PortfolioDetails(item.title, item.details)
              : ""
          )}
        </div>
        <div className="portfolio-detailsAccordion">
          {Portfolio.map((item) =>
            item.title !== "Career Objective"
              ? PortfolioDetails(item.title, item.details)
              : ""
          )}
        </div>
      </div>
    </div>
  );
};
export default Portfolio;
