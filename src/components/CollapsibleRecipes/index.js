import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import './style.css'
import Collapsible from 'react-collapsible';

import apiKey from '../../'

const CollapsibleRecipes = ({ favourited, fullRecipes, triggerName, meal, page }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
console.log(page)
const stateMealPlanRecipes = useSelector(state => state.meal_plan_recipes);
    const stateRandomRecipe = useSelector(state => state.random_recipe);
    const stateUserRecipeHistory = useSelector(state => state.users_recipe_history);
    console.log(stateUserRecipeHistory)
let recipe
console.log(fullRecipes)
const findRecipe = async (recipeId) => {
  console.log(recipeId)
  if (stateRandomRecipe.id === parseInt(recipeId)) {
    recipe = stateRandomRecipe
    console.log("random")
  }
  for (let i = 0; i < Object.keys(stateMealPlanRecipes).length; i++) {
      for (let j = 0; j < Object.values(stateMealPlanRecipes)[i].length; j++) {
          if (Object.values(stateMealPlanRecipes)[i][j].id === parseInt(recipeId)) {
              recipe = Object.values(stateMealPlanRecipes)[i][j]
              console.log("meal plan")
          }
          
      }
  }
  for(let i = 0; i< stateUserRecipeHistory.length; i++){
    for (let j = 0; j < Object.keys(stateUserRecipeHistory[i].recipes).length; j++) {
      for (let k = 0; k < Object.values(stateUserRecipeHistory[i].recipes)[j].length; k++) {
        if (Object.values(stateUserRecipeHistory[i].recipes)[j][k].id === recipeId) {
          console.log("fetch")
          const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=false`
          const { data } = await axios.get(url)
          console.log(data)
          recipe = data
      }
    }
  }
}

  
  dispatch({ type: "SET RECIPE", payload: recipe })
}

  const viewFullRecipe = async (e) => {
    const parentClassName = e.target.parentElement.className
    const splitString = parentClassName.split(' ')
    const recipeIdStr = splitString[1]
    const newRecipeId = parseInt(recipeIdStr)
    console.log(newRecipeId)
    dispatch({ type: "SET RECIPE ID", payload: newRecipeId })
    await findRecipe(recipeIdStr)
    navigate("/recipe")
  }

  const faveFilter = () => {
    const faveRecipe = document.querySelectorAll('#target')
    faveRecipe.forEach((e) => {
      const unFaved = e.getElementsByClassName("unfaved")
      const unFavedDiv = unFaved[0]
      if (unFavedDiv) {
        if (favourited && unFavedDiv.className === "unfaved") {
          e.style.display = "none"
        }
        else if (!favourited) {
          e.style.display = "flex"
        }
      }
    }
    )
  }

  const changeLockRecipe = (e) => {
    const parentClassName = e.target.parentElement.className
    const lockClassName = e.target.className
    const splitString = parentClassName.split(' ')
    const lockRecipeIdStr = splitString[1]
    const lockRecipeIdInt = parseInt(lockRecipeIdStr)

    for (let i = 0; i < fullRecipes[meal].length; i++) {
      if (fullRecipes[meal][i].id === lockRecipeIdInt) {
        if (lockClassName === "locked") {
          fullRecipes[meal][i].lock = false
          e.target.className = "unlocked"
        }
        if (lockClassName === "unlocked") {
          fullRecipes[meal][i].lock = true
          e.target.className = "locked"
        }
      }
    }
    dispatch({ type: "SET MEAL PLAN RECIPES", payload: fullRecipes })
  }

  const changefaveRecipe = (e) => {
    const parentClassName = e.target.parentElement.className
    const faveClassName = e.target.className
    const splitString = parentClassName.split(' ')
    const faveRecipeIdStr = splitString[1]
    if (page === "mealplan") {
      const faveRecipeIdInt = parseInt(faveRecipeIdStr)
      for (let i = 0; i < fullRecipes[meal].length; i++) {
        if (fullRecipes[meal][i].id === faveRecipeIdInt) {
          if (faveClassName === "faved") {
            fullRecipes[meal][i].fave = false
            e.target.className = "unfaved"
          }
          if (faveClassName === "unfaved") {
            fullRecipes[meal][i].fave = true
            e.target.className = "faved"
          }
        }
      }
    }
    if (page === "history") {
      for (let i = 0; i < fullRecipes[meal].length; i++) {
        if (fullRecipes[meal][i].id === faveRecipeIdStr) {
          if (faveClassName === "faved") {
            fullRecipes[meal][i].fave = false
            e.target.className = "unfaved"
          }
          if (faveClassName === "unfaved") {
            fullRecipes[meal][i].fave = true
            e.target.className = "faved"
          }
        }
      }
    }
    dispatch({ type: "SET MEAL PLAN RECIPES", payload: fullRecipes })
  }


  return (
    <>
      <Collapsible trigger={triggerName}>
        {fullRecipes[meal].map(recipe => {
          return (
            <div id="target" key={recipe.id} className={"recipe " + recipe.id}>
              {faveFilter()}
              <div className={"recipeInfoCard " + recipe.id} data-testid="recipe" onClick={viewFullRecipe}>
                <h3 >{recipe.title}</h3>
                {recipe.image && <img className="recipeCardImg" src={recipe.image} alt="" />}
              </div>
              <div className={"recipeIcon " + recipe.id}>
                {recipe.lock === true && <div data-testid="lock" onClick={changeLockRecipe} className="locked" />}
                {recipe.lock === false && <div onClick={changeLockRecipe} data-testid="unlock" className="unlocked" />}
                {recipe.fave === true && <div onClick={changefaveRecipe} data-testid="faved" className="faved" />}
                {recipe.fave === false && <div onClick={changefaveRecipe} data-testid="unfaved" className="unfaved" />}
              </div>
            </div>
          )
        })}
      </Collapsible>
    </>
  );
};

export default CollapsibleRecipes;