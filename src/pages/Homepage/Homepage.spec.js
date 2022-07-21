import { default as Homepage } from ".";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import "@testing-library/jest-dom";

describe("Category", () => {
  const navigate = jest.fn();
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  const page = (
    <Provider store={store}>
      <Router>
        <Homepage />
      </Router>
    </Provider>
  );

  test("it renders the h1 'category' ", () => {
    render(page);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toMatch(/Sooki/i);
  });
});
