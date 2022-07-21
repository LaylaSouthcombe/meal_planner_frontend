import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginComponent } from "../../components";
import backArrow from "../../images/backArrow.png";

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="backButton"
        data-testid="back"
        onClick={() => navigate("/")}
      >
        <img src={backArrow} alt="back button" />
        <p>Home</p>
      </div>
      <LoginComponent />
    </>
  );
};

export default Login;
