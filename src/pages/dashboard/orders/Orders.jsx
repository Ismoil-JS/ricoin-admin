import React, { useEffect } from 'react'
import c from "./Orders.module.scss"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"

const Orders = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  useEffect(() => {
    if (pathname === "/dashboard/orders") {
      navigate("/dashboard/orders/pending")
    }
  }, [navigate, pathname]);

  return (
    <div>
      <div>
      <ul className={c.auth__nav}>
          <li></li>
          <li>
            <NavLink className={(navData) => (navData.isActive ? c.auth__link__active : null)} to="/dashboard/orders/pending">Pending</NavLink>
          </li>
          <li>
            <NavLink className={(navData) => (navData.isActive ? c.auth__link__active : null)} to="/dashboard/orders/finished">Finished</NavLink>
          </li>
        </ul>
      </div>
      < Outlet />
    </div>
  )
}

export default Orders
