import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";



function Recipe() {
    // const [recipe, setRecipe] = useState([]);
    const [recipeInstructions, setRecipeInstructions] = useState([]);
    const [recipeReadyInMinutes, setRecipeReadyInMinutes] = useState([]);
    const [recipeImage, setRecipeImage] = useState([]);
    const navigate = useNavigate();
    const stateRecipeId = useSelector(state => state.recipe_id);
    const stateMealPlanRecipes = useSelector(state => state.meal_plan_recipes);
    const stateRandomRecipe = useSelector(state => state.random_recipe);
    console.log(stateRandomRecipe)
    console.log(stateRecipeId)

    let recipe
    if(stateRandomRecipe.id === parseInt(stateRecipeId)) {
        recipe = stateRandomRecipe
    }

    for(let i = 0 ; i < Object.keys(stateMealPlanRecipes).length; i++) {
        for(let j = 0; j < Object.values(stateMealPlanRecipes)[i].length; j++) {
            if(Object.values(stateMealPlanRecipes)[i][j].id === parseInt(stateRecipeId)) {
                recipe = Object.values(stateMealPlanRecipes)[i][j]
            }
        }
    }

console.log(stateMealPlanRecipes)
console.log(recipe)

  
    // useEffect(() => {
  
    //   const fetchRecipe = async () => {
    //     try {
    //       const url = `https://api.spoonacular.com/recipes/random/?apiKey=4a85ed324bd749eba71cf53e82e1c84d`
  
    //       const { data } = await axios.get(url)

    //       const retrievedRecipes = data.recipes
    //       console.log(data.recipes)
    //       let shortRetrievedRecipes = []
    //       let formattedRetrievedRecipes = []

    //       shortRetrievedRecipes = {cheap: retrievedRecipes[0].cheap, dairyFree: retrievedRecipes[0].dairyFree, extendedIngredients: retrievedRecipes[0].extendedIngredients, glutenFree: retrievedRecipes[0].glutenFree, id: retrievedRecipes[0].id, image: retrievedRecipes[0].image, instructions: retrievedRecipes[0].instructions, pricePerServing: retrievedRecipes[0].pricePerServing, readyInMinutes: retrievedRecipes[0].readyInMinutes, servings: retrievedRecipes[0].servings, sourceUrl: retrievedRecipes[0].sourceUrl, summary: retrievedRecipes[0].summary, title: retrievedRecipes[0].title, vegan: retrievedRecipes[0].vegan, vegetarian: retrievedRecipes[0].vegetarian}
    //       formattedRetrievedRecipes.push({...shortRetrievedRecipes, fave: false})

    //       console.log(data.recipes[0])
    //       setRecipe(formattedRetrievedRecipes[0].title)
    //       setRecipeInstructions(formattedRetrievedRecipes[0].instructions)
    //       setRecipeReadyInMinutes(formattedRetrievedRecipes[0].readyInMinutes)
    //       setRecipeImage(formattedRetrievedRecipes[0].image)
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   }
    //   fetchRecipe()
    // }, [])


  

    return (
        <>
        <div onClick={()=> navigate(-1)}>Back</div>
        <h1> {recipe.title} </h1>
        <h1>Ingredient List</h1>
        <ul>
            {recipe.extendedIngredients.map(ingredient => {

                return (
                    <li>
                        {ingredient.original}
                    </li>
                )
            })}
        </ul>
        <img src={recipe.image} alt="" />
        <h1>Nutrition</h1>
        <h1>Recipe Summary</h1>
        <h1>Instructions</h1>
        <p> {recipe.instructions} </p>
        <h1>Take me to the Recipe Link!</h1>
        </>
    );
  }





export default Recipe;
