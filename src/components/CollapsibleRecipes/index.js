import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import './style.css'
import Collapsible from 'react-collapsible';

const CollapsibleRecipes = ({ favourited, fullRecipes, triggerName, meal, page, date }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  // console.log("this is favourited " + favourited)

  const viewFullRecipe = (e) => {
    const parentClassName = e.target.parentElement.className
    const splitString = parentClassName.split(' ')
    const recipeIdStr = splitString[1]
    const newRecipeId = parseInt(recipeIdStr)
    dispatch({ type: "SET RECIPE ID", payload: newRecipeId })
    navigate("/recipe")
  }
  // console.log("meal recipes", mealRecipes)
  // console.log("recipes in collapsible", fullRecipes)

  // console.log(fullRecipes[meal])

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
          e.style.display = "block"
        }
      }
    }
    )
  }




  // TODO:add conditional that if user meals is same as initial state, do a calculateNewValue, if not set meal recipes to state recipes
  // const [mealRecipes, setMealRecipes] = useState(recipes)
  // causing an error, shouldn't when added to useEffect
  // dispatch({ type: "SET MEAL PLAN RECIPES", payload: recipes})

  // console.log(fullRecipes[meal])
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

  // copy to recipe page
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
            console.log(fullRecipes[meal][i].fave)
            e.target.className = "unfaved"
          }
          if (faveClassName === "unfaved") {
            fullRecipes[meal][i].fave = true
            console.log(fullRecipes[meal][i].fave)
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
            console.log(date)
            e.target.className = "unfaved"
          }
          if (faveClassName === "unfaved") {
            fullRecipes[meal][i].fave = true
            console.log(fullRecipes[meal][i].fave)
            console.log(date)
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