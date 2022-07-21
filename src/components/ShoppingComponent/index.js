import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import ReactDOM from 'react-dom/client';
import { render } from '@testing-library/react';
import parse from 'html-react-parser'
const ShoppingComponent = ({shoppingList}) => {

const [emailMessageVisibility, setEmailMessageVisibility] = useState("hidden")
let newHtmlArray = []
let newHtmlString 

const createHtmlString = () => {
    for(let i = 0; i < shoppingList.aisles.length; i++){
        let aisleHtmlArray = []
        let itemHtmlArray = []
        {aisleHtmlArray.push(`<div id=${"aisle" + i}>
                <h2>${shoppingList.aisles[i].aisle}</h2>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Amount (metric)</th>
                                <th>Amount (us)</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>`)}
        for(let j = 0; j < shoppingList.aisles[i].items.length; j++){
            // console.log(shoppingList.aisles[i].items)
            let aisleItem = shoppingList.aisles[i].items[j]
            {itemHtmlArray.push(`<tr className=${"a" + i + "tableRow" + j}>
                                        <td>${aisleItem.name}</td>
                                        <td>
                                        ${aisleItem.measures.metric.amount} 
                                        ${aisleItem.measures.metric.unit}</td>
                                        <td>
                                        ${aisleItem.measures.us.amount} 
                                        ${aisleItem.measures.us.unit}</td>
                                        <td>£${(aisleItem.cost/100).toFixed(2)}</td>
                                        <td>£${(aisleItem.cost/100).toFixed(2)}</td>
                                    </tr>`)}
                                    
        }
        let endingHtml = "</tbody></table></div>"
        itemHtmlArray.push(endingHtml)
        let stringItemHtmlArray = itemHtmlArray.join("")
        let stringAisleHtmlArray = aisleHtmlArray.join("")
        newHtmlArray.push(stringAisleHtmlArray)
        newHtmlArray.push(stringItemHtmlArray)
        newHtmlString = newHtmlArray.join("")
    }
}
    const emailShopping = async (e) => {
        e.preventDefault()
        try {
            createHtmlString()
            const message = {message: "Meal plan shopping list", html: `<style>h1 {color:pink}</style><h1>Your personalised meal plan shopping list is ready!</h1><div>${newHtmlString}</div><p>Predicted cost: £${(shoppingList.cost/100).toFixed(2)}</p>`}
            const { data } = await axios.post(`https://mealplannerserver.herokuapp.com/email/`, JSON.stringify(message))
            console.log(data)
            setEmailMessageVisibility("visible")
        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <>
        {shoppingList.aisles.map((aisle, i) => {
            return (
                <div id={"aisle" + i}>
                    <h2>{aisle.aisle}</h2>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Amount (metric)</th>
                                    <th>Amount (us)</th>
                                    <th>Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aisle.items.map((aisleItem, j) => {
                                    return (
                                        <tr className={"a" + i + "tableRow" + j}>
                                            <td>{aisleItem.name}</td>
                                            <td>{aisleItem.measures.metric.amount} {aisleItem.measures.metric.unit}</td>
                                            <td>{aisleItem.measures.us.amount} {aisleItem.measures.us.unit}</td>
                                            <td>£{(aisleItem.cost/100).toFixed(2)}</td>
                                        </tr>
                                    )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            )})}
        <p data-testid="cost">Predicted cost: £{(shoppingList.cost / 100).toFixed(2)}</p>
        <div className="shoppingListButton">
                <button className="emailShoppingList" data-testid="emailBtn" onClick={emailShopping}>Email me my shopping list</button>
        </div>
        <div className="emailConfirm" style={{visibility: emailMessageVisibility}}>
            <p>Email successful, check your inbox!</p>
        </div>
        </>
    )

};

export default ShoppingComponent;
