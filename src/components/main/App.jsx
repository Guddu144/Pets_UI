import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../dashboard';
import { ForgottenPassword, Login, Login2, SignUp, SignUp2, UpdatePassword } from '../user';
import Earning from '../earning/Earning';
import Expense from '../expenses/Expense';
import Auth from '../user/Auth';
import Layout from './Layout';
import MainLayout from './MainLayout';
import Party from '../party/Party';
import Transcation from '../transaction/Transcation';
import Goal from '../goals/Goal';
import GoalStatus from '../goal-status/GoalStatus';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* public route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp2 />} />
        <Route path="/forgetpassword" element={<ForgottenPassword />} />
        <Route path="updatePassword/:id" element={<UpdatePassword />} />
        {/* Private Route */}
        <Route element={<Auth />} >
          <Route element={<Layout />} >
            <Route path="/" element={<Dashboard />} />
            <Route path="/earning" element={<Earning />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/party" element={<Party />} />
            <Route path="/transaction" element={<Transcation />} />
            <Route path="/goal" element={<Goal />} />
            <Route path="/goal-status" element={<GoalStatus />} />
          </Route>
        </Route>
      </Route>
    </Routes >
  )
}

export default App;

