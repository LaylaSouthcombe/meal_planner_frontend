import { default as Login } from ".";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import "@testing-library/jest-dom";

describe("Category", () => {
  const login = (
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  test("it renders", () => {
    render(login);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toMatch(/login/i);
  });

  test("it navigates you one page back", () => {
    render(login);
    const back = screen.queryByTestId(/back/i);
    fireEvent.click(back);
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
