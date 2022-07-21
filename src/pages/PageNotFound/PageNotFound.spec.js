import { default as PageNotFound } from ".";
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
        <PageNotFound />
      </Router>
    </Provider>
  );

  test("it renders the h1 'category' ", () => {
    render(page);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toMatch(
      /Opps! Page not found, let's return to home and try again/i
    );
  });

  test("it navigates you one page back", () => {
    render(page);
    const back = screen.queryByTestId(/back/i);
    fireEvent.click(back);
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
