import React from 'react'
import { NavLink, Outlet } from "react-router-dom"
import c from "./Dashboard.module.scss"

const Dashboard = () => {
  return (
    <div>
        <h1>Dashboard</h1>
      <div>
        <ul className={c.auth__nav}>
          <li></li>
          <li>
            <NavLink className={(navData) => (navData.isActive ? c.auth__link__active : null)} to="/dashboard/event">Event</NavLink>
          </li>
          <li>
            <NavLink className={(navData) => (navData.isActive ? c.auth__link__active : null)} to="/dashboard/product">Product</NavLink>
          </li>
          <li>
            <NavLink className={(navData) => (navData.isActive ? c.auth__link__active : null)} to="/dashboard/orders">Orders</NavLink>
          </li>
          <li>
            <NavLink className={(navData) => (navData.isActive ? c.auth__link__active : null)} to="/dashboard/user">User</NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  )
}

export default Dashboard;
