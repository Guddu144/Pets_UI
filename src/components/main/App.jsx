import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../dashboard';
import Login from '../dashboard/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>

  )
}

export default App

