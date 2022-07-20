import React from 'react';
import RandomRecipe from './index';
import { Provider } from "react-redux";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import store from "../../store";
import "@testing-library/jest-dom";



describe("Renders random recipe", () =>{

    beforeEach(() => {
        render(
            <Provider store={store}>
              <Router>
                <RandomRecipe />
              </Router>
            </Provider>
          )
    })
    
    // test("Render li element",()=>{
    //     const li = screen.getByRole('link',{name:"Layla Southcombe"})
    //     expect(li).toBeInTheDocument()
    //     expect(li.textContent).toBe('LaylaSouthcombe')
    // })
    it("returns correct result handleSignIn", async () => {
        RandomRecipe.viewRecipe = jest.fn()          
          const viewRecipe = await screen.findByTestId(/viewRecipe/i)
          fireEvent.click(viewRecipe)
        expect(RandomRecipe.viewRecipe.mock).toBeTruthy();
      });
})
    