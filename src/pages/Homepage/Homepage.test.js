import { default as Homepage } from ".";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import "@testing-library/jest-dom";
import reducer  from "../../reducers/reducer";
import { initialState }  from "../../reducers/reducer";
import { createStore } from "redux";


describe("Homepage", () => {
  const navigate = jest.fn();
  const Home = (
    <Provider store={store}>
      <Router>
        <Homepage />
      </Router>
    </Provider>
  );

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    render(Home);
  });

  test("it renders the button 'Logout' ", () => {
    const link = screen.getByText(/Set budget/i);
    expect(link).toBeTruthy();
    // fireEvent.click(button);
    // expect(navigate).toHaveBeenCalledWith("/");
  });
  test("it navigates you to login", () => {
    const navLog = screen.getByTestId(/navLog/i);
    expect(navLog).toBeTruthy();
    fireEvent.click(navLog);
    expect(navigate).toHaveBeenCalledWith("/login");
  });

})

function renderWithProviders(ui, { reduxState } = {}) {
  const store = createStore(reducer, reduxState || initialState);
  return render(<Provider store={store}><Router>{ui}</Router></Provider>);
}

describe("MealPlan redux 2", () => {
  const navigate = jest.fn();
  beforeEach(() => {
      jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    });
    test("Renders random fact", async () => {
      renderWithProviders(<Homepage />, {
        reduxState: {
          random_fact: "fact",
          random_recipe: { title: "no recipe" }
        }
      });
      const randomFact = screen.getByTestId(/randomFact/i)
    expect(randomFact).toBeInTheDocument();
  });
  })