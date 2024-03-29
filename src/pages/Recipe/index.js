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
    let stateRecipe = useSelector(state => state.recipe);
    console.log(stateRecipe)
    console.log(stateRecipeId)
    const stateNutritionWidget = useSelector(state => state.nutrition_widget);
    let nutritionWidget
    let stateWidget
    const fetchRecipeNutrition = async () => {
        try {
            const url = `https://api.spoonacular.com/recipes/${stateRecipeId}/nutritionLabel/?apiKey=${apiKey}&defaultCss=false`
            const { data } = await axios.get(url)
            nutritionWidget = data
            stateWidget = { recipeId: stateRecipeId, nutrition_widget: nutritionWidget }
            dispatch({ type: "SET NUTRITION WIDGET", payload: stateWidget })
        } catch (err) {
            console.log(err)
        }
    }

    if (stateNutritionWidget === "no widget") {
        fetchRecipeNutrition()
    }
    if (stateNutritionWidget.recipeId !== stateRecipeId) {
        fetchRecipeNutrition()
    }
    let recipe
    if (stateRandomRecipe.id === parseInt(stateRecipeId)) {
        recipe = stateRandomRecipe
    }
    if (stateRecipe.id === parseInt(stateRecipeId)) {
        recipe = stateRecipe
    }
    
    const setUnit = (e) => {
        console.log(e.target.id)
        if (e.target.id === "metric") {
            stateMeasurementUnit = "us"
        }
        if (e.target.id === "us") {
            stateMeasurementUnit = "metric"
        }
        console.log(e.target.id)
        dispatch({ type: "SET MEASUREMENT UNIT", payload: stateMeasurementUnit })
    }

    return (
        <div className="recipePage">
            {recipe.title.length && (
            <>
                <div data-testid="side" className="backButton" onClick={() => navigate(-1)}><img src={backArrow} alt="back button" /><p>Back</p></div>
                <div className="recipeTitleDiv">
                    <h1 id="recipeTitle5">{recipe.title}</h1>
                    {recipe.fave === true && <div className="favedRecipePage" />}
                    {recipe.fave === false && <div className="unfavedRecipePage" />}
                </div>
                <div className="servingsInfo">
                    <ul className="recipePriceTimeServ">
                        <li>Cost per serving <br /> £{(recipe.pricePerServing / 100).toFixed(2)}</li>
                        <li>Ready in <br /> {recipe.readyInMinutes} minutes</li>
                        <li>{recipe.servings} <br /> servings</li>
                    </ul>

                </div>
                <div className="recipeIngredients">
                    <div id="ingredientTitleDiv5">
                        <h2 id="ingredientList5">Ingredients</h2>
                        <div className="conversion" id={stateMeasurementUnit} onClick={setUnit}>
                            {stateMeasurementUnit}</div>
                    </div>
                    <div className="ingredientsAndNutrition">
                        <ul className="ingredientsList">
                            {recipe.extendedIngredients.map(ingredient => {
                                return (
                                    <li id="unitList5">
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
                <h2 id="recipeList5">Recipe Summary</h2>
                <div className="recipeSummary">
                    <div className="recipeSummary5">{parse(recipe.summary)}</div>
                    <div className="recipeImgDiv">
                        <img id="recipeImg5" src={recipe.image} alt="recipe image" />
                    </div>
                </div>
                <h2 id="InstructionsList5">Instructions</h2>
                <ol className="instructions">
                    {recipe.analyzedInstructions[0].steps.map(instruction => {
                        return (
                            <li id="recipeInstructions5">
                                {instruction.step}
                            </li>
                        )
                    })}
                </ol>
                <div className="originalRecipe">
                    <a id="recipelink5" href={recipe.sourceUrl} target="_blank">View original recipe</a>
                </div>
            </>
        )}
        </div>
    );

}




export default Recipe;
