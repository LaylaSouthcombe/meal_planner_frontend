import { default as SignUp } from ".";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import "@testing-library/jest-dom";
import axios from "axios";

describe("SignUp", () => {
  const navigate = jest.fn();
  jest.mock("axios", () => ({
    ...jest.requireActual("axios"),
    post: jest.fn(),
  }));
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  const correct = (
    <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
  );

  test("it renders the button 'Go to register' ", () => {
    render(correct);
    const button = screen.getByRole("button", {
      name: /Already have an account?/i,
    });
    fireEvent.click(button);
    expect(navigate).toHaveBeenCalledWith("/Login");
  });

  test("it lets you input an email", () => {
    render(correct);
    const email = screen.getByTestId("emailInput");
    expect(email.value).toMatch("");
    fireEvent.change(email, { target: { value: "testing" } });
    expect(email.value).toMatch("testing");
  });

  test("it lets you input an email", () => {
    render(correct);
    const name = screen.getByTestId("nameInput");
    expect(name.value).toMatch("");
    fireEvent.change(name, { target: { value: "testing" } });
    expect(name.value).toMatch("testing");
  });

  test("it lets you input an email", () => {
    render(correct);
    const confirmPasswordInput = screen.getByTestId("confirmPasswordInput");
    expect(confirmPasswordInput.value).toMatch("");
    fireEvent.change(confirmPasswordInput, { target: { value: "testing" } });
    confirmPasswordInput;
  });

  test("it lets you input an password", () => {
    render(correct);
    const password = screen.getByTestId("passwordInput");
    expect(password.value).toMatch("");
    fireEvent.change(password, { target: { value: "testing" } });
    expect(password.value).toMatch("testing");
  });

  test("shows error message for empty fields", () => {
    render(correct);
    const errorM = screen.getByTestId("error");
    const button = screen.getByRole("button", {
      name: /Sign up/i,
    });
    fireEvent.click(button);
    expect(errorM).toHaveStyle("visibility: visible;");
    expect(errorM.textContent).toMatch(/Fields should not be empty/i);
  });

  test("shows error for password less than 5 characters", () => {
    render(correct);
    const name = screen.getByTestId("nameInput");
    const password = screen.getByTestId("passwordInput");
    const confirmPasswordInput = screen.getByTestId("confirmPasswordInput");
    const email = screen.getByTestId("emailInput");
    fireEvent.change(name, { target: { value: "testing" } });
    fireEvent.change(email, { target: { value: "testing@test.com" } });
    fireEvent.change(password, { target: { value: "tes" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "tes" } });
    const errorM = screen.getByTestId("error");
    const button = screen.getByRole("button", {
      name: /Sign up/i,
    });
    fireEvent.click(button);
    expect(errorM).toHaveStyle("visibility: visible;");
    expect(errorM.textContent).toMatch(
      /Your password should be at least 5 characters long!/i
    );
  });

  test("shows error for password less than 5 characters", () => {
    render(correct);
    const name = screen.getByTestId("nameInput");
    const password = screen.getByTestId("passwordInput");
    const confirmPasswordInput = screen.getByTestId("confirmPasswordInput");
    const email = screen.getByTestId("emailInput");
    fireEvent.change(name, { target: { value: "testing" } });
    fireEvent.change(email, { target: { value: "testing@test.com" } });
    fireEvent.change(password, { target: { value: "tesa" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "tesaa" } });
    const errorM = screen.getByTestId("error");
    const button = screen.getByRole("button", {
      name: /Sign up/i,
    });
    fireEvent.click(button);
    expect(errorM).toHaveStyle("visibility: visible;");
    expect(errorM.textContent).toMatch(
      /Make sure password and confirm password match!/i
    );
  });

  test("post in axios", () => {
    render(correct);
    const name = screen.getByTestId("nameInput");
    const password = screen.getByTestId("passwordInput");
    const confirmPasswordInput = screen.getByTestId("confirmPasswordInput");
    const email = screen.getByTestId("emailInput");
    fireEvent.change(name, { target: { value: "testing" } });
    fireEvent.change(email, { target: { value: "testing@test.com" } });
    fireEvent.change(password, { target: { value: "tesaaa" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "tesaaa" } });
    const button = screen.getByRole("button", {
      name: /Sign up/i,
    });
    fireEvent.click(button);

    expect(axios.post).toHaveBeenCalled();
    // With(
    //   "https://mealplannerserver.herokuapp.com/createuser/",
    //   expect.objectContaining({
    //     name: "testing",
    //     email: "testing@test.com",
    //     password: "tesaaa",
    //   })
    // );
  });

  test("naviagate", () => {
    render(correct);
    const name = screen.getByTestId("nameInput");
    const password = screen.getByTestId("passwordInput");
    const confirmPasswordInput = screen.getByTestId("confirmPasswordInput");
    const email = screen.getByTestId("emailInput");
    fireEvent.change(name, { target: { value: "testing" } });
    fireEvent.change(email, { target: { value: "testing@test.com" } });
    fireEvent.change(password, { target: { value: "tesaaa" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "tesaaa" } });
    const button = screen.getByRole("button", {
      name: /Sign up/i,
    });
    fireEvent.click(button);
    expect(email.value).toMatch("");
    expect(password.value).toMatch("");
    expect(confirmPasswordInput.value).toMatch("");
    expect(name.value).toMatch("");
  });

  test("it renders the form ", () => {
    render(correct);
    const div = screen.queryByTestId(/form/i);
    expect(div).toBeTruthy();
  });

  test("it renders the button 'Go to sign in' ", () => {
    render(correct);
    const button = screen.getByRole("button", {
      name: /Sign up/i,
    });
    expect(button).toBeTruthy();
  });
});
