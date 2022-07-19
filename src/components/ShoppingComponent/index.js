import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";



const ShoppingComponent = ({shoppingList}) => {


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
                                            <td>{aisleItem.cost}</td>
                                        </tr>
                                    )})}

                            </tbody>

                        </table>
                    </div>
                </div>
            )})}
        <p>Predicted cost: {shoppingList.cost}</p>
        </>
    )

};

export default ShoppingComponent;