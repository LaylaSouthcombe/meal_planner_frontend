import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar, Footer } from "./components";
import {
  History,
  Homepage,
  Login,
  MealPlan,
  Recipe,
  Register,
  ShoppingList,
  UserPreferences,
  PageNotFound
} from "./pages";

import "./App.css";

function App() {

  return (
    <>
      <header >
        <NavBar />
      </header>
      <div className="content-container">
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="history" element={<History />} />
        <Route path="login" element={<Login />} />
        <Route path="mealplan" element={<MealPlan />} />
        <Route path="recipe" element={<Recipe />} />
        <Route path="register" element={<Register />} />
        <Route path="shoppinglist" element={<ShoppingList />} />
        <Route path="preferences" element={<UserPreferences />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </div>
      <footer className="footer--pin">
        <Footer />
      </footer>
    </>
  );
}

export default App;
