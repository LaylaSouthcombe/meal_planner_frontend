import { default as Register } from ".";
import { screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import "@testing-library/jest-dom";

describe("Register", () => {
  const register = (
    <Provider store={store}>
      <Router>
        <Register />
      </Router>
    </Provider>
  );
  test("it renders", () => {
    render(register);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toMatch(/Create Account/i);
  });
  test("it renders", () => {
    render(register);
    const heading = screen.getByRole("button", {
      name: /sign up/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
