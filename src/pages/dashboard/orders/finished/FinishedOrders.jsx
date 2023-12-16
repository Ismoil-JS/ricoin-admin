import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import c from "../pending/Orders.module.scss"

const FinishedOrders = () => {
  const [orders, setOrders] = useState([]); // [1

  // Retrieve the token from local storage
  const token = localStorage.getItem('token');

  // Define the headers with the Authorization header containing the token using useMemo
  const headers = useMemo(() => {
    return {
      'x-auth-token': token, // Correctly formatted Authorization header
    };
  }, [token]);

  useEffect(() => {
    axios
      .get('https://api.ricoin.uz/api/exchanges/finished', { headers })
      .then((response) => {
        setOrders(response.data);
      })
      .catch(() => {
      });
  }, [headers]);

  return <div className={c.all_orders}>
    {orders.length ? orders.map((order) => {
      return  <div className={c.single_order} key={order.order_id}>
                <p><b>Name:</b> {order.user_full_name}</p>
                <p><b>Product:</b> {order.product_name}</p>
                <p><b>Note:</b> {order.order_explanation ?? "No notes found"}</p>
              </div>;
    }) : <p>No orders</p> }
  </div>;
}

export default FinishedOrders