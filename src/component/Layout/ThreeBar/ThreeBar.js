import classes from "./ThreeBar.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TheatersIcon from "@mui/icons-material/Theaters";
import TvIcon from "@mui/icons-material/Tv";
import PhoneIcon from "@mui/icons-material/Phone";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
function ThreeBar() {
  const [clickedBar, setClickedBar] = useState(false);
  const showdivHandler = () => {
    setClickedBar((prev) => !prev);
  };

  const navBarData = [
    {
      name: "Movie",
      icon: <TheatersIcon sx={{ color: "tomato" }} />,
      link: "/",
    },
    { name: "TV", icon: <TvIcon sx={{ color: "tomato" }} />, link: "/tv" },
    { name: "Contact", icon: <PhoneIcon sx={{ color: "tomato" }} />, link: "" },
    { name: "About", icon: <InfoIcon sx={{ color: "tomato" }} />, link: "" },
    { name: "登出", icon: <LogoutIcon sx={{ color: "tomato" }} />, link: "" },
  ];

  let barCssclasses = clickedBar
    ? `${classes.clickedEachDiv}`
    : `${classes.eachDiv}`;

  return (
    <div className={classes.mainDiv}>
      <div onClick={showdivHandler} className={classes.threeBarDiv}>
        <div className={barCssclasses}></div>
      </div>
      {clickedBar && (
        <div className={classes.navLinkDiv}>
          {navBarData.map((each) => (
            <div>
              <div className={classes.navLinkPDiv}>
                {each.icon}
                <Link
                  className={classes.phoneNavLink}
                  to={each.link !== "" ? each.link : "/"}
                >
                  <p className={classes.navlinkP}>{each.name}</p>
                </Link>
              </div>
              <hr className={classes.navlinkHr} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ThreeBar;
