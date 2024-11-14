import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import c from "../pending/Orders.module.scss";

const FinishedOrders = () => {
  const [orders, setOrders] = useState([]); // [1]

  // Retrieve the token from local storage
  const token = localStorage.getItem("token");

  // Define the headers with the Authorization header containing the token using useMemo
  const headers = useMemo(() => {
    return {
      "x-auth-token": token, // Correctly formatted Authorization header
    };
  }, [token]);

  useEffect(() => {
    axios
      .get("https://api.ricoin.uz/api/exchanges/finished", { headers })
      .then((response) => {
        setOrders(response.data);
      })
      .catch(() => {
        // Handle error (optional)
      });
  }, [headers]);

  return (
    <div className={c.all_orders}>
      <table className={c.orders_table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {orders.length ? (
            orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.user_full_name}</td>
                <td>{order.product_name}</td>
                <td>{order.order_amount ?? 1}</td>
                <td>{order.order_explanation ?? "No notes found"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No orders</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FinishedOrders;
