import React, { useState } from 'react';
import axios from 'axios';
import c from './Event.module.scss';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [coins, setCoins] = useState('');
  const [location, setLocation] = useState('');

  

  const formatDate = (selectedDate) => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const hours = String(selectedDate.getHours()).padStart(2, '0');
    const minutes = String(selectedDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  function createProduct(e) { 
    e.preventDefault();

    const headers = { 'x-auth-token': localStorage.getItem('token') };

    axios
      .post('https://api.ricoin.uz/api/events', {
        name, 
        coins,
        date: formatDate(new Date(date)),
        location
      }, {
        headers,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          alert("Event created");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          alert("You are not an admin");
        } else {
          alert("An error occurred. Please try again later.");
        }
      });
  }


  return (
    <div>
      <form onSubmit={createProduct} className={c.product__form}>
        <input required type="text" placeholder="Event Name..." onChange={(e) => setName(e.target.value)} />
        <input required type="number" placeholder="Event Coins..." onChange={(e) => setCoins(e.target.value)} />
        <input required type="datetime-local" onChange={(e) => setDate(e.target.value)} />
        <input required type="text" placeholder="Event Location..." onChange={(e) => setLocation(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateEvent;
