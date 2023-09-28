import { default as History } from ".";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import "@testing-library/jest-dom";
import reducer  from "../../reducers/reducer";
import { initialState }  from "../../reducers/reducer";
import { createStore } from "redux";


describe("History", () => {
  const navigate = jest.fn();
  const history = (
    <Provider store={store}>
      <Router>
        <History />
      </Router>
    </Provider>
  );

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    render(history);
  });

  test("it renders", () => {
    const heading = screen.getByTestId(/historyH1/i);
    expect(heading).toBeTruthy();
  });
  test("it filters faves", () => {
    const faveBtn = screen.getByTestId(/faveBtn/i);
    expect(faveBtn).toBeTruthy();
    fireEvent.click(faveBtn)
    expect(screen.getByText(`Show All`)).toBeInTheDocument()
  });
  test("it filters faves", () => {
    const faveBtn = screen.getByTestId(/faveBtn/i);
    expect(faveBtn).toBeTruthy();
    expect(screen.getByText(`Show Favourites`)).toBeInTheDocument()
  });
})

 function renderWithProviders(ui, { reduxState } = {}) {
    const store = createStore(reducer, reduxState || initialState);
    return render(<Provider store={store}><Router>{ui}</Router></Provider>);
    }
describe("History redux", () => {
   
    
    const navigate = jest.fn();
    beforeEach(() => {
        jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
      });
      test("header not logged in", () => {
        const { getByText } = renderWithProviders(<History />, {
          store: { preferences_set: false }
        });
        getByText("History");
      });
    test("Not submitted meal plans renders", () => {
        renderWithProviders(<History />, {
          reduxState: {
            users_recipe_history: [
                {
                    date: "date", recipes: {
                        breakfast: [],
                        lunch: [],
                        dinner: [],
                        dessert: [],
                        snacks: []
                    }
                }
            ]
          }
        });
        const navigateBtn = screen.getByTestId("navigateBtn");
        expect(navigateBtn).toBeTruthy()
        fireEvent.click(navigateBtn);
        expect(navigate).toHaveBeenCalledWith("/mealplan");
    });
})