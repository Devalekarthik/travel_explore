import React, { useState } from "react";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-scroll";
import Login from "./Login";

const Navbar = (props) => {
  const { Data } = props;

  const [navbarIcon, setNavbarIcon] = useState(true);

  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [logOut, setLogOut] = useState(false);
  const [logOutSucces, setlogOutSucces] = useState(false);

  const loginDataDetails = {
    Data: Data,
    loginData: loginData,
    setLoginData: setLoginData,
    setLogOut: setLogOut,
  };

  return (
    <>
      <nav className="navbar-block">
        <span className="navbar-logo">{Data.Header.company}</span>
        <div
          className="navbar-menuIcon"
          onClick={() => setNavbarIcon(!navbarIcon)}
        >
          {navbarIcon ? <DehazeIcon /> : <CancelIcon />}
        </div>
        <div className={`navbar-menu ${navbarIcon ? "" : "navbar-mobile"}`}>
          {Data.Header["nav-name"].map((item) => (
            <div>
              <Link
                activeClass="active"
                to={item.tab}
                spy={true}
                smooth={true}
                offset={-150}
                duration={1500}
                className="navbar-link"
                onClick={() => setNavbarIcon(!navbarIcon)}
              >
                {item.tab}
              </Link>
            </div>
          ))}
          <button
            className={`navbar-signUpBtn ${logOut && "navbar-signOutBtn"}`}
            data-toggle={logOutSucces ? "" : "modal"}
            data-target={logOutSucces ? "" : "#login"}
            onClick={() =>
              logOut
                ? (setLogOut(false),
                  setlogOutSucces(true),
                  setNavbarIcon(!navbarIcon))
                : (setLoginData({
                    name: "",
                    email: "",
                    password: "",
                  }),
                  setlogOutSucces(false),
                  setNavbarIcon(!navbarIcon))
            }
          >
            {logOut ? Data.LabelData.signOut : Data.LabelData.signIn}
          </button>
        </div>
      </nav>
      <Login {...loginDataDetails} />
    </>
  );
};

export default Navbar;
