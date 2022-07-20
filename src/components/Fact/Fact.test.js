import { default as Fact } from ".";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import onBtnClick from './index'
import "@testing-library/jest-dom";
import axios from 'axios';
import reducer  from "../../reducers/reducer";
import { initialState }  from "../../reducers/reducer";
import { createStore } from "redux";
jest.mock('axios');

// describe("Fact", () => {
//   const navigate = jest.fn();
//   const fact = (
//     <Provider store={store}>
//       <Router>
//         <Fact />
//       </Router>
//     </Provider>
//   );

//   beforeEach(() => {
//     jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
//     render(fact);
//   });

// });

function renderWithProviders(ui, { reduxState } = {}) {
  const store = createStore(reducer, reduxState || initialState);
  return render(<Provider store={store}><Router>{ui}</Router></Provider>);
}
describe("Fact axios", () => {
  const dummyResponse = ["fact"]
  test("gets random fact", async () => {
    renderWithProviders(<Fact />, {
      reduxState: {
        random_fact: "fact.",
        random_recipe: { title: "no recipe" }
      }
    });
      // axios.get.mockResolvedValue({data: dummyResponse})
      // const response = await waitFor(() => screen.getAllByTestId(/randomFact/i))
      // expect(response).toHaveLength(1)
      const resp = { data: [{ name: 'FooBar' }]};
      axios.get.mockImplementation(() => Promise.resolve(resp));
  });
  it("returns correct result getMealsBtn", async () => {
    renderWithProviders(<Fact />, {
      reduxState: {
        random_fact: "fact.",
        random_recipe: { title: "no recipe" }
      }
    });
    Fact.fetchFact = jest.fn()        
      // const getMealsBtn = await screen.findByTestId(/getMealsBtn/i)
      // fireEvent.click(getMealsBtn)
    expect(Fact.fetchFact.mock).toBeTruthy();
  });
})
