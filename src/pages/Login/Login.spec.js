import { default as Login } from ".";
import { screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import "@testing-library/jest-dom";

describe("Category", () => {
  test("it renders", () => {
    const login = (
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    render(login);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toMatch(/login/i);
  });
});
