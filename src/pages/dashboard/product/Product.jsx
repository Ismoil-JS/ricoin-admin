import React, { useEffect } from 'react'
import c from "./Product.module.scss"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"

const Product = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  useEffect(() => {
    if (pathname === "/dashboard/product") {
      navigate("/dashboard/product/create")
    }
  }, [navigate, pathname]);

  return (
    <div>
      <div>
      <ul className={c.product__nav}>
          <li>
            <NavLink className={(navData) => (navData.isActive ? c.product__link__active : null)} to="/dashboard/product/create">Create</NavLink>
          </li>
          <li>
            <NavLink className={(navData) => (navData.isActive ? c.product__link__active : null)} to="/dashboard/product/change">Change</NavLink>
          </li>
        </ul>
      </div>
      < Outlet />
    </div>
  )
}

export default Product