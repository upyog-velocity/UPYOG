import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Hamburger from "./Hamburger";
import { NotificationBell } from "./svgindex";
import { useLocation } from "react-router-dom";
import BackButton from "./BackButton";

const TopBar = ({
  img,
  isMobile,
  logoUrl,
  onLogout,
  toggleSidebar,
  ulb,
  userDetails,
  notificationCount,
  notificationCountLoaded,
  cityOfCitizenShownBesideLogo,
  onNotificationIconClick,
  hideNotificationIconOnSomeUrlsWhenNotLoggedIn,
  changeLanguage,
}) => {
  const { pathname } = useLocation();

  // const showHaburgerorBackButton = () => {
  //   if (pathname === "/digit-ui/citizen" || pathname === "/digit-ui/citizen/" || pathname === "/digit-ui/citizen/select-language") {
  //     return <Hamburger handleClick={toggleSidebar} />;
  //   } else {
  //     return <BackButton className="top-back-btn" />;
  //   }
  // };
  return (
    <div className="navbar">
      <div className="center-container back-wrapper" style={window.innerWidth <= 660 ? {display:"flex",justifyContent:"space-between"} : {display:"flex",marginRight:"2rem",marginLeft:"2rem",justifyContent:"space-between"}}>
        <div className="hambuger-back-wrapper" style={window.innerWidth <= 660 ? {display:"flex",lineHeight:"normal"} : {lineHeight:"normal"}}>
          {window.innerWidth <= 660  && <Hamburger handleClick={toggleSidebar} />}
          {/* <a href={window.location.href.includes("citizen")?"/digit-ui/citizen":"/digit-ui/employee"}><img
            className="city"
            id="topbar-logo"
            src={"https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/coat-of-arms-of-chhattisgarh.svg.png" || "https://in-egov-assets.s3.ap-south-1.amazonaws.com/images/Upyog-logo.png"}
            alt="UPYOG"
          />
          </a> */}
          <div className="heading-name">
            <h1 style={window.innerWidth <= 660 ? {fontSize:"25px",fontWeight:"500"} : {fontSize:"33px",fontWeight:"500"}}>FSSM</h1>
            <p style={window.innerWidth <= 660 ? {fontSize:"8px"} : {}}>Faecal Sludge & Septage Management</p>
          </div>
          {/* <h3>{cityOfCitizenShownBesideLogo}</h3> */}
        </div>

        <div className="RightMostTopBarOptions">
          {!hideNotificationIconOnSomeUrlsWhenNotLoggedIn ? changeLanguage : null}
          {!hideNotificationIconOnSomeUrlsWhenNotLoggedIn ? (
            <div className="EventNotificationWrapper" onClick={onNotificationIconClick}>
              {notificationCountLoaded && notificationCount ? (
                <span>
                  <p>{notificationCount}</p>
                </span>
              ) : null}
              <NotificationBell />
            </div>
          ) : null}
          <h3></h3>
          <img
          className="city unicef-logo"
          src={"https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/unicef_logo_3.png" || "https://in-egov-assets.s3.ap-south-1.amazonaws.com/images/Upyog-logo.png"}
          alt="unicef"
          style={window.innerWidth <= 660 ? {} :{marginLeft:"10px"}}
        />
        <img
          className="city chattisgarh-logo"
          src={"https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/chattisgarh_100x100.png" || "https://in-egov-assets.s3.ap-south-1.amazonaws.com/images/Upyog-logo.png"}
          alt="unicef"
          style={window.innerWidth <= 660 ? {} : {marginLeft:"10px"}}
        />
        </div>
      </div>
    </div>
  );
};

TopBar.propTypes = {
  img: PropTypes.string,
};

TopBar.defaultProps = {
  img: undefined,
};

export default TopBar;
