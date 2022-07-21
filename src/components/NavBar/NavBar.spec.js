import { default as NavBar } from ".";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import store from "../../store";
import { default as reducer } from '../../reducers/index'
import onBtnClick from '.'
import "@testing-library/jest-dom";
import axios from 'axios';


describe("NavBar", () => {
  const navigate = jest.fn();
  const Nav = (
    <Provider store={store}>
      <Router>
        <NavBar />
      </Router>
    </Provider>
  );

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    render(Nav);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("it renders the button 'Logout' ", () => {
    const link = screen.getByText(/logout/i);
    expect(link).toBeTruthy();
    // fireEvent.click(button);
    // expect(navigate).toHaveBeenCalledWith("/");
  });

  test("the link takes you to the home page", () => {
    const side = screen.getByTestId("side");
    const link = screen.getByText(/Home/i);
    fireEvent.click(side);
    expect(link).toBeTruthy();
    fireEvent.click(link);
    expect(navigate).toHaveBeenCalledWith("/");
  });

  test("the link takes you to the mealplan page", () => {
    const side = screen.getByTestId("side");
    const link = screen.getByText(/Meal plan/i);
    fireEvent.click(side);
    expect(link).toBeTruthy();
    fireEvent.click(link);
    expect(navigate).toHaveBeenCalledWith("/mealplan");
  });

  test("the link takes you to the shoppinglist page ", () => {
    const side = screen.getByTestId("side");
    const link = screen.getByText(/Shopping list/i);
    fireEvent.click(side);
    expect(link).toBeTruthy();
    fireEvent.click(link);
    expect(navigate).toHaveBeenCalledWith("/shoppinglist");
  });

  test("the link takes you to the history page", () => {
    const side = screen.getByTestId("side");
    const link = screen.getByText(/Recipe history/i);
    fireEvent.click(side);
    expect(link).toBeTruthy();
    fireEvent.click(link);
    expect(navigate).toHaveBeenCalledWith("/history");
  });

  test("the link takes you to the login page", () => {
    const side = screen.getByTestId("side");
    const link = screen.getByText(/Login/i);
    fireEvent.click(side);
    expect(link).toBeTruthy();
    fireEvent.click(link);
    expect(navigate).toHaveBeenCalledWith("/login");
  });

  test("the link takes you to the login page", () => {
    const side = screen.getByTestId("side");
    const link = screen.getByText(/Preferences/i);
    fireEvent.click(side);
    expect(link).toBeTruthy();
    fireEvent.click(link);
    expect(navigate).toHaveBeenCalledWith("/preferences");
  });

  test("it takes you to recipe page and sets recipe state id ", () => {
    const side = screen.getByTestId("side");
    const side2 = screen.getByTestId("modal");
    fireEvent.click(side);

    expect(side2).toHaveStyle("display: block");
    fireEvent.click(side);
    expect(side2).toHaveStyle("display: none");
  });

  // test("it takes you to recipe page and sets recipe state id ", () => {
  //   const side = screen.getByTestId("side");
  //   const side2 = screen.getByTestId("modal");
  //   // fireEvent.click(side);

  //   expect(side2).toHaveStyle("display: none");
  // });

  test("it takes you to recipe page and sets recipe state id ", () => {
    const side = screen.getByTestId("side");
    const side2 = screen.getByTestId("modal");
    fireEvent.click(side);

    expect(side2).toHaveStyle("display: block");
  });

});

describe("api Navbar", () => {
  const navigate = jest.fn();
  const Nav = (
    <Provider store={store}>
      <Router>
        <NavBar />
      </Router>
    </Provider>
  );

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    render(Nav);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("test api ", async () => {
    const side = screen.getByTestId("side");
    const side2 = screen.getByTestId("modal");
    fireEvent.click(side);
    // const averagePrice = await onBtnClick(fireEvent.click(side));
    // expect(side.classList).toContain("navIcon", "navIconBorder");
    // expect(averagePrice).toEqual({ 'message': 'User logged out' });
    // expect(side2).toHaveStyle("display: block");
  });
});
