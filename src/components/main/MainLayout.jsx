import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  )
}

export default MainLayout
