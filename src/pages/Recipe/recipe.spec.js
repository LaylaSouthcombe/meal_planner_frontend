import { default as Recipe } from ".";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as router from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import "@testing-library/jest-dom";

describe("LoginComponent", () => {
  const navigate = jest.fn();
  
let recipe
//   const recipePage = (
//     <Provider store={store}>
//       <Router>
//         <Recipe recipe={recipe}/>
//       </Router>
//     </Provider>
//   )
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    
  });
//   test("it unfaves the recipe when clicked ", () => {
//     recipe = {
//         "id": 639620,
//         "image": "https://spoonacular.com/recipeImages/639620-556x370.jpg",
//         "title": "Classic New England Crab Cakes",
//         "fave": true
//     }
//     render(<Provider store={store}>
//         <Router>
//           <Recipe recipe={recipe}/>
//         </Router>
//       </Provider>)
//     const fave = screen.getByTestId("faved");
//     fireEvent.click(fave);
//     expect(fave.classList).toContain("unfaved");
//   });
//   test("it faves the recipe when clicked ", async () => {
//     recipe = {
//         "id": 639620,
//         "image": "https://spoonacular.com/recipeImages/639620-556x370.jpg",
//         "title": "Classic New England Crab Cakes",
//         "fave": false
//     }
//     render(<Provider store={store}>
//         <Router>
//           <Recipe recipe={recipe}/>
//         </Router>
//       </Provider>)
//     const unfave = await screen.getByTestId("unfaved");
//     fireEvent.click(unfave);
//     expect(unfave.classList).toContain("faved");
//   });

})