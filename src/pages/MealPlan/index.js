import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import './style.css'
import { CollapsibleRecipes } from '../../components';

import apiKey from '../../'

const MealPlan = () => {

    const state = useSelector((state) => state.user_state);
    console.log(state)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [generateText, setGenerateText] = useState("Generate meal plan")

    // if no result, render message to generate plan
    // if result, render meal plan
    const stateMealRecipes = useSelector(state => state.meal_plan_recipes)
    const stateUsersRecipesHistory = useSelector(state => state.users_recipe_history)
    const stateBudgets = useSelector(state => state.user_budget)
    const stateCalories = useSelector(state => state.user_calorie_limits)
    console.log("state budgets", stateBudgets)
    console.log("state meal plan recipes at render", stateMealRecipes)

    const stateRecipes = useSelector(state => state.recipes)
    console.log("state recipes at render", stateRecipes)

    let viewedRecipes = []

    let newRecipes = { breakfast: [], lunch: [], dinner: [], dessert: [], snacks: [] }

    let newMealPlan = { breakfast: [], lunch: [], dinner: [], dessert: [], snacks: [] }

    //TODO:get from state
    let meals = useSelector(state => state.user_meals)
    console.log(meals)
    // let meals = { breakfast: true, lunch: false, dinner: false, dessert: false, snacks: false }

    //TODO:get from state
    let intoleranes = ["eggs", "milk"]
    let intolerancesParamsOld = ""
    for (let i = 0; i < intoleranes.length; i++) {
        intolerancesParamsOld += `,${intoleranes[i]}`
    }
    let intolerancesParams = intolerancesParamsOld.substring(1)

    //TODO:get from state
    let diet = { vegan: false, vegetarian: false, glutenFree: false, ketogenic: false, pescetarian: false, paleo: false }

    let dietParamsOld = ""
    for (let i = 0; i < Object.keys(diet).length; i++) {
        if (Object.values(diet)[i] === true) {
            dietParamsOld += `,${Object.keys(diet)[i]}`
            console.log(dietParamsOld)
        }
    }
    let dietParams = dietParamsOld.substring(1)

    const getInitialMeal = async (meal) => {
        const { data } = await axios.get(`https://api.spoonacular.com/recipes/random/?apiKey=${apiKey}&number=100&tags=${meal},${dietParams}&intolerances=${intolerancesParams}&excludeIngredients${intolerancesParams}&includeNutrition=true&instructionsRequired=true`)
        console.log("data", data.recipes)
        const retrievedRecipes = data.recipes
        let shortRetrievedRecipes = []
        let formattedRetrievedRecipes = []
        let thisMealsRecipesInMealPlan = []
        for (let i = 0; i < retrievedRecipes.length; i++) {
            if(retrievedRecipes[i].pricePerServing < stateBudgets[meal]*100){
                shortRetrievedRecipes = { analyzedInstructions: retrievedRecipes[i].analyzedInstructions, cheap: retrievedRecipes[i].cheap, dairyFree: retrievedRecipes[i].dairyFree, extendedIngredients: retrievedRecipes[i].extendedIngredients, glutenFree: retrievedRecipes[i].glutenFree, id: retrievedRecipes[i].id, image: retrievedRecipes[i].image, pricePerServing: retrievedRecipes[i].pricePerServing, readyInMinutes: retrievedRecipes[i].readyInMinutes, servings: retrievedRecipes[i].servings, sourceUrl: retrievedRecipes[i].sourceUrl, summary: retrievedRecipes[i].summary, title: retrievedRecipes[i].title, vegan: retrievedRecipes[i].vegan, vegetarian: retrievedRecipes[i].vegetarian }
                formattedRetrievedRecipes.push({ ...shortRetrievedRecipes, lock: true, fave: false })
            }
        }
        for (let i = 0; i < 7; i++) {
            thisMealsRecipesInMealPlan.push(formattedRetrievedRecipes[i])
            viewedRecipes.push(formattedRetrievedRecipes[i].id)
            formattedRetrievedRecipes.splice([i], 1)
        }
        if (meal === "breakfast") {
            newRecipes = { ...newRecipes, breakfast: formattedRetrievedRecipes }
            newMealPlan = { ...newMealPlan, breakfast: thisMealsRecipesInMealPlan }
        }
        if (meal === "lunch") {
            newRecipes = { ...newRecipes, lunch: formattedRetrievedRecipes }
            newMealPlan = { ...newMealPlan, lunch: thisMealsRecipesInMealPlan }
        }
        if (meal === "dinner") {
            newRecipes = { ...newRecipes, dinner: formattedRetrievedRecipes }
            newMealPlan = { ...newMealPlan, dinner: thisMealsRecipesInMealPlan }
        }
        if (meal === "dessert") {
            newRecipes = { ...newRecipes, dessert: formattedRetrievedRecipes }
            newMealPlan = { ...newMealPlan, dessert: thisMealsRecipesInMealPlan }
        }
        if (meal === "snacks") {
            newRecipes = { ...newRecipes, snacks: formattedRetrievedRecipes }
            newMealPlan = { ...newMealPlan, snacks: thisMealsRecipesInMealPlan }
        }
        console.log("meal's recipes in meal plan after call", thisMealsRecipesInMealPlan)
    }
    const getAdditionalMeal = async (meal) => {
        const { data } = await axios.get(`https://api.spoonacular.com/recipes/random/?apiKey=${apiKey}&number=25&tags=${meal},${dietParams}&intolerances=${intolerancesParams}&excludeIngredients${intolerancesParams}&includeNutrition=true&instructionsRequired=true`)
        console.log("data", data.recipes)
        const retrievedRecipes = data.recipes
        let shortRetrievedRecipes = []
        let formattedRetrievedRecipes = []
        for (let i = 0; i < retrievedRecipes.length; i++) {
            shortRetrievedRecipes = { analyzedInstructions: retrievedRecipes[i].analyzedInstructions, cheap: retrievedRecipes[i].cheap, dairyFree: retrievedRecipes[i].dairyFree, extendedIngredients: retrievedRecipes[i].extendedIngredients, glutenFree: retrievedRecipes[i].glutenFree, id: retrievedRecipes[i].id, image: retrievedRecipes[i].image, pricePerServing: retrievedRecipes[i].pricePerServing, readyInMinutes: retrievedRecipes[i].readyInMinutes, servings: retrievedRecipes[i].servings, sourceUrl: retrievedRecipes[i].sourceUrl, summary: retrievedRecipes[i].summary, title: retrievedRecipes[i].title, vegan: retrievedRecipes[i].vegan, vegetarian: retrievedRecipes[i].vegetarian }
            formattedRetrievedRecipes.push({ ...shortRetrievedRecipes, lock: true, fave: false })
        }
        if (meal === "breakfast") {
            newRecipes = { ...newRecipes, breakfast: formattedRetrievedRecipes }
        }
        if (meal === "lunch") {
            newRecipes = { ...newRecipes, lunch: formattedRetrievedRecipes }
        }
        if (meal === "dinner") {
            newRecipes = { ...newRecipes, dinner: formattedRetrievedRecipes }
        }
        if (meal === "dessert") {
            newRecipes = { ...newRecipes, dessert: formattedRetrievedRecipes }
        }
        if (meal === "snacks") {
            newRecipes = { ...newRecipes, snacks: formattedRetrievedRecipes }
        }
        console.log("new recipes after additional meal call", newRecipes)
    }

    let unlockedMeals = [[], [], [], [], []]


    const getMeals = async (e) => {
        e.preventDefault()

        // checks to see if a recipe is locked, if not it is added to unlocked array
        let numberOfUnlocked = 0
        for (let i = 0; i < Object.keys(meals).length; i++) {
            for (let j = 0; j < Object.values(stateMealRecipes)[i].length; j++) {
                if (Object.values(stateMealRecipes)[i][j].lock === false) {
                    unlockedMeals[i].push(Object.values(stateMealRecipes)[i][j].id)
                    numberOfUnlocked += 1
                }
            }
        }
        console.log(numberOfUnlocked)
        console.log("unlocked meals", unlockedMeals)

        for (let i = 0; i < Object.keys(meals).length; i++) {
            if (numberOfUnlocked === 0 && Object.values(meals)[i] === true) {
                if (Object.keys(meals)[i] === "breakfast") {
                    await getInitialMeal("breakfast")
                }
                if (Object.keys(meals)[i] === "lunch") {
                    await getInitialMeal("lunch")
                }
                if (Object.keys(meals)[i] === "dinner") {
                    await getInitialMeal("dinner")
                }
                if (Object.keys(meals)[i] === "dessert") {
                    await getInitialMeal("dessert")
                }
                if (Object.keys(meals)[i] === "snacks") {
                    await getInitialMeal("snacks")
                }
            } else if (unlockedMeals[i].length === 0 && Object.values(meals)[i] === true) {
                if (Object.keys(meals)[i] === "breakfast") {
                    newMealPlan = { ...newMealPlan, breakfast: Object.values(stateMealRecipes)[i] }
                    newRecipes = { ...newRecipes, breakfast: Object.values(stateRecipes)[i] }
                }
                if (Object.keys(meals)[i] === "lunch") {
                    newMealPlan = { ...newMealPlan, lunch: Object.values(stateMealRecipes)[i] }
                    newRecipes = { ...newRecipes, lunch: Object.values(stateRecipes)[i] }
                }
                if (Object.keys(meals)[i] === "dinner") {
                    newMealPlan = { ...newMealPlan, dinner: Object.values(stateMealRecipes)[i] }
                    newRecipes = { ...newRecipes, dinner: Object.values(stateRecipes)[i] }
                }
                if (Object.keys(meals)[i] === "dessert") {
                    newMealPlan = { ...newMealPlan, dessert: Object.values(stateMealRecipes)[i] }
                    newRecipes = { ...newRecipes, dessert: Object.values(stateRecipes)[i] }
                }
                if (Object.keys(meals)[i] === "snacks") {
                    newMealPlan = { ...newMealPlan, snacks: Object.values(stateMealRecipes)[i] }
                    newRecipes = { ...newRecipes, snacks: Object.values(stateRecipes)[i] }
                }
            } else if (unlockedMeals[i].length > 0 && Object.values(meals)[i] === true && unlockedMeals[i].length <= Object.values(stateRecipes)[i].length) {
                for (let j = 0; j < Object.values(stateMealRecipes)[i].length; j++) {
                    if (Object.values(stateMealRecipes)[i][j].lock === false) {
                        Object.values(stateMealRecipes)[i][j] = Object.values(stateRecipes)[i][0]
                        Object.values(stateRecipes)[i].splice(0, 1)
                        console.log("state recipes after unlocked replaced", stateRecipes)
                        if (Object.keys(meals)[i] === "breakfast") {
                            newMealPlan = { ...newMealPlan, breakfast: Object.values(stateMealRecipes)[i] }
                            newRecipes = { ...newRecipes, breakfast: Object.values(stateRecipes)[i] }
                        }
                        if (Object.keys(meals)[i] === "lunch") {
                            newMealPlan = { ...newMealPlan, lunch: Object.values(stateMealRecipes)[i] }
                            newRecipes = { ...newRecipes, lunch: Object.values(stateRecipes)[i] }
                        }
                        if (Object.keys(meals)[i] === "dinner") {
                            newMealPlan = { ...newMealPlan, dinner: Object.values(stateMealRecipes)[i] }
                            newRecipes = { ...newRecipes, dinner: Object.values(stateRecipes)[i] }
                        }
                        if (Object.keys(meals)[i] === "dessert") {
                            newMealPlan = { ...newMealPlan, dessert: Object.values(stateMealRecipes)[i] }
                            newRecipes = { ...newRecipes, dessert: Object.values(stateRecipes)[i] }
                        }
                        if (Object.keys(meals)[i] === "snacks") {
                            newMealPlan = { ...newMealPlan, snacks: Object.values(stateMealRecipes)[i] }
                            newRecipes = { ...newRecipes, snacks: Object.values(stateRecipes)[i] }
                        }
                        console.log(newRecipes)
                    }
                }
            } else if (unlockedMeals[i].length > 0 && Object.values(meals)[i] === true && unlockedMeals[i].length > Object.values(stateRecipes)[i].length) {
                if (Object.keys(meals)[i] === "breakfast") {
                    await getAdditionalMeal("breakfast")
                }
                if (Object.keys(meals)[i] === "lunch") {
                    await getAdditionalMeal("lunch")
                }
                if (Object.keys(meals)[i] === "dinner") {
                    await getAdditionalMeal("dinner")
                }
                if (Object.keys(meals)[i] === "dessert") {
                    await getAdditionalMeal("dessert")
                }
                if (Object.keys(meals)[i] === "snacks") {
                    await getAdditionalMeal("snacks")
                }
                for (let j = 0; j < Object.values(stateMealRecipes)[i].length; j++) {
                    if (Object.values(stateMealRecipes)[i][j].lock === false) {
                        console.log(Object.values(newRecipes)[i])
                        Object.values(stateMealRecipes)[i][j] = Object.values(newRecipes)[i][0]
                        Object.values(newRecipes)[i].splice(0, 1)
                        console.log(Object.values(newRecipes)[i])
                        console.log("state recipes after unlocked replaced", stateRecipes)
                        if (Object.keys(meals)[i] === "breakfast") {
                            newMealPlan = { ...newMealPlan, breakfast: Object.values(stateMealRecipes)[i] }
                        }
                        if (Object.keys(meals)[i] === "lunch") {
                            newMealPlan = { ...newMealPlan, lunch: Object.values(stateMealRecipes)[i] }
                        }
                        if (Object.keys(meals)[i] === "dinner") {
                            newMealPlan = { ...newMealPlan, dinner: Object.values(stateMealRecipes)[i] }
                        }
                        if (Object.keys(meals)[i] === "dessert") {
                            newMealPlan = { ...newMealPlan, dessert: Object.values(stateMealRecipes)[i] }
                        }
                        if (Object.keys(meals)[i] === "snacks") {
                            newMealPlan = { ...newMealPlan, snacks: Object.values(stateMealRecipes)[i] }
                        }
                    }
                }
            }

        }

        console.log("new recipes after getMeals", newRecipes)
        console.log("new meal plan after getMeals", newMealPlan)

        dispatch({ type: "SET RECIPES", payload: newRecipes })
        dispatch({ type: "SET VIEWED RECIPES", payload: viewedRecipes })
        dispatch({ type: "SET MEAL PLAN RECIPES", payload: newMealPlan })
    }






    //TODO:generate shopping list
    let shoppingList
    const sendShoppingItems = async (shoppingItems) => {
        const options = {
            "items": shoppingItems
        }
        const { data } = await axios.post(`https://api.spoonacular.com/mealplanner/shopping-list/compute?apiKey=${apiKey}`, JSON.stringify(options), { headers: { 'Content-Type': 'application/json' } })
        console.log(data)
        shoppingList = data
    }
    const generateShoppingList = async (e) => {
        e.preventDefault()
        // take in all items from recipes
        // send to api with structure of 
        // {
        //     "items": [
        //         "4 lbs tomatoes",
        //         "10 tomatoes",
        //         "20 Tablespoons Olive Oil",
        //         "6 tbsp Olive Oil"
        //     ]
        // }
        let items = []
        //extracts all ingredients from all the recipes in the meal plan
        for (let i = 0; i < Object.keys(stateMealRecipes).length; i++) {
            if (Object.values(stateMealRecipes)[i].length) {
                for (let j = 0; j < Object.values(stateMealRecipes)[i].length; j++) {
                    for (let k = 0; k < Object.values(stateMealRecipes)[i][j].extendedIngredients.length; k++) {
                        let ingredientName = Object.values(stateMealRecipes)[i][j].extendedIngredients[k].name
                        let ingredientMeasureAmount = Object.values(stateMealRecipes)[i][j].extendedIngredients[k].measures.us.amount
                        let ingredientMeasureUnit = Object.values(stateMealRecipes)[i][j].extendedIngredients[k].measures.us.unitShort
                        let itemString = `${ingredientMeasureAmount} ${ingredientMeasureUnit} ${ingredientName}`
                        items.push(itemString)
                        console.log(itemString)
                        console.log(items)
                    }
                }
            }
        }
        await sendShoppingItems(items)

        dispatch({ type: "SET SHOPPING LIST", payload: shoppingList })

        navigate('/shoppinglist')
    }



    //TODO:submit meal plan
    // take in all id's, titles, and faves
    // add to array
    // send to db

    const submitMealPlan = async (e) => {
        e.preventDefault()

        let recipesToSendToDb = { today_date: "", recipes: { breakfast: [], lunch: [], dinner: [], dessert: [], snacks: []}}
        for (let i = 0; i < Object.keys(stateMealRecipes).length; i++) {
            for (let j = 0; j < Object.values(stateMealRecipes)[i].length; j++) {
                let currentRecipe = Object.values(stateMealRecipes)[i][j]
                currentRecipe.lock = true
                let mealEntry = {id: `${currentRecipe.id}`, title: currentRecipe.title, image: currentRecipe.image, fave: currentRecipe.fave}
                if(Object.keys(stateMealRecipes)[i] === "breakfast"){
                    recipesToSendToDb.recipes.breakfast.push(mealEntry)
                }
                if(Object.keys(stateMealRecipes)[i] === "lunch"){
                    recipesToSendToDb.recipes.lunch.push(mealEntry)
                }
                if(Object.keys(stateMealRecipes)[i] === "dinner"){
                    recipesToSendToDb.recipes.dinner.push(mealEntry)
                }
                if(Object.keys(stateMealRecipes)[i] === "dessert"){
                    recipesToSendToDb.recipes.dessert.push(mealEntry)
                }
                if(Object.keys(stateMealRecipes)[i] === "snacks"){
                    recipesToSendToDb.recipes.snacks.push(mealEntry)
                }
            }
            console.log(recipesToSendToDb)
        }
        dispatch({ type: "SET MEAL PLAN RECIPES", payload: stateMealRecipes })
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' +  yyyy;
        console.log(today)
        recipesToSendToDb.today_date = today
        console.log(recipesToSendToDb)
        const { data } = await axios.post(`https://mealplannerserver.herokuapp.com/mealhistory/`, JSON.stringify(recipesToSendToDb))
        console.log(data)
        stateUsersRecipesHistory.unshift(recipesToSendToDb)
        //confirmation message saying can now view shopping list
        
        setGenerateText("Generate new meal plan")
    }



    return (
        <>
            <h1>Meal Plan</h1>
            <div className="generateMeal">
                <button onClick={getMeals}>{generateText}</button>
            </div>
            <div className="shoppingListBtn">
                <button onClick={generateShoppingList}>Shopping list</button>
            </div>
            <div className="recipesMealPlan">

                {stateMealRecipes.breakfast.length > 0 && (
                    <CollapsibleRecipes meal={"breakfast"} fullRecipes={stateMealRecipes} triggerName="Breakfast" page="mealplan"/>
                )}
                {stateMealRecipes.lunch.length > 0 && (
                    <CollapsibleRecipes meal={"lunch"} fullRecipes={stateMealRecipes} triggerName="Lunch" page="mealplan"/>
                )}
                {stateMealRecipes.dinner.length > 0 && (
                    <CollapsibleRecipes meal={"dinner"} fullRecipes={stateMealRecipes} triggerName="Dinner" page="mealplan"/>
                )}
                {stateMealRecipes.dessert.length > 0 && (
                    <CollapsibleRecipes meal={"dessert"} fullRecipes={stateMealRecipes} triggerName="Dessert" page="mealplan"/>
                )}
                {stateMealRecipes.snacks.length > 0 && (
                    <CollapsibleRecipes meal={"snacks"} fullRecipes={stateMealRecipes} triggerName="Snacks" page="mealplan"/>
                )}
            </div>
            <div className="submitMealPlan" onClick={submitMealPlan}>Submit meal plan</div>
        </>
    )
};

export default MealPlan;
