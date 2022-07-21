import React from "react";
import { useNavigate } from "react-router-dom";

import { UserPreferenceComponent } from "../../components";
import backArrow from "../../images/backArrow.png";

const UserPreferences = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        data-testid="back"
        className="backButton"
        onClick={() => navigate(-1)}
      >
        <img src={backArrow} alt="back button" />
        <p>Back</p>
      </div>
      <UserPreferenceComponent />
    </>
  );
};

export default UserPreferences;
