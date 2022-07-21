import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import parse from 'html-react-parser'
import apiKey from '../../'

import backArrow from '../../images/backArrow.png'
import './style.css'


const Recipe = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const stateRecipeId = useSelector(state => state.recipe_id);
    const stateMealPlanRecipes = useSelector(state => state.meal_plan_recipes);
    const stateRandomRecipe = useSelector(state => state.random_recipe);
    let stateMeasurementUnit = useSelector(state => state.measurement_unit);
    
    // console.log(stateRandomRecipe)
    // console.log(stateRecipeId)
    const stateNutritionWidget = useSelector(state => state.nutrition_widget);
    let nutritionWidget
    let stateWidget
    const fetchRecipeNutrition = async () => {
        try {
            const url = `https://api.spoonacular.com/recipes/${stateRecipeId}/nutritionLabel/?apiKey=${apiKey}&defaultCss=false`
            const { data } = await axios.get(url)
            nutritionWidget = data
            // console.log(nutritionWidget)
            stateWidget = { recipeId: stateRecipeId, nutrition_widget: nutritionWidget }
            dispatch({ type: "SET NUTRITION WIDGET", payload: stateWidget })
        } catch (err) {
            console.log(err)
        }
    }
    // console.log(stateWidget)

    if (stateNutritionWidget === "no widget") {
        fetchRecipeNutrition()
    }
    if (stateNutritionWidget.recipeId !== stateRecipeId) {
        fetchRecipeNutrition()
    }
    // console.log(stateNutritionWidget.recipeId)
    // console.log(stateRecipeId)
    let recipe
    if (stateRandomRecipe.id === parseInt(stateRecipeId)) {
        recipe = stateRandomRecipe
    }

    for (let i = 0; i < Object.keys(stateMealPlanRecipes).length; i++) {
        for (let j = 0; j < Object.values(stateMealPlanRecipes)[i].length; j++) {
            if (Object.values(stateMealPlanRecipes)[i][j].id === parseInt(stateRecipeId)) {
                recipe = Object.values(stateMealPlanRecipes)[i][j]
            }
        }
    }

    // console.log(recipe.fave)
    const setUnit = (e) => {
        console.log(e.target.id)
        if(e.target.id === "metric"){
            stateMeasurementUnit = "us"
        }
        if(e.target.id === "us"){
            stateMeasurementUnit = "metric"
        }
        console.log(e.target.id)
        dispatch({ type: "SET MEASUREMENT UNIT", payload: stateMeasurementUnit })
    }

    return (
        <>{recipe.title.length && (
            <>
                <div data-testid="side" className="backButton" onClick={() => navigate(-1)}><img src={backArrow} alt="back button" /><p>Back</p></div>
                <div className="recipeTitleDiv">
                    <h1>{recipe.title}</h1>
                    {recipe.fave === true && <div className="favedRecipePage" />}
                    {recipe.fave === false && <div className="unfavedRecipePage" />}
                </div>
                <div className="servingsInfo">
                    <ul className="recipePriceTimeServ">
                        <li>Cost per serving <br /> £{(recipe.pricePerServing / 100).toFixed(2)}</li>
                        <li>Ready in <br /> {recipe.readyInMinutes} minutes</li>
                        <li>{recipe.servings} <br /> servings</li>
                    </ul>
                    <div className="conversion" id={stateMeasurementUnit} onClick={setUnit}>
                        Toggle</div>
                </div>
                <div className="recipeIngredients">
                    <h2>Ingredient list</h2>
                    <div className="ingredientsAndNutrition">
                        <ul className="ingredientsList">
                            {recipe.extendedIngredients.map(ingredient => {
                                return (
                                    <li>
                                        {stateMeasurementUnit === "metric" && (`${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitShort} ${ingredient.name}`)}
                                        {stateMeasurementUnit === "us" && (`${ingredient.measures.us.amount} ${ingredient.measures.us.unitShort} ${ingredient.name}`)}
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="nutrition">
                            {stateNutritionWidget !== "no widget" && (
                                <div>{parse(stateNutritionWidget.nutrition_widget)}</div>
                            )}
                        </div>
                    </div>
                </div>
                <h2>Recipe Summary</h2>
                <div className="recipeSummary">
                    <div>{parse(recipe.summary)}</div>
                    <div className="recipeImgDiv">
                        <img src={recipe.image} alt="recipe image" />
                    </div>
                </div>
                <h2>Instructions</h2>
                <ol className="instructions">
                    {recipe.analyzedInstructions[0].steps.map(instruction => {
                        return (
                            <li>
                                {instruction.step}
                            </li>
                        )
                    })}
                </ol>
                <div className="originalRecipe">
                    <a href={recipe.sourceUrl} target="_blank">Veiw original recipe</a>
                </div>
            </>
        )}
        </>
    );

}




export default Recipe;
