import { default as CollapsibleRecipe } from ".";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import "@testing-library/jest-dom";

describe("Meal plan CollapsibleRecipe", () => {
  const navigate = jest.fn();
  let fullRecipes = {lunch: [{
    "id": 639620,
    "image": "https://spoonacular.com/recipeImages/639620-556x370.jpg",
    "title": "Classic New England Crab Cakes",
    "lock": true,
    "fave": true
}]}
  const componentToTest = (
    <Provider store={store}>
      <Router>
        <CollapsibleRecipe trigger="lunch" fullRecipes={fullRecipes} meal="lunch" page="mealplan"/>
      </Router>
    </Provider>
  );

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    render(componentToTest)
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("it takes you to recipe page and sets recipe state id ", () => {
    const recipe = screen.getByTestId("recipe");
    fireEvent.click(recipe);
    expect(navigate).toHaveBeenCalledWith("/recipe");
  });

  test("it unlocks the recipe when clicked ", () => {
    const lock = screen.getByTestId("lock");
    fireEvent.click(lock);
    expect(lock.classList).toContain("unlocked");
  });
  test("it locks the recipe when clicked ", () => {
    const unlock = screen.getByTestId("unlock");
    fireEvent.click(unlock);
    expect(unlock.classList).toContain("locked");
  });
  test("it unfaves the recipe when clicked ", () => {
    const fave = screen.getByTestId("faved");
    fireEvent.click(fave);
    expect(fave.classList).toContain("unfaved");
  });
})

describe("Meal plan fave function", () => {
  let fullRecipes = {lunch: [{
    "id": 639620,
    "image": "https://spoonacular.com/recipeImages/639620-556x370.jpg",
    "title": "Classic New England Crab Cakes",
    "lock": true,
    "fave": false
}]}
  const componentToTest = (
    <Provider store={store}>
      <Router>
        <CollapsibleRecipe trigger="lunch" fullRecipes={fullRecipes} meal="lunch" page="mealplan"/>
      </Router>
    </Provider>
  );

  beforeEach(() => {
    render(componentToTest)
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("it faves the recipe when clicked ", () => {
    const unfave = screen.getByTestId("unfaved");
    fireEvent.click(unfave);
    expect(unfave.classList).toContain("faved");
  });
})


///////History if statement//////////
describe("History CollapsibleRecipe", () => {
  const navigate = jest.fn();
  let fullRecipes = {lunch: [{
    "id": "639620",
    "image": "https://spoonacular.com/recipeImages/639620-556x370.jpg",
    "title": "Classic New England Crab Cakes",
    "lock": true,
    "fave": true
}]}
  const componentToTest = (
    <Provider store={store}>
      <Router>
        <CollapsibleRecipe trigger="lunch" fullRecipes={fullRecipes} meal="lunch" page="history"/>
      </Router>
    </Provider>
  );

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    render(componentToTest)
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("it takes you to recipe page and sets recipe state id ", () => {
    const recipe = screen.getByTestId("recipe");
    fireEvent.click(recipe);
    expect(navigate).toHaveBeenCalledWith("/recipe");
  });

  test("it unlocks the recipe when clicked ", () => {
    const lock = screen.getByTestId("lock");
    fireEvent.click(lock);
    expect(lock.classList).toContain("unlocked");
  });
  test("it locks the recipe when clicked ", () => {
    const unlock = screen.getByTestId("unlock");
    fireEvent.click(unlock);
    expect(unlock.classList).toContain("locked");
  });
  test("it unfaves the recipe when clicked ", () => {
    const fave = screen.getByTestId("faved");
    fireEvent.click(fave);
    expect(fave.classList).toContain("unfaved");
  });
})

describe("History fave function", () => {
  let fullRecipes = {lunch: [{
    "id": "639620",
    "image": "https://spoonacular.com/recipeImages/639620-556x370.jpg",
    "title": "Classic New England Crab Cakes",
    "lock": true,
    "fave": false
}]}
  const componentToTest = (
    <Provider store={store}>
      <Router>
        <CollapsibleRecipe trigger="lunch" fullRecipes={fullRecipes} meal="lunch" page="history"/>
      </Router>
    </Provider>
  );

  beforeEach(() => {
    render(componentToTest)
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("it faves the recipe when clicked ", () => {
    const unfave = screen.getByTestId("unfaved");
    fireEvent.click(unfave);
    expect(unfave.classList).toContain("faved");
  });
})