import { useEffect, useRef, useState } from "react";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CancelIcon from "@mui/icons-material/Cancel";
import Login from "./Login";

const Navbar = (props) => {
  const { Data } = props;

  const [navbarIcon, setNavbarIcon] = useState(true);
  const [activeTab, setActiveTab] = useState(Data.Header["nav-name"][0].tab);
  const navbarRef = useRef(null);

  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [logOut, setLogOut] = useState(false);

  const loginDataDetails = {
    Data: Data,
    loginData: loginData,
    setLoginData: setLoginData,
    setLogOut: setLogOut,
  };

  const closeMobileMenu = () => {
    if (window.innerWidth <= 1200) {
      setNavbarIcon(true);
    }
  };

  const getScrollOffset = () => {
    const navbarHeight = navbarRef.current?.offsetHeight || 80;
    return navbarHeight + 24;
  };

  const scrollToSection = (tab) => {
    const section = document.getElementById(tab);

    if (!section) return;

    const top =
      section.getBoundingClientRect().top + window.pageYOffset - getScrollOffset();

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    setActiveTab(tab);
    closeMobileMenu();
  };

  const handleLoginButton = () => {
    if (logOut) {
      setLogOut(false);
      closeMobileMenu();
      return;
    }

    setLoginData({
      name: "",
      email: "",
      password: "",
    });
    closeMobileMenu();
  };

  useEffect(() => {
    const navItems = Data.Header["nav-name"].map((item) => item.tab);

    const handleScroll = () => {
      const scrollPoint = window.pageYOffset + getScrollOffset() + 20;
      const currentTab = navItems.reduce((current, tab) => {
        const section = document.getElementById(tab);

        if (!section) return current;

        return section.offsetTop <= scrollPoint ? tab : current;
      }, navItems[0]);

      setActiveTab(currentTab);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [Data.Header]);

  return (
    <>
      <nav className="navbar-block" ref={navbarRef}>
        <span className="navbar-logo">{Data.Header.company}</span>
        <div
          className="navbar-menuIcon"
          onClick={() => setNavbarIcon(!navbarIcon)}
        >
          {navbarIcon ? <DehazeIcon /> : <CancelIcon />}
        </div>
        <div className={`navbar-menu ${navbarIcon ? "" : "navbar-mobile"}`}>
          {Data.Header["nav-name"].map((item) => (
            <div key={item.tab}>
              <button
                type="button"
                className={`navbar-link ${
                  activeTab === item.tab ? "navbar-link-active" : ""
                }`}
                onClick={() => scrollToSection(item.tab)}
              >
                {item.tab}
              </button>
            </div>
          ))}
          <button
            className={`navbar-signUpBtn ${logOut && "navbar-signOutBtn"}`}
            data-bs-toggle={logOut ? "" : "modal"}
            data-bs-target={logOut ? "" : "#login"}
            onClick={handleLoginButton}
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
