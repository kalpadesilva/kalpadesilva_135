import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const App = () => {

  const [token, setToken] = useState(null);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/recipes/create' element={<CreateRecipe />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login'
        element={token ? <Navigate to='/' /> : <Login setToken={setToken} />}
      />
      <Route path='*'
        element={token ? null : <Navigate to='/login' />}
      />
    </Routes>
  );
};

export default App;

