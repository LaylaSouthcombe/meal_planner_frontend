import React from "react";
import { useNavigate } from "react-router-dom";
import backArrow from "../../images/backArrow.png";

import "./style.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        data-testid="back"
        className="backButton"
        onClick={() => navigate("/")}
      >
        <img src={backArrow} alt="back button" />
        <p>Home</p>
      </div>
      <div className="notFound">
        <h1>404</h1>
        <h2>Opps! Page not found, let's return to home and try again :( </h2>
      </div>
    </>
  );
};

export default PageNotFound;
