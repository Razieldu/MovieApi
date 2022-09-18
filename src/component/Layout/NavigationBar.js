import React, { useEffect, useState } from "react";
import classes from "./NavigationBar.module.css";
import { Link } from "react-router-dom";
import Cart from "./Cart/Cart";
import ThreeBar from "./ThreeBar/ThreeBar";
function NavigationBar() {
  const [showBar, setShowBar] = useState(false);
  let width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
  useEffect(() => {
    if (width <= 576) {
      setShowBar(true);
    }
  }, [width]);

  return (
    <div className={classes.navigationDiv}>
      <Link className={classes.linkH1logo} to={"/"}>
        <h1 className={classes.logo}>KoreaDramaix</h1>
      </Link>
      {!showBar&&<div className={classes.ulDiv}>
        <li>
          <Link className={classes.linkH1} to={"/"}>
            <h1 className={classes.items}>Movie</h1>
          </Link>
        </li>
        <li>
          <Link className={classes.linkH1} to={"/tv"}>
            <h1 className={classes.items}>TV</h1>
          </Link>
        </li>
        <li>
          <h1 className={classes.items}>Contact</h1>
        </li>
        <li>
          <h1 className={classes.items}>About</h1>
        </li>
        {/* <li>
          <h1 className={classes.items}>客服中心</h1>
        </li> */}
      </div>}
      {showBar && <ThreeBar />}
      {!showBar && (
        <div className={classes.buttonAndCartDiv}>
          {/* <Cart /> */}
          <button>登出</button>
        </div>
      )}
    </div>
  );
}

export default NavigationBar;
