import React from 'react';
import {Routes,Route} from "react-router-dom";
import RegisterPage from './pages/RegisterPage.js';
import LoginPage from './pages/LoginPage.js'; 
import IndexPage from './pages/IndexPage'; 
import { PrivateRoute } from './PrivateRoute.js';

function App() {

  return (
   
      <Routes>
       <Route path="/" element={
            <PrivateRoute>
              <IndexPage/>
            </PrivateRoute>
        }/>
        <Route path="/login" element={<LoginPage/>} exact />
        <Route path="/register" element={<RegisterPage/>} exact />
      </Routes>

  );
};

export default App;