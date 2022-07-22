import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import { default as Recipe } from './index'
import { initialState } from "../../reducers/reducer";
import { createStore } from "redux";
import reducer from "../../reducers/reducer";
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

    const ul = screen.getByTestId('side');
    expect(ul).toBeInTheDocument();
  })
  test('it renders a h2 tag', () => {
    const btn = screen.getByRole('h2')
    // fireEvent.click(side);
    expect(btn).toBeInTheDocument();
  })
  // test('it renders a h1 tag', () => {
  //   const btn = screen.getByRole('h1')
  //   // fireEvent.click(side);
  //   expect(btn).toBeInTheDocument();
  // })
  // test('it renders a li tag', () => {
  //   const btn = screen.getByRole('li')
  //   // fireEvent.click(side);
  //   expect(btn).toBeInTheDocument();
  // })

  // test('it renders a ol tag', () => {
  //   const btn = screen.getByRole('ol')
  //   // fireEvent.click(side);
  //   expect(btn).toBeInTheDocument();
  // })

})

describe("MealPlan redux 2", () => {
  function renderWithProviders(ui, { reduxState } = {}) {
    const store = createStore(reducer, reduxState || initialState);
    return render(<Provider store={store}><Router>{ui}</Router></Provider>);
  }
  const navigate = jest.fn();
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  test("Generate meal plan appears", () => {
    renderWithProviders(<Recipe />, {
      reduxState: {
        recipes: { breakfast: [], lunch: [], dinner: [], dessert: [], snacks: [] },
        recipe_id: "12",
        users_recipe_history: [
          {
            date: "date", recipes: {
              breakfast: [{ id: "12", title: "", fave: "" }],
              lunch: [{ id: "12", title: "", fave: "" }],
              dinner: [{ id: "12", title: "", fave: "" }],
              dessert: [{ id: "12", title: "", fave: "" }],
              snacks: [{ id: "12", title: "fgdfgfd", fave: false }]
            }
          }
        ],
        meal_plan_recipes: {
          breakfast: ["meal"], lunch: ["meal"], dinner: [], dessert: [], snacks: []
        },
        viewed_recipes: [],
        shopping_list: [],
        user_budget: { breakfast: 0, lunch: 0, dinner: 0, snack: 0, dessert: 0 },
        user_meals: { breakfast: false, lunch: false, dinner: false, snack: false, dessert: false },
        diet: { vegan: true, vegetarian: false, glutenFree: false, ketogenic: false, pescetarian: false, paleo: false },
        intolerances: ["egg"],
        preferences_set: true,
        random_recipe: { title: "no recipe" },
        nutrition_widget: "no widget"
      }
    })
    // const ul = screen.getByTestId('side');
    // expect(ul).toBeInTheDocument();
    // // const heading = screen.getByTestId("getMealsBtn");
    // // expect(heading.textContent).toMatch(/Generate meal plan/i);

    // const btn = screen.getByRole('h2')
    // // fireEvent.click(side);
    // expect(btn).toBeInTheDocument();

  })
})