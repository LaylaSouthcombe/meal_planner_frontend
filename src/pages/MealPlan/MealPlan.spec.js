import { default as MealPlan } from ".";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import "@testing-library/jest-dom";
import reducer  from "../../reducers/reducer";
import { initialState }  from "../../reducers/reducer";
import { createStore } from "redux";

import axios from 'axios';
jest.mock('axios');

describe("MealPlan", () => {
  const navigate = jest.fn();
  const mealplan = (
    <Provider store={store}>
      <Router>
        <MealPlan />
      </Router>
    </Provider>
  );

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    render(mealplan);
  });

  test("it renders", () => {
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toMatch(/Meal Plan/i);
  });
  test("it navigates you to preferences", () => {
        const prefNav = screen.queryByTestId(/prefNav/i);
        fireEvent.click(prefNav);
        expect(navigate).toHaveBeenCalledWith("/preferences");
      });
})

function renderWithProviders(ui, { reduxState } = {}) {
    const store = createStore(reducer, reduxState || initialState);
    return render(<Provider store={store}><Router>{ui}</Router></Provider>);
}

describe("MealPlan redux", () => {
    test("header not logged in", () => {
        const { getByText } = renderWithProviders(<MealPlan />, {
          store: { preferences_set: false }
        });
        getByText("Meal Plan");
      });
    test("header logged in", () => {
        const { getByText } = renderWithProviders(<MealPlan />, {
          reduxState: {
            recipes: { breakfast: [], lunch: [], dinner: [], dessert: [], snacks: [] },
            recipe_id: "12",
            users_recipe_history: [
                {
                    date: "date", recipes: {
                        breakfast: [{ id: "", title: "", fave: "" }],
                        lunch: [{ id: "", title: "", fave: "" }],
                        dinner: [{ id: "", title: "", fave: "" }],
                        dessert: [{ id: "", title: "", fave: "" }],
                        snacks: [{ id: "", title: "fgdfgfd", fave: false }]
                    }
                }
            ],
            meal_plan_recipes: {
                breakfast: [], lunch: [], dinner: [], dessert: [], snacks: []
            },
            viewed_recipes: [],
            shopping_list: [],
            user_budget: { breakfast: 0, lunch: 0, dinner: 0, snack: 0, dessert: 0 },
            user_meals: { breakfast: false, lunch: false, dinner: false, snack: false, dessert: false },
            diet: { vegan: false, vegetarian: false, glutenFree: false, ketogenic: false, pescetarian: false, paleo: false },
            intolerances: [],
            preferences_set: true
          }
        });
        getByText("You don't have a meal plan yet, create one first!");
      });
})
describe("MealPlan redux 2", () => {
    const navigate = jest.fn();
    beforeEach(() => {
        jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
      });
    test("Generate meal plan appears", () => {
        renderWithProviders(<MealPlan />, {
          reduxState: {
            recipes: { breakfast: [], lunch: [], dinner: [], dessert: [], snacks: [] },
            recipe_id: "12",
            users_recipe_history: [
                {
                    date: "date", recipes: {
                        breakfast: [{ id: "", title: "", fave: "" }],
                        lunch: [{ id: "", title: "", fave: "" }],
                        dinner: [{ id: "", title: "", fave: "" }],
                        dessert: [{ id: "", title: "", fave: "" }],
                        snacks: [{ id: "", title: "fgdfgfd", fave: false }]
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
            preferences_set: true
          }
        });
        const heading = screen.getByTestId("getMealsBtn");
        expect(heading.textContent).toMatch(/Generate meal plan/i);
    });

    test("changes button text to Generate new meal plan", async () => {
        renderWithProviders(<MealPlan />, {
          reduxState: {
            recipes: { breakfast: [], lunch: [], dinner: [], dessert: [], snacks: [] },
            recipe_id: "12",
            users_recipe_history: [
                {
                    date: "date", recipes: {
                        breakfast: [{ id: "", title: "", fave: "" }],
                        lunch: [{ id: "", title: "", fave: "" }],
                        dinner: [{ id: "", title: "", fave: "" }],
                        dessert: [{ id: "", title: "", fave: "" }],
                        snacks: [{ id: "", title: "fgdfgfd", fave: false }]
                    }
                }
            ],
            meal_plan_recipes: {
                breakfast: [{
                    "analyzedInstructions": [
                        {
                            "steps": [
                                {
                                    "number": 1,
                                    "step": "(if using meat...brown the meat really well, remove and set aside.",
                                    "ingredients": [
                                        {
                                            "id": 1065062,
                                            "name": "meat",
                                            "localizedName": "meat",
                                            "image": "whole-chicken.jpg"
                                        }
                                    ],
                                    "equipment": []
                                }
                            ]
                        }
                    ],
                    "cheap": false,
                    "dairyFree": true,
                    "extendedIngredients": [
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "original": "2 tablespoons olive oil",
                            "measures": {
                                "us": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                },
                                "metric": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                }
                            }
                        }
                    ],
                    "glutenFree": true,
                    "id": 660395,
                    "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                    "pricePerServing": 110.41,
                    "readyInMinutes": 45,
                    "servings": 8,
                    "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                    "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                    "title": "Smokey Rainbow Chili",
                    "vegan": true,
                    "vegetarian": true
                }], lunch: [{
                    "analyzedInstructions": [
                        {
                            "steps": [
                                {
                                    "number": 1,
                                    "step": "(if using meat...brown the meat really well, remove and set aside.",
                                    "ingredients": [
                                        {
                                            "id": 1065062,
                                            "name": "meat",
                                            "localizedName": "meat",
                                            "image": "whole-chicken.jpg"
                                        }
                                    ],
                                    "equipment": []
                                }
                            ]
                        }
                    ],
                    "cheap": false,
                    "dairyFree": true,
                    "extendedIngredients": [
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "original": "2 tablespoons olive oil",
                            "measures": {
                                "us": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                },
                                "metric": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                }
                            }
                        }
                    ],
                    "glutenFree": true,
                    "id": 660395,
                    "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                    "pricePerServing": 110.41,
                    "readyInMinutes": 45,
                    "servings": 8,
                    "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                    "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                    "title": "Smokey Rainbow Chili",
                    "vegan": true,
                    "vegetarian": true
                }], dinner: [{
                    "analyzedInstructions": [
                        {
                            "steps": [
                                {
                                    "number": 1,
                                    "step": "(if using meat...brown the meat really well, remove and set aside.",
                                    "ingredients": [
                                        {
                                            "id": 1065062,
                                            "name": "meat",
                                            "localizedName": "meat",
                                            "image": "whole-chicken.jpg"
                                        }
                                    ],
                                    "equipment": []
                                }
                            ]
                        }
                    ],
                    "cheap": false,
                    "dairyFree": true,
                    "extendedIngredients": [
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "original": "2 tablespoons olive oil",
                            "measures": {
                                "us": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                },
                                "metric": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                }
                            }
                        }
                    ],
                    "glutenFree": true,
                    "id": 660395,
                    "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                    "pricePerServing": 110.41,
                    "readyInMinutes": 45,
                    "servings": 8,
                    "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                    "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                    "title": "Smokey Rainbow Chili",
                    "vegan": true,
                    "vegetarian": true
                }], dessert: [{
                    "analyzedInstructions": [
                        {
                            "steps": [
                                {
                                    "number": 1,
                                    "step": "(if using meat...brown the meat really well, remove and set aside.",
                                    "ingredients": [
                                        {
                                            "id": 1065062,
                                            "name": "meat",
                                            "localizedName": "meat",
                                            "image": "whole-chicken.jpg"
                                        }
                                    ],
                                    "equipment": []
                                }
                            ]
                        }
                    ],
                    "cheap": false,
                    "dairyFree": true,
                    "extendedIngredients": [
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "original": "2 tablespoons olive oil",
                            "measures": {
                                "us": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                },
                                "metric": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                }
                            }
                        }
                    ],
                    "glutenFree": true,
                    "id": 660395,
                    "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                    "pricePerServing": 110.41,
                    "readyInMinutes": 45,
                    "servings": 8,
                    "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                    "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                    "title": "Smokey Rainbow Chili",
                    "vegan": true,
                    "vegetarian": true
                }], snacks: [{
                    "analyzedInstructions": [
                        {
                            "steps": [
                                {
                                    "number": 1,
                                    "step": "(if using meat...brown the meat really well, remove and set aside.",
                                    "ingredients": [
                                        {
                                            "id": 1065062,
                                            "name": "meat",
                                            "localizedName": "meat",
                                            "image": "whole-chicken.jpg"
                                        }
                                    ],
                                    "equipment": []
                                }
                            ]
                        }
                    ],
                    "cheap": false,
                    "dairyFree": true,
                    "extendedIngredients": [
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "original": "2 tablespoons olive oil",
                            "measures": {
                                "us": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                },
                                "metric": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                }
                            }
                        }
                    ],
                    "glutenFree": true,
                    "id": 660395,
                    "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                    "pricePerServing": 110.41,
                    "readyInMinutes": 45,
                    "servings": 8,
                    "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                    "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                    "title": "Smokey Rainbow Chili",
                    "vegan": true,
                    "vegetarian": true
                }]
            },
            viewed_recipes: [],
            shopping_list: [],
            user_budget: { breakfast: 10, lunch: 0, dinner: 0, snack: 0, dessert: 0 },
            user_meals: { breakfast: true, lunch: false, dinner: false, snack: false, dessert: false },
            diet: { vegan: false, vegetarian: false, glutenFree: false, ketogenic: false, pescetarian: false, paleo: false },
            intolerances: [],
            preferences_set: true
          }
        });
        const submitMeal = screen.getByTestId("submitMeal");
        expect(submitMeal.textContent).toMatch(/Submit meal plan/i);
        fireEvent.click(submitMeal)

        const getMealsBtn = await screen.findByRole('button', {name: 'Generate meal plan'})
        expect(getMealsBtn.textContent).toMatch(/Generate meal plan/i);
    });
})
describe("MealPlan redux 2", () => {
    const navigate = jest.fn();
    beforeEach(() => {
        jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
      });

    const dummyResponse = [{
        "analyzedInstructions": [
            {
                "steps": [
                    {
                        "number": 1,
                        "step": "(if using meat...brown the meat really well, remove and set aside.",
                        "ingredients": [
                            {
                                "id": 1065062,
                                "name": "meat",
                                "localizedName": "meat",
                                "image": "whole-chicken.jpg"
                            }
                        ],
                        "equipment": []
                    }
                ]
            }
        ],
        "cheap": false,
        "dairyFree": true,
        "extendedIngredients": [
            {
                "id": 4053,
                "name": "olive oil",
                "original": "2 tablespoons olive oil",
                "measures": {
                    "us": {
                        "amount": 2,
                        "unitShort": "Tbsps",
                        "unitLong": "Tbsps"
                    },
                    "metric": {
                        "amount": 2,
                        "unitShort": "Tbsps",
                        "unitLong": "Tbsps"
                    }
                }
            }
        ],
        "glutenFree": true,
        "id": 660395,
        "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
        "pricePerServing": 110.41,
        "readyInMinutes": 45,
        "servings": 8,
        "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
        "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
        "title": "Mock title",
        "vegan": true,
        "vegetarian": true
    }]

    test("changes button text to Generate new meal plan", async () => {
        renderWithProviders(<MealPlan />, {
          reduxState: {
            recipes: { breakfast: [], lunch: [], dinner: [], dessert: [], snacks: [] },
            recipe_id: "12",
            users_recipe_history: [
                {
                    date: "date", recipes: {
                        breakfast: [{ id: "", title: "", fave: "" }],
                        lunch: [{ id: "", title: "", fave: "" }],
                        dinner: [{ id: "", title: "", fave: "" }],
                        dessert: [{ id: "", title: "", fave: "" }],
                        snacks: [{ id: "", title: "fgdfgfd", fave: false }]
                    }
                }
            ],
            meal_plan_recipes: {
                breakfast: [{
                    "analyzedInstructions": [
                        {
                            "steps": [
                                {
                                    "number": 1,
                                    "step": "(if using meat...brown the meat really well, remove and set aside.",
                                    "ingredients": [
                                        {
                                            "id": 1065062,
                                            "name": "meat",
                                            "localizedName": "meat",
                                            "image": "whole-chicken.jpg"
                                        }
                                    ],
                                    "equipment": []
                                }
                            ]
                        }
                    ],
                    "cheap": false,
                    "dairyFree": true,
                    "extendedIngredients": [
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "original": "2 tablespoons olive oil",
                            "measures": {
                                "us": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                },
                                "metric": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                }
                            }
                        }
                    ],
                    "glutenFree": true,
                    "id": 660395,
                    "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                    "pricePerServing": 110.41,
                    "readyInMinutes": 45,
                    "servings": 8,
                    "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                    "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                    "title": "Smokey Rainbow Chili",
                    "vegan": true,
                    "vegetarian": true
                }], lunch: [{
                    "analyzedInstructions": [
                        {
                            "steps": [
                                {
                                    "number": 1,
                                    "step": "(if using meat...brown the meat really well, remove and set aside.",
                                    "ingredients": [
                                        {
                                            "id": 1065062,
                                            "name": "meat",
                                            "localizedName": "meat",
                                            "image": "whole-chicken.jpg"
                                        }
                                    ],
                                    "equipment": []
                                }
                            ]
                        }
                    ],
                    "cheap": false,
                    "dairyFree": true,
                    "extendedIngredients": [
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "original": "2 tablespoons olive oil",
                            "measures": {
                                "us": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                },
                                "metric": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                }
                            }
                        }
                    ],
                    "glutenFree": true,
                    "id": 660395,
                    "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                    "pricePerServing": 110.41,
                    "readyInMinutes": 45,
                    "servings": 8,
                    "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                    "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                    "title": "Smokey Rainbow Chili",
                    "vegan": true,
                    "vegetarian": true
                }], dinner: [{
                    "analyzedInstructions": [
                        {
                            "steps": [
                                {
                                    "number": 1,
                                    "step": "(if using meat...brown the meat really well, remove and set aside.",
                                    "ingredients": [
                                        {
                                            "id": 1065062,
                                            "name": "meat",
                                            "localizedName": "meat",
                                            "image": "whole-chicken.jpg"
                                        }
                                    ],
                                    "equipment": []
                                }
                            ]
                        }
                    ],
                    "cheap": false,
                    "dairyFree": true,
                    "extendedIngredients": [
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "original": "2 tablespoons olive oil",
                            "measures": {
                                "us": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                },
                                "metric": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                }
                            }
                        }
                    ],
                    "glutenFree": true,
                    "id": 660395,
                    "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                    "pricePerServing": 110.41,
                    "readyInMinutes": 45,
                    "servings": 8,
                    "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                    "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                    "title": "Smokey Rainbow Chili",
                    "vegan": true,
                    "vegetarian": true
                }], dessert: [{
                    "analyzedInstructions": [
                        {
                            "steps": [
                                {
                                    "number": 1,
                                    "step": "(if using meat...brown the meat really well, remove and set aside.",
                                    "ingredients": [
                                        {
                                            "id": 1065062,
                                            "name": "meat",
                                            "localizedName": "meat",
                                            "image": "whole-chicken.jpg"
                                        }
                                    ],
                                    "equipment": []
                                }
                            ]
                        }
                    ],
                    "cheap": false,
                    "dairyFree": true,
                    "extendedIngredients": [
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "original": "2 tablespoons olive oil",
                            "measures": {
                                "us": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                },
                                "metric": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                }
                            }
                        }
                    ],
                    "glutenFree": true,
                    "id": 660395,
                    "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                    "pricePerServing": 110.41,
                    "readyInMinutes": 45,
                    "servings": 8,
                    "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                    "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                    "title": "Smokey Rainbow Chili",
                    "vegan": true,
                    "vegetarian": true
                }], snacks: [{
                    "analyzedInstructions": [
                        {
                            "steps": [
                                {
                                    "number": 1,
                                    "step": "(if using meat...brown the meat really well, remove and set aside.",
                                    "ingredients": [
                                        {
                                            "id": 1065062,
                                            "name": "meat",
                                            "localizedName": "meat",
                                            "image": "whole-chicken.jpg"
                                        }
                                    ],
                                    "equipment": []
                                }
                            ]
                        }
                    ],
                    "cheap": false,
                    "dairyFree": true,
                    "extendedIngredients": [
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "original": "2 tablespoons olive oil",
                            "measures": {
                                "us": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                },
                                "metric": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                }
                            }
                        }
                    ],
                    "glutenFree": true,
                    "id": 660395,
                    "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                    "pricePerServing": 110.41,
                    "readyInMinutes": 45,
                    "servings": 8,
                    "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                    "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                    "title": "Smokey Rainbow Chili",
                    "vegan": true,
                    "vegetarian": true
                }]
            },
            viewed_recipes: [],
            shopping_list: [],
            user_budget: { breakfast: 10, lunch: 0, dinner: 0, snack: 0, dessert: 0 },
            user_meals: { breakfast: true, lunch: false, dinner: false, snack: false, dessert: false },
            diet: { vegan: false, vegetarian: false, glutenFree: false, ketogenic: false, pescetarian: false, paleo: false },
            intolerances: [],
            preferences_set: true
          }
        });
        axios.get.mockResolvedValue({data: dummyResponse})
        const response = await waitFor(() => screen.getAllByTestId(/mealDivs/i))
        expect(response).toHaveLength(1)
    });
    test("The recipes render", async () => {
        renderWithProviders(<MealPlan />, {
          reduxState: {
            recipes: { breakfast: [], lunch: [], dinner: [], dessert: [], snacks: [] },
            recipe_id: "12",
            users_recipe_history: [
                {
                    date: "date", recipes: {
                        breakfast: [{ id: "", title: "", fave: "" }],
                        lunch: [{ id: "", title: "", fave: "" }],
                        dinner: [{ id: "", title: "", fave: "" }],
                        dessert: [{ id: "", title: "", fave: "" }],
                        snacks: [{ id: "", title: "fgdfgfd", fave: false }]
                    }
                }
            ],
            meal_plan_recipes: {
                breakfast: [{
                    "analyzedInstructions": [
                        {
                            "steps": [
                                {
                                    "number": 1,
                                    "step": "(if using meat...brown the meat really well, remove and set aside.",
                                    "ingredients": [
                                        {
                                            "id": 1065062,
                                            "name": "meat",
                                            "localizedName": "meat",
                                            "image": "whole-chicken.jpg"
                                        }
                                    ],
                                    "equipment": []
                                }
                            ]
                        }
                    ],
                    "cheap": false,
                    "dairyFree": true,
                    "extendedIngredients": [
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "original": "2 tablespoons olive oil",
                            "measures": {
                                "us": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                },
                                "metric": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                }
                            }
                        }
                    ],
                    "glutenFree": true,
                    "id": 660395,
                    "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                    "pricePerServing": 110.41,
                    "readyInMinutes": 45,
                    "servings": 8,
                    "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                    "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                    "title": "Smokey Rainbow Chili",
                    "vegan": true,
                    "vegetarian": true
                }], lunch: [{
                    "analyzedInstructions": [
                        {
                            "steps": [
                                {
                                    "number": 1,
                                    "step": "(if using meat...brown the meat really well, remove and set aside.",
                                    "ingredients": [
                                        {
                                            "id": 1065062,
                                            "name": "meat",
                                            "localizedName": "meat",
                                            "image": "whole-chicken.jpg"
                                        }
                                    ],
                                    "equipment": []
                                }
                            ]
                        }
                    ],
                    "cheap": false,
                    "dairyFree": true,
                    "extendedIngredients": [
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "original": "2 tablespoons olive oil",
                            "measures": {
                                "us": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                },
                                "metric": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                }
                            }
                        }
                    ],
                    "glutenFree": true,
                    "id": 660395,
                    "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                    "pricePerServing": 110.41,
                    "readyInMinutes": 45,
                    "servings": 8,
                    "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                    "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                    "title": "Smokey Rainbow Chili",
                    "vegan": true,
                    "vegetarian": true
                }], dinner: [{
                    "analyzedInstructions": [
                        {
                            "steps": [
                                {
                                    "number": 1,
                                    "step": "(if using meat...brown the meat really well, remove and set aside.",
                                    "ingredients": [
                                        {
                                            "id": 1065062,
                                            "name": "meat",
                                            "localizedName": "meat",
                                            "image": "whole-chicken.jpg"
                                        }
                                    ],
                                    "equipment": []
                                }
                            ]
                        }
                    ],
                    "cheap": false,
                    "dairyFree": true,
                    "extendedIngredients": [
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "original": "2 tablespoons olive oil",
                            "measures": {
                                "us": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                },
                                "metric": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                }
                            }
                        }
                    ],
                    "glutenFree": true,
                    "id": 660395,
                    "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                    "pricePerServing": 110.41,
                    "readyInMinutes": 45,
                    "servings": 8,
                    "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                    "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                    "title": "Smokey Rainbow Chili",
                    "vegan": true,
                    "vegetarian": true
                }], dessert: [{
                    "analyzedInstructions": [
                        {
                            "steps": [
                                {
                                    "number": 1,
                                    "step": "(if using meat...brown the meat really well, remove and set aside.",
                                    "ingredients": [
                                        {
                                            "id": 1065062,
                                            "name": "meat",
                                            "localizedName": "meat",
                                            "image": "whole-chicken.jpg"
                                        }
                                    ],
                                    "equipment": []
                                }
                            ]
                        }
                    ],
                    "cheap": false,
                    "dairyFree": true,
                    "extendedIngredients": [
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "original": "2 tablespoons olive oil",
                            "measures": {
                                "us": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                },
                                "metric": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                }
                            }
                        }
                    ],
                    "glutenFree": true,
                    "id": 660395,
                    "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                    "pricePerServing": 110.41,
                    "readyInMinutes": 45,
                    "servings": 8,
                    "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                    "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                    "title": "Smokey Rainbow Chili",
                    "vegan": true,
                    "vegetarian": true
                }], snacks: [{
                    "analyzedInstructions": [
                        {
                            "steps": [
                                {
                                    "number": 1,
                                    "step": "(if using meat...brown the meat really well, remove and set aside.",
                                    "ingredients": [
                                        {
                                            "id": 1065062,
                                            "name": "meat",
                                            "localizedName": "meat",
                                            "image": "whole-chicken.jpg"
                                        }
                                    ],
                                    "equipment": []
                                }
                            ]
                        }
                    ],
                    "cheap": false,
                    "dairyFree": true,
                    "extendedIngredients": [
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "original": "2 tablespoons olive oil",
                            "measures": {
                                "us": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                },
                                "metric": {
                                    "amount": 2,
                                    "unitShort": "Tbsps",
                                    "unitLong": "Tbsps"
                                }
                            }
                        }
                    ],
                    "glutenFree": true,
                    "id": 660395,
                    "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                    "pricePerServing": 110.41,
                    "readyInMinutes": 45,
                    "servings": 8,
                    "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                    "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                    "title": "Smokey Rainbow Chili",
                    "vegan": true,
                    "vegetarian": true
                }]
            },
            viewed_recipes: [],
            shopping_list: [],
            user_budget: { breakfast: 10, lunch: 0, dinner: 0, snack: 0, dessert: 0 },
            user_meals: { breakfast: true, lunch: false, dinner: false, snack: false, dessert: false },
            diet: { vegan: false, vegetarian: false, glutenFree: false, ketogenic: false, pescetarian: false, paleo: false },
            intolerances: [],
            preferences_set: true
          }
        });
        
        const recipeTitles =  screen.getAllByText(/Smokey Rainbow Chili/i)
        expect(recipeTitles).toHaveLength(5)
    });
    it("returns correct result", async () => {
        renderWithProviders(<MealPlan />, {
            reduxState: {
              recipes: { breakfast: [], lunch: [], dinner: [], dessert: [], snacks: [] },
              recipe_id: "12",
              users_recipe_history: [
                  {
                      date: "date", recipes: {
                          breakfast: [{ id: "", title: "", fave: "" }],
                          lunch: [{ id: "", title: "", fave: "" }],
                          dinner: [{ id: "", title: "", fave: "" }],
                          dessert: [{ id: "", title: "", fave: "" }],
                          snacks: [{ id: "", title: "fgdfgfd", fave: false }]
                      }
                  }
              ],
              meal_plan_recipes: {
                  breakfast: [{
                      "analyzedInstructions": [
                          {
                              "steps": [
                                  {
                                      "number": 1,
                                      "step": "(if using meat...brown the meat really well, remove and set aside.",
                                      "ingredients": [
                                          {
                                              "id": 1065062,
                                              "name": "meat",
                                              "localizedName": "meat",
                                              "image": "whole-chicken.jpg"
                                          }
                                      ],
                                      "equipment": []
                                  }
                              ]
                          }
                      ],
                      "cheap": false,
                      "dairyFree": true,
                      "extendedIngredients": [
                          {
                              "id": 4053,
                              "name": "olive oil",
                              "original": "2 tablespoons olive oil",
                              "measures": {
                                  "us": {
                                      "amount": 2,
                                      "unitShort": "Tbsps",
                                      "unitLong": "Tbsps"
                                  },
                                  "metric": {
                                      "amount": 2,
                                      "unitShort": "Tbsps",
                                      "unitLong": "Tbsps"
                                  }
                              }
                          }
                      ],
                      "glutenFree": true,
                      "id": 660395,
                      "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                      "pricePerServing": 110.41,
                      "readyInMinutes": 45,
                      "servings": 8,
                      "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                      "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                      "title": "Smokey Rainbow Chili",
                      "vegan": true,
                      "vegetarian": true
                  }], lunch: [{
                      "analyzedInstructions": [
                          {
                              "steps": [
                                  {
                                      "number": 1,
                                      "step": "(if using meat...brown the meat really well, remove and set aside.",
                                      "ingredients": [
                                          {
                                              "id": 1065062,
                                              "name": "meat",
                                              "localizedName": "meat",
                                              "image": "whole-chicken.jpg"
                                          }
                                      ],
                                      "equipment": []
                                  }
                              ]
                          }
                      ],
                      "cheap": false,
                      "dairyFree": true,
                      "extendedIngredients": [
                          {
                              "id": 4053,
                              "name": "olive oil",
                              "original": "2 tablespoons olive oil",
                              "measures": {
                                  "us": {
                                      "amount": 2,
                                      "unitShort": "Tbsps",
                                      "unitLong": "Tbsps"
                                  },
                                  "metric": {
                                      "amount": 2,
                                      "unitShort": "Tbsps",
                                      "unitLong": "Tbsps"
                                  }
                              }
                          }
                      ],
                      "glutenFree": true,
                      "id": 660395,
                      "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                      "pricePerServing": 110.41,
                      "readyInMinutes": 45,
                      "servings": 8,
                      "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                      "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                      "title": "Smokey Rainbow Chili",
                      "vegan": true,
                      "vegetarian": true
                  }], dinner: [{
                      "analyzedInstructions": [
                          {
                              "steps": [
                                  {
                                      "number": 1,
                                      "step": "(if using meat...brown the meat really well, remove and set aside.",
                                      "ingredients": [
                                          {
                                              "id": 1065062,
                                              "name": "meat",
                                              "localizedName": "meat",
                                              "image": "whole-chicken.jpg"
                                          }
                                      ],
                                      "equipment": []
                                  }
                              ]
                          }
                      ],
                      "cheap": false,
                      "dairyFree": true,
                      "extendedIngredients": [
                          {
                              "id": 4053,
                              "name": "olive oil",
                              "original": "2 tablespoons olive oil",
                              "measures": {
                                  "us": {
                                      "amount": 2,
                                      "unitShort": "Tbsps",
                                      "unitLong": "Tbsps"
                                  },
                                  "metric": {
                                      "amount": 2,
                                      "unitShort": "Tbsps",
                                      "unitLong": "Tbsps"
                                  }
                              }
                          }
                      ],
                      "glutenFree": true,
                      "id": 660395,
                      "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                      "pricePerServing": 110.41,
                      "readyInMinutes": 45,
                      "servings": 8,
                      "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                      "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                      "title": "Smokey Rainbow Chili",
                      "vegan": true,
                      "vegetarian": true
                  }], dessert: [{
                      "analyzedInstructions": [
                          {
                              "steps": [
                                  {
                                      "number": 1,
                                      "step": "(if using meat...brown the meat really well, remove and set aside.",
                                      "ingredients": [
                                          {
                                              "id": 1065062,
                                              "name": "meat",
                                              "localizedName": "meat",
                                              "image": "whole-chicken.jpg"
                                          }
                                      ],
                                      "equipment": []
                                  }
                              ]
                          }
                      ],
                      "cheap": false,
                      "dairyFree": true,
                      "extendedIngredients": [
                          {
                              "id": 4053,
                              "name": "olive oil",
                              "original": "2 tablespoons olive oil",
                              "measures": {
                                  "us": {
                                      "amount": 2,
                                      "unitShort": "Tbsps",
                                      "unitLong": "Tbsps"
                                  },
                                  "metric": {
                                      "amount": 2,
                                      "unitShort": "Tbsps",
                                      "unitLong": "Tbsps"
                                  }
                              }
                          }
                      ],
                      "glutenFree": true,
                      "id": 660395,
                      "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                      "pricePerServing": 110.41,
                      "readyInMinutes": 45,
                      "servings": 8,
                      "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                      "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                      "title": "Smokey Rainbow Chili",
                      "vegan": true,
                      "vegetarian": true
                  }], snacks: [{
                      "analyzedInstructions": [
                          {
                              "steps": [
                                  {
                                      "number": 1,
                                      "step": "(if using meat...brown the meat really well, remove and set aside.",
                                      "ingredients": [
                                          {
                                              "id": 1065062,
                                              "name": "meat",
                                              "localizedName": "meat",
                                              "image": "whole-chicken.jpg"
                                          }
                                      ],
                                      "equipment": []
                                  }
                              ]
                          }
                      ],
                      "cheap": false,
                      "dairyFree": true,
                      "extendedIngredients": [
                          {
                              "id": 4053,
                              "name": "olive oil",
                              "original": "2 tablespoons olive oil",
                              "measures": {
                                  "us": {
                                      "amount": 2,
                                      "unitShort": "Tbsps",
                                      "unitLong": "Tbsps"
                                  },
                                  "metric": {
                                      "amount": 2,
                                      "unitShort": "Tbsps",
                                      "unitLong": "Tbsps"
                                  }
                              }
                          }
                      ],
                      "glutenFree": true,
                      "id": 660395,
                      "image": "https://spoonacular.com/recipeImages/660395-556x370.jpg",
                      "pricePerServing": 110.41,
                      "readyInMinutes": 45,
                      "servings": 8,
                      "sourceUrl": "https://www.foodista.com/recipe/V62YQQWD/smokey-rainbow-chili",
                      "summary": "Need a <b>gluten free, dairy free, lacto ovo vegetarian, and vegan soup</b>? Smokey Rainbow Chili could be a super recipe to try. This recipe makes 8 servings with <b>230 calories</b>, <b>10g of protein</b>, and <b>5g of fat</b> each. For <b>$1.1 per serving</b>, this recipe <b>covers 18%</b> of your daily requirements of vitamins and minerals. This recipe is typical of American cuisine. It is perfect for <b>The Super Bowl</b>. If you have paprika, orange bell pepper, tomato paste, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. 7 people were glad they tried this recipe. With a spoonacular <b>score of 85%</b>, this dish is great. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/7th-annual-chili-contest-entry-4-smokey-chipotle-chili-with-ranch-sour-cream-+-weekly-menu-832601\">7th Annual Chili Contest: Entry #4 – Smokey Chipotle Chili with Ranch Sour Cream + Weekly Menu</a>, <a href=\"https://spoonacular.com/recipes/smokey-chili-roasted-broccoli-109681\">Smokey Chili Roasted Broccoli</a>, and <a href=\"https://spoonacular.com/recipes/smokey-slow-cooker-chili-108120\">Smokey Slow Cooker Chili</a>.",
                      "title": "Smokey Rainbow Chili",
                      "vegan": true,
                      "vegetarian": true
                  }]
              },
              viewed_recipes: [],
              shopping_list: [],
              user_budget: { breakfast: 10, lunch: 0, dinner: 0, snack: 0, dessert: 0 },
              user_meals: { breakfast: true, lunch: false, dinner: false, snack: false, dessert: false },
              diet: { vegan: false, vegetarian: false, glutenFree: false, ketogenic: false, pescetarian: false, paleo: false },
              intolerances: [],
              preferences_set: true
            }
          });
        // MealPlan.sendShoppingItems = jest.fn()
        const shoppingListBtn = await screen.findByTestId(/shoppingListBtn/i)
        fireEvent.click(shoppingListBtn)
        // expect(Shopping.sendShoppingItems.mock).toBeTruthy();
    });
})