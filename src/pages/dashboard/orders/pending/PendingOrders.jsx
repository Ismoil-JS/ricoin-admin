import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { FiCheck, FiClock } from 'react-icons/fi';
import c from "./Orders.module.scss"


const PendingOrders = () => {
  const [orders, setOrders] = useState([]); // [1]
  const [orderId, setOrderId] = useState([]); // [1]
  const [explanation, setExplanation] = useState(); // [1]

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
      .get('https://api.ricoin.uz/api/exchanges/pending', { headers })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [headers]);


  function changeStatus(e){
    e.preventDefault();
    axios
      .patch(`https://api.ricoin.uz/api/exchanges/${orderId}`, 
      {
        explanation
      },
      { headers })
      .then(() => 
        {
          alert("Order status changed!")
          window.location.reload()
        }
      )
    .catch()
  }

  return <div className={c.all_orders}>
    {orders.length ? orders.map((order) => {
      return  <form onSubmit={changeStatus} className={c.single_order} key={order.order_id}>
                <p><b>Name:</b> {order.user_full_name}</p>
                <p><b>Product:</b> {order.product_name}</p>
                <p><b>Quantity:</b> {order.order_amount ?? 1 }</p>
                <input required type="text" placeholder='Any notes..(date)' onChange={(e) => setExplanation(e.target.value)}/>
                <p className={c.order_status}><FiClock /> Pending...</p>
                <button onClick={(e) => setOrderId(order.order_id)}><FiCheck /> Done</button>
              </form>;
    }) : <p>No orders</p>}
  </div>;
}

export default PendingOrders;
