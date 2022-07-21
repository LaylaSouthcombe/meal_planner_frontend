import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import './style.css'

import apiKey from '../../'

 const RandomRecipe = () => {

  const dispatch = useDispatch()
    const navigate = useNavigate();
    
    let randomRecipe = {}
    
    const viewRecipe = (e) => {
      let targetClassName = e.target.className
      if(!targetClassName){
        targetClassName = e.target.parentElement.className
      }
      console.log(targetClassName)
      const splitString = targetClassName.split(' ')
      const recipeIdStr = splitString[1]
      console.log(recipeIdStr)
      const newRecipeId = parseInt(recipeIdStr)
      dispatch({ type: "SET RECIPE ID", payload: newRecipeId })
      navigate("/recipe")
    }
  
    const stateRandomRecipe = useSelector(state => state.random_recipe)
    console.log(stateRandomRecipe)
    //TODO:get from state
    // let intoleranes = ["eggs", "milk"]
    // let intolerancesParamsOld = ""
    // for (let i = 0; i < intoleranes.length; i++) {
    //     intolerancesParamsOld += `,${intoleranes[i]}`
    // }
    // let intolerancesParams = intolerancesParamsOld.substring(1)

    //TODO:get from state
    let diet = { vegan: true, vegetarian: false, glutenFree: false, ketogenic: false, pescetarian: false, paleo: false }

    let dietParamsOld = ""
    for (let i = 0; i < Object.keys(diet).length; i++) {
        if (Object.values(diet)[i] === true) {
            dietParamsOld += `,${Object.keys(diet)[i]}`
            console.log(dietParamsOld)
        }
    }
    let dietParams = dietParamsOld.substring(1)
console.log(dietParams)

      const fetchRandomRecipe = async () => {
        try {
          const url = `https://api.spoonacular.com/recipes/random/?apiKey=${apiKey}&tags=${dietParams}&instructionsRequired=true`

          const { data } = await axios.get(url)

          const retrievedRecipes = data.recipes
          console.log(data.recipes)
          let shortRetrievedRecipe = []
          shortRetrievedRecipe = {analyzedInstructions: retrievedRecipes[0].analyzedInstructions, cheap: retrievedRecipes[0].cheap, dairyFree: retrievedRecipes[0].dairyFree, extendedIngredients: retrievedRecipes[0].extendedIngredients, glutenFree: retrievedRecipes[0].glutenFree, id: retrievedRecipes[0].id, image: retrievedRecipes[0].image, pricePerServing: retrievedRecipes[0].pricePerServing, readyInMinutes: retrievedRecipes[0].readyInMinutes, servings: retrievedRecipes[0].servings, sourceUrl: retrievedRecipes[0].sourceUrl, summary: retrievedRecipes[0].summary, title: retrievedRecipes[0].title, vegan: retrievedRecipes[0].vegan, vegetarian: retrievedRecipes[0].vegetarian}
          console.log(shortRetrievedRecipe)
          console.log(data.recipes[0])
          randomRecipe = shortRetrievedRecipe
          console.log(randomRecipe)
          dispatch({ type: "SET RANDOM RECIPE", payload: randomRecipe})
        } catch (err) {
          console.log(err)
        }
      }

      
      if(stateRandomRecipe.title === 'no recipe'){
        fetchRandomRecipe()
        console.log(randomRecipe)
      } else {
        randomRecipe = stateRandomRecipe
      }
      

console.log(randomRecipe)
    return (
      <>
        {stateRandomRecipe.title !== 'no recipe' && 
          (<div className={"randomRecipeContainer " + stateRandomRecipe.id} onClick={viewRecipe} id={stateRandomRecipe.id}>
            <h3>Recipe of the day</h3>
            <div className={"randomRecipe " + stateRandomRecipe.id}>
              <div className={"randomRecipeImg " + stateRandomRecipe.id}>
                <img src={stateRandomRecipe.image} alt="random recipe image"/>
              </div>
              <div className={"randomRecipeInfo " + stateRandomRecipe.id}>
                <p>{stateRandomRecipe.title}</p>
                <p>This recipe only takes {stateRandomRecipe.readyInMinutes} minutes to be ready!</p>
            </div>
            </div>
        </div>)}
      </>
    );
  }
  
  export default RandomRecipe;
