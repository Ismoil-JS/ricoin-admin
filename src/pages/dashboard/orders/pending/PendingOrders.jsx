import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FiCheck, FiClock } from "react-icons/fi";
import c from "./Orders.module.scss";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const [explanation, setExplanation] = useState();

  const token = localStorage.getItem("token");

  const headers = useMemo(() => {
    return {
      "x-auth-token": token,
    };
  }, [token]);

  useEffect(() => {
    axios
      .get("https://api.ricoin.uz/api/exchanges/pending", { headers })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [headers]);

  function changeStatus(e) {
    e.preventDefault();
    axios
      .patch(
        `https://api.ricoin.uz/api/exchanges/${orderId}`,
        {
          explanation,
        },
        { headers }
      )
      .then(() => {
        alert("Order status changed!");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className={c.all_orders}>
      <table className={c.orders_table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Explanation</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length ? (
            orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.user_full_name}</td>
                <td>{order.product_name}</td>
                <td>{order.order_amount ?? 1}</td>
                <td>
                  <input
                    required
                    type="text"
                    placeholder="Any notes..(date)"
                    onChange={(e) => setExplanation(e.target.value)}
                  />
                </td>
                <td className={c.order_status}>
                  <FiClock /> Pending...
                </td>
                <td>
                  <button
                    onClick={(e) => {
                      setOrderId(order.order_id);
                      changeStatus(e);
                    }}
                  >
                    <FiCheck /> Done
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No orders</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingOrders;
