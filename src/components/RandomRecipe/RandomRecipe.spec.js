import  React from 'react';
import "@testing-library/jest-dom";
import{screen,render} from "@testing-library/react"
import RandomRecipe from './index';
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';


describe("Renders Footer elements", () =>{

    beforeEach(() => {
        render(<RandomRecipe />)
    })
    
    test("Render li element",()=>{
        const li = screen.getByRole('link',{name:"Layla Southcombe"})
        expect(li).toBeInTheDocument()
        expect(li.textContent).toBe('LaylaSouthcombe')
    })

    
    })
    