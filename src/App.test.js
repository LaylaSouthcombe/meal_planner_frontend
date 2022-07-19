import App from './App';
import { screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "./store";
import "@testing-library/jest-dom";

describe("Index", () => {
test('renders learn react link', () => {
    render(
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    );
    const heading = screen.getByText(/name/i);
    expect(heading).toBeInTheDocument();
});
})