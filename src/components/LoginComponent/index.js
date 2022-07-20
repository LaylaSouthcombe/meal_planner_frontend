import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    console.log(data)
    dispatch({ type: "SET USER RECIPE HISTORY", payload: data });
  }

  const getUserPreferences = async () => {
    const { data } = await axios.get(
      `${backendUrl}prefs/`);
    console.log(data)
    // const calorieLimits = data[0].calories_limit
    const budgets = data[0].budget
    const intolerences = data[0].intolorences
    const userMeals = data[1]
    console.log("user meals", userMeals)
    // console.log("calories limit", calorieLimits)
    console.log("budget", budgets)
    console.log("intolerances", intolerences)
    // const formattedCaloriesString = calorieLimits.replaceAll(`'`, `"`)
    // console.log("formatted calories", formattedCaloriesString)
    const formattedbudgetsString = budgets.replaceAll(`'`, `"`)
    console.log("formatted budgets", formattedbudgetsString)
    // const caloriesObj = JSON.parse(formattedCaloriesString)
    const budgetObj = JSON.parse(formattedbudgetsString)
    // console.log("caloriesObj", caloriesObj)
    console.log("budgetObj", budgetObj)
    // dispatch({ type: "SET USER CALORIES", payload: caloriesObj });
    dispatch({ type: "SET USER BUDGETS", payload: budgetObj });
    dispatch({ type: "SET USER MEALS", payload: userMeals });
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
        await getUserMealHistory()
        //TODO: set to history state
        //TODO: set first in array to meal plane
        await getUserPreferences()
        //get preferences

        dispatch({ type: "SET LOGIN OR REGISTER", payload: "login" });
        dispatch({ type: "SET USER STATE", payload: true });
        dispatch({ type: "SET PREFERENCES SET", payload: true });

        navigate("/MealPlan");
      }
    } catch (err) {
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
      <form
        aria-label="login"
        data-testid="form"
        className="loginForm"
        onSubmit={handleSignIn}
      >
        <h2 className="LoginHeader">Login</h2>
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
        <button data-testid="loginBtn" className="Login">Login</button>
        <button
          className="haveAccount"
          data-testid="button1"
          onClick={() => navigate("/register")}
        >
          Don't have an account?
        </button>
      </form>
    </>
  );
};

export default LoginComponent;
