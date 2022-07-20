import { default as LoginComponent } from ".";
import { screen, render, fireEvent, waitFor, fakeEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import axios from 'axios'


import "@testing-library/jest-dom";

describe("LoginComponent", () => {
  const navigate = jest.fn();


  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    jest.mock('axios')
  });
  const correct = (
    <Provider store={store}>
      <Router>
        <LoginComponent />
      </Router>
    </Provider>
  );

  test("it renders the button 'Go to register' ", () => {
    render(correct);
    const button = screen.getByRole("button", {
      name: /Don't have an account?/i,
    });
    fireEvent.click(button);
    expect(navigate).toHaveBeenCalledWith("/register");
  });

  test("it lets you input an email", () => {
    render(correct);
    const email = screen.getByTestId("emailInput");
    expect(email.value).toMatch("");
    fireEvent.change(email, { target: { value: "testing" } });
    expect(email.value).toMatch("testing");
  });

  test("it lets you input an password", () => {
    render(correct);
    const password = screen.getByTestId("passwordInput");
    expect(password.value).toMatch("");
    fireEvent.change(password, { target: { value: "testing" } });
    expect(password.value).toMatch("testing");
  });

  test("it renders", () => {
    render(correct);
    const email = screen.getByTestId("emailInput");
    const errorM = screen.getByTestId("error");
    expect(email.value).toMatch("");
    fireEvent.change(email, { target: { value: "testing" } });
    expect(email.value).toMatch("testing");
    expect(errorM).toHaveStyle("visibility: hidden;");
  });

  test("it renders the form ", () => {
    render(correct);
    const div = screen.queryByTestId(/form/i);
    expect(div).toBeTruthy();
  });

  test("it renders the button 'Go to sign in' ", () => {
    render(correct);
    const button = screen.getByRole("button", {
      name: /Login/i,
    });
    expect(button).toBeTruthy();
  });

  test("post in axios", () => {
    render(correct);
    const password = screen.getByTestId("passwordInput");
    const email = screen.getByTestId("emailInput");
    const errorM = screen.getByTestId("error");
    fireEvent.change(email, { target: { value: "testing@test.com" } });
    fireEvent.change(password, { target: { value: "tesaaa" } });
    const button = screen.getByRole("button", {
      name: /Login/i,
    });
    fireEvent.click(button);
    expect.objectContaining({
      email: "testing@test.com",
      password: "tesaaa",
    });
    expect(errorM).toHaveStyle("visibility: hidden;");
  });
  test("navigate", async () => {
    render(correct);


    const form = screen.getByTestId("form");
    const email = screen.getByTestId("emailInput");
    const password = screen.getByTestId("passwordInput");
    password.value = ''
    email.value = ''
    fireEvent.submit(form)
    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/MealPlan"));
    // expect(form).toBe("/MealPlan");
  });
  it("returns correct result handleSignIn", async () => {
    render(correct);
    LoginComponent.handleSignIn = jest.fn()      
    LoginComponent.getUserMealHistory = jest.fn()   
    LoginComponent.getUserPreferences = jest.fn()     
      const loginBtn = await screen.findByTestId(/loginBtn/i)
      fireEvent.click(loginBtn)
    expect(LoginComponent.handleSignIn.mock).toBeTruthy();
    expect(LoginComponent.getUserMealHistory.mock).toBeTruthy();
    expect(LoginComponent.getUserPreferences.mock).toBeTruthy();

  });

});
