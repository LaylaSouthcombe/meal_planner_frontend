import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { History, Homepage, Login, MealPlan, Recipe, Register, ShoppingList } from './pages';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="history" element={<History />} />
        <Route path="login" element={<Login />} />
        <Route path="mealplan" element={<MealPlan />} />
        <Route path="recipe" element={<Recipe />} />
        <Route path="register" element={<Register />} />
        <Route path="shoppinglist" element={<ShoppingList />} />
      </Routes>
    </>
  );
}

export default App;
