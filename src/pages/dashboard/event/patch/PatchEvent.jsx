import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FiCheck } from 'react-icons/fi';
import c from "./Event.module.scss"

const PatchEvent = () => {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState(null);
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

  // Define the headers with the Authorization header containing the token using useMemo
  const headers = useMemo(() => {
    return { 'x-auth-token': localStorage.getItem('token') };
  }, []);


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://api.ricoin.uz/api/events', { headers })
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [headers]);

  if (loading) {
    return <p>Loading...</p>;
  }
  

  function changeStatus(e){
    e.preventDefault();

    axios
    .patch(
      `https://api.ricoin.uz/api/events/${eventId}`,
      {
        name,
        coins,
        date: formatDate(new Date(date)),
        location,
      },
      { headers }
    )
    .then(() => {
      alert('Event status changed!');
      window.location.reload();
    })
    .catch(() => {
      alert('An error occurred. Please try again later.');
    });
  }

  return <div className={c.all_orders}>
    {events.length ? events.map((event) => {
      return  <form onSubmit={changeStatus} className={c.single_order} key={event.id}>
                <p><b>Name:</b> {event.name}</p>
                <p><b>Coins:</b> {event.coins} coins</p>
                <p><b>Date:</b> {event.date} </p>
                <p><b>Location:</b> {event.location} </p>
                <i><b>You can change the properties here...</b></i>
                <input  type="text" placeholder="Event Name..." onChange={(e) => setName(e.target.value)} />
                <input  type="number" placeholder="Event Coins..." onChange={(e) => setCoins(e.target.value)} />
                <input  type="datetime-local" onChange={(e) => setDate(e.target.value)} />
                <input  type="text" placeholder="Event Location..." onChange={(e) => setLocation(e.target.value)} />
                <button onClick={() => setEventId(event.id)}><FiCheck /> Done</button>
              </form>;
    }) : <p>No Events</p>}
  </div>;
}

export default PatchEvent 
