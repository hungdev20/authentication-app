import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import "./App.css";
import PrivateRoute from "./pages/PrivateRoute";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/"
          element={
            <PrivateRoute>
              <Home /> 
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
