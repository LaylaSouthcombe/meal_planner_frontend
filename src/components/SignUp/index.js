import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [errorVisibility, setErrorVisibility] = useState("hidden");

  const backendUrl = "https://mealplannerserver.herokuapp.com/";
  const route = "createuser/";

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        setErrorVisibility("visible");
        setError("Fields should not be empty");
      } else if (password.length < 4) {
        setErrorVisibility("visible");
        setError("Your password should be at least 5 characters long!");
      } else if (password !== confirmPassword) {
        setErrorVisibility("visible");
        setError("Make sure password and confirm password match!");
      } else {
        // console.log({ name, email, password });
        await axios.post(
          `${backendUrl}${route}`,
          JSON.stringify({ name, email, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        dispatch({ type: "SET LOGIN OR REGISTER", payload: "register" });
        dispatch({ type: "SET EMAIL", payload: email });
        navigate("/MealPlan");
        setName("");
        setPassword("");
        setEmail("");
        setConfirmPassword("");
      }
    } catch (err) {
      if (!err?.response) {
        setError("No server response!");
      } else if (err.response?.status === 500) {
        setError(
          "Request to create a user was not successful! Make sure your passwords match!"
        );
        setErrorVisibility("visible");
        setTimeout(() => {
          setErrorVisibility("hidden");
        }, "2000");
      } else {
        setErrorVisibility("visible");
        setTimeout(() => {
          setErrorVisibility("hidden");
        }, "2000");
      }
    }
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  return (
    <>
      <form
        aria-label="login"
        data-testid="form"
        className="loginForm"
        onSubmit={handleSignUp}
      >
        <h2 className="registerHeader">Create Account</h2>
        <div
          className="loginError"
          data-testid="error"
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
        <label htmlFor="name" className="loginNameLabel">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoFocus
          placeholder="name"
          value={name}
          onChange={onNameChange}
          data-testid="nameInput"
          className="signname"
        />
        <label htmlFor="password" className="signUpPasswordLabel">
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
        <label htmlFor="confirmPassword" className="confirmPasswordLabel">
          Confirm password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          autoFocus
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          data-testid="confirmPasswordInput"
          className="confirmPasswordInput"
        />
        <button className="signUp">Sign up</button>
        <button
          className="haveAccount"
          data-testid="button1"
          onClick={() => navigate("/Login")}
        >
          Already have an account?
        </button>
      </form>
    </>
  );
};

export default SignUp;
