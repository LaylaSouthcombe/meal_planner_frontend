import { default as UserPreferences } from ".";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import "@testing-library/jest-dom";

describe("UserPreferences", () => {
  const navigate = jest.fn();
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  const userP = (
    <Provider store={store}>
      <Router>
        <UserPreferences />
      </Router>
    </Provider>
  );
  test("it renders", () => {
    render(userP);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toMatch(/Set Preferences/i);
  });

  test("it navigates you one page back", () => {
    render(userP);
    const back = screen.queryByTestId(/back/i);
    fireEvent.click(back);
    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
