import React from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveAppBar from './components/AppBar/App-Bar'

export const RootElement = () => {
  return (
    <div>
        <ResponsiveAppBar />
        <br />  
        <Outlet />
    </div>
  )
} 