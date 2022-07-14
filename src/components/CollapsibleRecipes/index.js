import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import './style.css'
import Collapsible from 'react-collapsible';


const CollapsibleRecipes = ({recipes, triggerName}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const recipeId = useSelector(state => state.recipe_id)
  const viewFullRecipe = (e) => {
    const newRecipeId = e.target.parentElement.id
    dispatch({ type: "SET RECIPE ID", payload: newRecipeId})
    navigate("/recipe")
  }

  return (
    <>
          <Collapsible trigger={triggerName}>
            {recipes.map(recipe => {
              return (
                <div className="recipe" id={recipe.id} key={recipe.id} onClick={viewFullRecipe}>
                  <h3>{recipe.title}</h3>
                  {recipe.image && <img src={recipe.image} alt="" />}
                </div>
              )
            })}
          </Collapsible>
    </>
  );
};

export default CollapsibleRecipes;