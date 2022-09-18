import classes from "./ThreeBar.module.css";
import React, { useState } from "react";
// import * as MuiIcons from "@mui/icons-material"
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

  // const chooseIcon = (option) => {
  //   const IconName = Muicon[option];
  // };

  const navBarData = [
    { name: "Movie", icon: <TheatersIcon sx={{ color: "tomato" }} /> },
    { name: "TV", icon: <TvIcon sx={{ color: "tomato" }} /> },
    { name: "Contact", icon: <PhoneIcon sx={{ color: "tomato" }} /> },
    { name: "About", icon: <InfoIcon sx={{ color: "tomato" }} /> },
    { name: "登出", icon: <LogoutIcon sx={{ color: "tomato" }} /> },
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
                <p className={classes.navlinkP}>{each.name}</p>
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
