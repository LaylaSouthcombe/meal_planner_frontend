import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import { onSubmit, handleServiceChange } from '.'
import { default as UserPreferenceComponent } from './index'

import "@testing-library/jest-dom";


const navigate = jest.fn();

const UserPrefs = (
    <Provider store={store}>
        <Router>
            <UserPreferenceComponent />
        </Router>
    </Provider>
);
describe("meals-section checkbox tests", () => {


    beforeEach(async () => {
        jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
        render(UserPrefs);
    });

    test("it renders the form ", () => {
        const form = screen.getByTestId('onsubmit');
        expect(form).toBeInTheDocument()
        // fireEvent.click(button);
        // expect(navigate).toHaveBeenCalledWith("/");
    });


    test("checks visibility of checkbox", () => {
        const checkbox = screen.getByTestId("handleServiceChange1");
        expect(checkbox.checked).toEqual(false)
        const label = screen.getByTestId("label1");
        expect(label).toBeInTheDocument()

        fireEvent.click(checkbox);
        expect(checkbox.checked).toEqual(true)
        expect(label).toHaveStyle('visibility: visible')
    })
    test("checks visibility of checkbox", () => {
        const checkbox = screen.getByTestId("handleServiceChange2");
        expect(checkbox.checked).toEqual(false)
        const label = screen.getByTestId("label2");
        expect(label).toBeInTheDocument()
        fireEvent.click(checkbox);
        expect(checkbox.checked).toEqual(true)
        expect(label).toHaveStyle('visibility: visible')
    })

    test("checks visibility of checkbox", () => {
        const checkbox = screen.getByTestId("handleServiceChange3");
        expect(checkbox.checked).toEqual(false)
        const label = screen.getByTestId("label3");
        expect(label).toBeInTheDocument()
        fireEvent.click(checkbox);
        expect(checkbox.checked).toEqual(true)
        expect(label).toHaveStyle('visibility: visible')
    })

    test("checks visibility of checkbox", () => {
        const checkbox = screen.getByTestId("handleServiceChange4");
        expect(checkbox.checked).toEqual(false)
        const label = screen.getByTestId("label4");
        expect(label).toBeInTheDocument()
        fireEvent.click(checkbox);
        expect(checkbox.checked).toEqual(true)
        expect(label).toHaveStyle('visibility: visible')
    })

    test("checks visibility of checkbox", () => {
        const checkbox = screen.getByTestId("handleServiceChange5");

        expect(checkbox.checked).toEqual(false)
        const label = screen.getByTestId("label5");
        expect(label).toBeInTheDocument()
        fireEvent.click(checkbox);
        expect(checkbox.checked).toEqual(true)
        expect(label).toHaveStyle('visibility: visible')
    })
})

describe("meals-section checkbox tests", () => {


    beforeEach(async () => {
        jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
        render(UserPrefs);
    });



    test("checks navigation has been called", () => {
        const span = screen.getByTestId("span");
        fireEvent.click(span);
        expect(navigate).toHaveBeenCalledWith("/mealplan");
    })

    test("checks output of form ", () => {
        const form = screen.getByTestId('onsubmit');
        // expect(form).toBeInTheDocument()
        const p = screen.getByTestId("p");
        fireEvent.submit(form);
        expect(p).not.toBeVisible()
        // expect(navigate).toHaveBeenCalledWith("/");
    });

})
