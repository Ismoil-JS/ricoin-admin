import React, { useEffect } from "react";
// import c from "./Event.module.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Event = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/dashboard/event") {
      navigate("/dashboard/event/create");
    }
  }, [navigate, pathname]);

  return (
    <div>
      {/* <div>
      <ul className={c.product__nav}>
          <li>
            <NavLink className={(navData) => (navData.isActive ? c.product__link__active : null)} to="/dashboard/event/create">Create</NavLink>
          </li>
          <li>
            <NavLink className={(navData) => (navData.isActive ? c.product__link__active : null)} to="/dashboard/event/change">Change</NavLink>
          </li>
          <li>
            <NavLink className={(navData) => (navData.isActive ? c.product__link__active : null)} to="/dashboard/event/qr-code">QR-Code</NavLink>
          </li>
        </ul>
      </div> */}
      <Outlet />
    </div>
  );
};

export default Event;
