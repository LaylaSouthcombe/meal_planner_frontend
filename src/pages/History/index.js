import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import Collapsible from 'react-collapsible';
import { CollapsibleRecipes } from '../../components';

const History = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const recipeId = useSelector(state => state.recipe_id)
    console.log("state recipe id history", recipeId)

    const userHistoryState = useSelector(state => state.users_recipe_history)
    console.log("state user history", userHistoryState[0].recipes)
    const [favourited, setFavourited] = useState(false)
    const [btnText, setBtnText] = useState('Show Favourites')

    const onBtnClick = (e) => {
        e.preventDefault()
        if (favourited) {
            setFavourited(false)
            setBtnText('Show Favourites')
        } else {
            setFavourited(true)
            setBtnText('Show All')
        }
    }
    const initialUsersHistoryRecipes = [
        {
            date: "date", recipes: {
                breakfast: [{ id: "", title: "", fave: "" }],
                lunch: [{ id: "", title: "", fave: "" }],
                dinner: [{ id: "", title: "", fave: "" }],
                dessert: [{ id: "", title: "", fave: "" }],
                snacks: [{ id: "", title: "", fave: false }]
            }
        }
    ]


    return (
        <>
            <h1 data-testid="historyH1">History</h1>
            {/* if the users history is same as initial state they are redirected to submit a meal plan */}
            {userHistoryState[0].recipes.breakfast.length === 0 && userHistoryState[0].recipes.lunch.length === 0 && userHistoryState[0].recipes.dinner.length === 0 && userHistoryState[0].recipes.dessert.length === 0 && userHistoryState[0].recipes.snacks.length === 0 && (
                <p >You have not submitted any meal plans yet, create one <span data-testId="navigateBtn" onClick={() => navigate('/mealplan')}>here</span></p>
            )}
            {/* if user has a meal plan history the code under renders, which returns a collapsible for each week, which each contain collapsibles for each meal type if they contain data */}
            {userHistoryState[0].recipes.breakfast.length === 0 || userHistoryState[0].recipes.lunch.length === 0 || userHistoryState[0].recipes.dinner.length === 0 || userHistoryState[0].recipes.dessert.length === 0 || userHistoryState[0].recipes.snacks.length === 0 || (
                <button data-testid="faveBtn" onClick={(e) => {
                    onBtnClick(e)
                    console.log("this is from history " + favourited)
                }}>{btnText}</button>
            )}
            {initialUsersHistoryRecipes !== userHistoryState && (

                userHistoryState.map((week, i) => {
                    return (
                        <>

                            <div className="week" key={i}>
                                <Collapsible trigger={week.today_date}>
                                    {week.recipes.breakfast.length > 0 && (
                                        <CollapsibleRecipes favourited={favourited} fullRecipes={week.recipes} triggerName="Breakfast" meal="breakfast" page="history" date={week.today_date} />
                                    )}
                                    {/* {week.recipes.breakfast.length > 0 && (
                        <CollapsibleRecipes recipes={recipes} triggerName="Breakfast"/>
                        )} */}
                                    {week.recipes.lunch.length > 0 && (
                                        <CollapsibleRecipes favourited={favourited} fullRecipes={week.recipes} triggerName="Lunch" meal="lunch" page="history" date={week.today_date} />
                                    )}
                                    {week.recipes.dinner.length > 0 && (
                                        <CollapsibleRecipes favourited={favourited} fullRecipes={week.recipes} triggerName="Dinner" meal="dinner" page="history" date={week.today_date} />
                                    )}
                                    {week.recipes.dessert.length > 0 && (
                                        <CollapsibleRecipes favourited={favourited} fullRecipes={week.recipes} triggerName="Dessert" meal="dessert" page="history" date={week.today_date} />
                                    )}
                                    {week.recipes.snacks.length > 0 && (
                                        <CollapsibleRecipes favourited={favourited} fullRecipes={week.recipes} triggerName="Snacks" meal="snacks" page="history" date={week.today_date} />
                                    )}
                                </Collapsible>
                            </div>
                        </>
                    )
                })
            )}
        </>
    )
};

export default History;