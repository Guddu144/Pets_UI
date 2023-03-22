import React, { createContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../dashboard';
import Earning from '../earning/Earning';
import Expense from '../expenses/Expense';
import { Login, SignUp } from '../user';
import Auth from '../user/Auth';
import Layout from './Layout';
import MainLayout from './MainLayout';

export const FormContext = createContext(null)

const App = () => {
  // const [isEarningFormOpen, setIsEarningFormOpen] = useState(false);

  return (
    // <FormContext.Provider value={{ isEarningFormOpen, setIsEarningFormOpen }}>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* public route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Private Route */}
        <Route element={<Auth />} >
          <Route element={<Layout />} >
            <Route path="/" element={<Dashboard />} />
            <Route path="/earning" element={<Earning />} />
            <Route path="/expense" element={<Expense />} />
          </Route>
        </Route>
      </Route>
    </Routes >
    // </FormContext.Provider>
  )
}

export default App;

