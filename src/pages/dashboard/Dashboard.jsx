import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import c from "./Dashboard.module.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/dashboard") {
      navigate("/dashboard/event");
    }
  }, [navigate, pathname]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "pending") {
      navigate("/dashboard/orders/pending");
    } else if (value === "finished") {
      navigate("/dashboard/orders/finished");
    }
  };

  const handleProductChange = (event) => {
    const value = event.target.value;
    if (value === "create") {
      navigate("/dashboard/product/create");
    } else if (value === "change") {
      navigate("/dashboard/product/change");
    }
  };

  const handleEventChange = (event) => {
    const value = event.target.value;
    if (value === "create") {
      navigate("/dashboard/event/create");
    } else if (value === "change") {
      navigate("/dashboard/event/change");
    } else if (value === "qrcode") {
      navigate("/dashboard/event/qr-code");
    }
  };

  return (
    <div>
      <div>
        <ul className={c.auth__nav}>
          <strong className={c.head}>Ricoin</strong>
          <li>
            <select
              name="Event"
              id=""
              onChange={handleEventChange}
              defaultValue="event"
            >
              <option value="event" disabled>
                Event
              </option>
              <option value="create">Create</option>
              <option value="change">Change</option>
              <option value="qrcode">QR-Code</option>
            </select>
          </li>
          <li>
            <select
              name="Product"
              id=""
              onChange={handleProductChange}
              defaultValue="product"
            >
              <option value="product" disabled>
                Product
              </option>
              <option value="create">Create</option>
              <option value="change">Change</option>
            </select>
          </li>
          <li>
            <select
              name="Order"
              onChange={handleSelectChange}
              defaultValue="order"
            >
              <option value="order" disabled>
                Order
              </option>
              <option value="pending">Pending</option>
              <option value="finished">Finished</option>
            </select>
          </li>
          <li>
            <NavLink to="/dashboard/user">User</NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
