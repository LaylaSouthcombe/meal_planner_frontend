import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./style.css";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorVisibility, setErrorVisibility] = useState("hidden");

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const backendUrl = "https://mealplannerserver.herokuapp.com/";

  const getUserMealHistory = async () => {
      const { data } = await axios.get(
        `${backendUrl}mealhistory/`);
        dispatch({ type: "SET USER RECIPE HISTORY", payload: data });
    dispatch({ type: "SET MEAL PLAN RECIPES", payload: data[0].recipes });
  }

  const getUserPreferences = async () => {
    const { data } = await axios.get(
      `${backendUrl}prefs/`);
    console.log(data)
      const budgets = data[0].budget
      const intolerences = data[0].intolorences
      const userMeals = data[8]
      const formattedbudgetsString = budgets.replaceAll(`'`, `"`)
      const budgetObj = JSON.parse(formattedbudgetsString)
      console.log("budgetObj", budgetObj)
      dispatch({ type: "SET USER BUDGETS", payload: budgetObj });
      dispatch({ type: "SET USER MEALS", payload: userMeals });
      dispatch({ type: "SET USER INTOLERANCES", payload: intolerences });
  }
  const handleSignIn = async (e) => {
    e.preventDefault();
    const route = "login/";
    try {
      if (email === "" || password === "") {
        setErrorVisibility("visible");
        setError("Fields should not be empty");
      } else {
        await axios.post(
          `${backendUrl}${route}`,
          JSON.stringify({ email, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        await getUserMealHistory();
        await getUserPreferences();
        dispatch({ type: "SET LOGIN OR REGISTER", payload: "login" });
        dispatch({ type: "SET USER STATE", payload: true });
        dispatch({ type: "SET PREFERENCES SET", payload: true });
        navigate("/MealPlan");
      }
    } catch (err) {
      console.log(err)
      if (!err?.response) {
        setError("No server response!");
      } else if (err.response?.status === 401) {
        setError(
          "Unauthorized! Create an account or check your email/password!"
        );
        setErrorVisibility("visible");
        setTimeout(() => {
          setErrorVisibility("hidden");
        }, "2000");
      } else {
        setError("Login failed!");
        setErrorVisibility("visible");
        setTimeout(() => {
          setErrorVisibility("hidden");
        }, "2000");
      }
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
        <h1 className="LoginHeader">Login</h1>
      <div className="login2">
        <form
          aria-label="login"
          data-testid="form"
          className="loginForm"
          onSubmit={handleSignIn}
        >
          <div
            data-testid="error"
            className="loginError"
            style={{ visibility: errorVisibility }}
          >
            {error && error}
          </div>
          <label htmlFor="email" className="signEmailLabel">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoFocus
            placeholder="Email"
            value={email}
            onChange={onEmailChange}
            data-testid="emailInput"
            className="signEmail"
          />
          <label htmlFor="password" className="signPasswordLabel">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoFocus
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
            data-testid="passwordInput"
            className="signPassword"
          />
          <button className="Login">Login</button>
        </form>
        <div className="btndiv2">
          <button
            className="haveAccount2" id="loginBtn"
            data-testid="button1"
            onClick={() => navigate("/register")}
          >
            Don't have an account?
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
