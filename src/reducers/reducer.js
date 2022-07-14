const initialState = {
    recipes: { breakfast:["hi"] ,  lunch: ["hi"] ,  dinner: [] ,  dessert: [] , snack: [] },
    recipe_id: "",
    users_recipe_history: [
        {date: "date", recipes: {
        breakfast: [{id:"", title: "", fave:""}], 
        lunch: [{id:"", title: "", fave:""}], 
        dinner: [{id:"", title: "", fave:""}], 
        dessert: [{id:"", title: "", fave:""}], 
        snacks: [{id:"", title: "", fave:""}]}}
    ]
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "SET RECIPES":
            return { recipes: action.payload }
        case "SET RECIPE ID":
            return { recipe_id: action.payload }
        case "SET USER RECIPE HISTORY":
            return { users_recipe_history: action.payload }
        default:
            return state;
    }
}

export default reducer;