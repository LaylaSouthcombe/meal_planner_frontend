import { default as Shopping } from ".";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import "@testing-library/jest-dom";
import * as redux from 'react-redux'

describe("Category", () => {
  const navigate = jest.fn();
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  const page = (
    <Provider store={store}>
      <Router>
        <Shopping  />
      </Router>
    </Provider>
  );

  test("it renders the h1 'category' ", () => {
    render(page);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toMatch(/ShoppingList/i);
  });
  test("it renders the image ", () => {
    render(page);
    const img = screen.getByRole("img");
    expect(img.alt).toContain("back button");
  });

  test("it renders the no shopping list ", () => {
    render(page);
    // stateShoppingList  =0 ;
    const text = screen.getByTestId("custom-element");
    expect(text.textContent).toContain("You have not got a shopping list, generate a meal plan");
  });

  // test("it renders shopping list ", () => {
  //   const spy = jest.spyOn(redux, 'useSelector')
  //   spy.mockReturnValue({ username:'test' })
  //   render(page);
  //   // stateShoppingList  =0 ;
  //   const text = screen.getByTestId("custom-element");
  //   expect(text.textContent).toContain("You have not got a shopping list, generate a meal plan");
  // });

  test("it navigates you one page back", () => {
    render(page);
    const back = screen.queryByTestId(/back/i);
    fireEvent.click(back);
    expect(navigate).toHaveBeenCalledWith(-1);
  });

  test("it navigates you one page back", () => {
    render(page);
    const back = screen.queryByTestId(/mealnav/i);
    fireEvent.click(back);
    expect(navigate).toHaveBeenCalledWith("/mealplan");
  });


});
