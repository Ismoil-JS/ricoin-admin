import React, { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import c from "./Dashboard.module.scss"

const Dashboard = () => {

  const navigate = useNavigate();
  const {pathname} = useLocation();

  useEffect(() => {
    if (pathname === "/dashboard") {
      navigate("/dashboard/event")
    }
  }, [navigate, pathname]);

  return (
    <div>
        <h1>Dashboard</h1>
      <div>
        <ul className={c.auth__nav}>
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
