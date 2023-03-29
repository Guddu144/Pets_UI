import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../dashboard';
import { ForgottenPassword, Login, SignUp } from '../user';
import Auth from '../user/Auth';
import Layout from './Layout';
import MainLayout from './MainLayout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* public route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgottenPassword />} />
        {/* Private Route */}
        <Route element={<Auth />} >
          <Route element={<Layout />} >
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Route>
    </Routes >
  )
}

export default App

