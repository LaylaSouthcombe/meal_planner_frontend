import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import apiKey from '../../'

 const RandomRecipe = () => {

  const dispatch = useDispatch()
    const navigate = useNavigate();
    
    let randomRecipe = {}
    
    const viewRecipe = (e) => {
      const parentId = e.target.parentElement.id
      dispatch({ type: "SET RECIPE ID", payload: parentId })
      navigate("/recipe")
    }
  
    const stateRandomRecipe = useSelector(state => state.random_recipe)
    console.log(stateRandomRecipe)
    //TODO:get from state
    let intoleranes = ["eggs", "milk"]
    let intolerancesParamsOld = ""
    for (let i = 0; i < intoleranes.length; i++) {
        intolerancesParamsOld += `,${intoleranes[i]}`
    }
    let intolerancesParams = intolerancesParamsOld.substring(1)

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
          const url = `https://api.spoonacular.com/recipes/random/?apiKey=${apiKey}&tags=${dietParams}&intolerances=${intolerancesParams}&excludeIngredients${intolerancesParams}&includeNutrition=true&instructionsRequired=true`

          const { data } = await axios.get(url)

          const retrievedRecipes = data.recipes
          console.log(data.recipes)
          let shortRetrievedRecipe = []
          shortRetrievedRecipe = {cheap: retrievedRecipes[0].cheap, dairyFree: retrievedRecipes[0].dairyFree, extendedIngredients: retrievedRecipes[0].extendedIngredients, glutenFree: retrievedRecipes[0].glutenFree, id: retrievedRecipes[0].id, image: retrievedRecipes[0].image, instructions: retrievedRecipes[0].instructions, pricePerServing: retrievedRecipes[0].pricePerServing, readyInMinutes: retrievedRecipes[0].readyInMinutes, servings: retrievedRecipes[0].servings, sourceUrl: retrievedRecipes[0].sourceUrl, summary: retrievedRecipes[0].summary, title: retrievedRecipes[0].title, vegan: retrievedRecipes[0].vegan, vegetarian: retrievedRecipes[0].vegetarian}
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
      (<div className="randomRecipe" onClick={viewRecipe} id={stateRandomRecipe.id}>
        {/* <header className="App-header"> */}
          <h1> {stateRandomRecipe.title} </h1>
          <p> This cool recipe will only take {stateRandomRecipe.readyInMinutes} minutes to be ready! </p>
          <img src={stateRandomRecipe.image} alt="" />
        {/* </header> */}
      </div>)}
      </>
      
    );
  }
  
  export default RandomRecipe;
