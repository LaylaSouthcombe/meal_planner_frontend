import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import { default as Recipe } from './index'

import "@testing-library/jest-dom";


const navigate = jest.fn();

const Recipes = (
  <Provider store={store}>
    <Router>
      <Recipe />
    </Router>
  </Provider>
);
describe("Recipe", () => {


  beforeEach(async () => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    render(Recipes);
  });


  test('it renders a ul tag', () => {
    const ul = screen.getByRole('ul');
    expect(ul).toBeInTheDocument();
  })
  test('it renders a div tag', () => {
    const btn = screen.getByRole('h2')
    // fireEvent.click(side);
    expect(btn).toBeInTheDocument();
  })


})
