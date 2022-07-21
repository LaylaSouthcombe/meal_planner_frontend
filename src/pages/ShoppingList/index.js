import React, { useState } from "react";
import { ShoppingComponent } from "../../components";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import "./style.css"

import backArrow from '../../images/backArrow.png'

const ShoppingList = () => {
    const navigate = useNavigate();

    const stateShoppingList = useSelector(state => state.shopping_list)

    return (
        <>
            <div className="backButton" data-testid="back" onClick={() => navigate(-1)}><img src={backArrow} alt="back button" /><p>Back</p></div>
            <h1 id="shoppingListTitle5" data-testid="ShoppingList">Shopping list</h1>
            {stateShoppingList.length === 0 && (
                <div className="noPreferences">
                    <p className="shoppingP5 " data-testid="custom-element">You have not got a shopping list, generate a meal plan <span data-testid="mealnav" onClick={() => navigate('/mealplan')}>here</span> first</p>
                </div> 
            )}
            {stateShoppingList.length !== 0 && (
                <>
                    <ShoppingComponent shoppingList={stateShoppingList} />
                </>
            )}
        </>
    )

};

export default ShoppingList;
