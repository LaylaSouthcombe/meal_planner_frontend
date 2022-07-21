import  React from 'react';
import "@testing-library/jest-dom";
import{screen,render, fireEvent} from "@testing-library/react"
import Shopping from './index';
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';


// describe("Renders Footer elements", () =>{
//     const list = {aisles: Array(15), cost: 3023.26}

//     beforeEach(() => {
//         render(<Shopping shoppingList={list} />)
//     })
    
//     test("Render li element",()=>{
//         const li = screen.getByRole('link',{name:"Layla Southcombe"})
//         expect(li).toBeInTheDocument()
//         expect(li.textContent).toBe('LaylaSouthcombe')
//     })

    
// })
// jest.mock(Shopping)
    describe("Renders shopping list", () =>{
        const shoppingList = {
            "aisles": [
                {
                    "aisle": "Ethnic Foods",
                    "items": [
                        {
                            "name": "tapioca flour",
                            "measures": {
                                "original": {
                                    "amount": 0.25,
                                    "unit": "cups"
                                },
                                "metric": {
                                    "amount": 30,
                                    "unit": "g"
                                },
                                "us": {
                                    "amount": 1.1,
                                    "unit": "oz"
                                }
                            },
                            "pantryItem": false,
                            "aisle": "Ethnic Foods",
                            "cost": 18.21,
                            "ingredientId": 93696
                        }
                    ]
                }
            ],
            "cost": 3023.26
        }
    
        beforeEach(() => {
            render(<Shopping shoppingList={shoppingList} />)
        })
        
        test("Render h1",()=>{
            const cost = screen.getByTestId(/cost/i)
            expect(cost).toBeInTheDocument()
            expect(cost.textContent).toBe('Predicted cost: £30.23')
        })
        it("returns correct result", () => {
            Shopping.createHtmlString = jest.fn()
            const emailBtn = screen.getByTestId(/emailBtn/i)
            fireEvent.click(emailBtn)
            expect(Shopping.createHtmlString.mock).toBeTruthy();
        });
})
    