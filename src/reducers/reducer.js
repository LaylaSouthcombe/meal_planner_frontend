const initialState = {
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
    loading: false,
    meal_plan_recipes: {
        breakfast: [], lunch: [], dinner: [], dessert: [], snacks: []
    },
    viewed_recipes: [],
    shopping_list: [],
    random_recipe: { title: "no recipe" },
    random_fact: "no fact",
    user_state: false,
    user_calorie_limits: { breakfast: 0, lunch: 0, dinner: 0, snack: 0, dessert: 0 },
    user_budget: { breakfast: 0, lunch: 0, dinner: 0, snack: 0, dessert: 0 },
    user_meals: { breakfast: false, lunch: false, dinner: false, snack: false, dessert: false },
    diet: "",
    intolerances: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, searchTerms: action.payload, loading: true };
        case "SET RECIPES":
            return { ...state, recipes: action.payload }
        case "SET RECIPE ID":
            return { ...state, recipe_id: action.payload }
        case "SET USER RECIPE HISTORY":
            return { ...state, users_recipe_history: action.payload }
        case "SET USER CALORIES":
            return { ...state, user_calorie_limits: action.payload }
        case "SET USER BUDGETS":
            return { ...state, user_budget: action.payload }
        case "SET USER MEALS":
            return { ...state, user_meals: action.payload }
        case "SET USER DIET":
            return { ...state, diet: action.payload }
        case "SET USER INTOLERANCES":
            return { ...state, intolerances: action.payload }
        case "SET MEAL PLAN RECIPES":
            return { ...state, meal_plan_recipes: action.payload }
        case "SET VIEWED RECIPES":
            return { ...state, viewed_recipes: action.payload }
        case "SET SHOPPING LIST":
            return { ...state, shopping_list: action.payload }
        case "SET RANDOM RECIPE":
            return { ...state, random_recipe: action.payload }
        case "SET RANDOM FACT":
            return { ...state, random_fact: action.payload }
        case "SET USER STATE":
            return { ...state, user_state: action.payload }
        default:
            return state;
    }
}

export default reducer;
