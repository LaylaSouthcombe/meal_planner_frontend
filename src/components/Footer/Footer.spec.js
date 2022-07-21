import  React from 'react';
import "@testing-library/jest-dom";
import{screen,render} from "@testing-library/react"
import Footer from './index';
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';


describe("Renders Footer elements", () =>{

    beforeEach(() => {
        render(<Footer />)
    })
    
    test("Render li element",()=>{
        const li = screen.getByRole('link',{name:"Layla Southcombe"})
        expect(li).toBeInTheDocument()
        expect(li.textContent).toBe('LaylaSouthcombe')
    })

    test("Render li element",()=>{
        const li = screen.getByRole('link',{name:"Ali Hamed"})
        expect(li).toBeInTheDocument()
        expect(li.textContent).toBe('AliHamed')
    })

    test("Render li element",()=>{
        const li = screen.getByRole('link',{name:"Billie Dartnell"})
        expect(li).toBeInTheDocument()
        expect(li.textContent).toBe('BillieDartnell')
    })

    test("Render li element",()=>{
        const li = screen.getByRole('link',{name:"Amir Ali"})
        expect(li).toBeInTheDocument()
        expect(li.textContent).toBe('AmirAli')
    })

    test("Render li element",()=>{
        const li = screen.getByRole('link',{name:"Nadir Khan"})
        expect(li).toBeInTheDocument()
        expect(li.textContent).toBe('NadirKhan')
    })
    
    })
    