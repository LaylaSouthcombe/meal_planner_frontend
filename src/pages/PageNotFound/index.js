import React from "react";
import { useNavigate } from "react-router-dom";
import backArrow from "../../images/backArrow.png";

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
        <h1>Opps! Page not found, let's return to home and try again</h1>
      </div>
    </>
  );
};

export default PageNotFound;
