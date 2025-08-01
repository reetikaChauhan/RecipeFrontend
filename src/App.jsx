import './App.css'
import React, { useState, useEffect } from "react";
import Home from "./Components/Home";
//import Navbar from "./components/Navbar";
import RecipeById from "./Components/RecipeByID";
import AddRecipe from "./Components/AddRecipe";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import UpdateRecipe from "./Components/UpdateRecipe";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home />
            }
          />
          <Route path="/add_recipe" element={<AddRecipe />} />
          <Route path="/recipe" element={<RecipeById  />} />
          <Route path="recipe/:id" element={<RecipeById />} />
          <Route path="/recipe/update/:id" element={<UpdateRecipe />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
