import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FiCheck, FiTrash2 } from 'react-icons/fi';
import c from "./Event.module.scss"

const PatchEvent = () => {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [coins, setCoins] = useState('');
  const [location, setLocation] = useState('');
  const [singleEv, setSingleEv] = useState([]);

  const formatDate = (selectedDate) => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const hours = String(selectedDate.getHours()).padStart(2, '0');
    const minutes = String(selectedDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

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

  function changeStatus(e) {
    e.preventDefault();

    axios
      .get(`https://api.ricoin.uz/api/events/${eventId}`, { headers })
      .then((response) => {
        setSingleEv(response.data);
      });

    const setDate = date ? formatDate(new Date(date)) : singleEv.date;

    axios
      .patch(
        `https://api.ricoin.uz/api/events/${eventId}`,
        {
          name,
          coins,
          date: setDate,
          location,
        },
        { headers }
      )
      .then(() => {
        alert('Event status changed!');
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId
              ? { ...event, name, coins, date: formatDate(new Date(date)), location }
              : event
          )
        );
        window.location.reload();
      })
      .catch(() => {
        alert('An error occurred. Please try again later.');
      });
  }

  function deleteEvent(id) {
    axios
      .delete(`https://api.ricoin.uz/api/events/${id}`, { headers })
      .then(() => {
        alert('Event has been deleted!');
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      })
      .catch(() => {
      });
  }

  return (
    <div className={c.all_orders}>
      {events.length ? (
        events.map((event) => (
          <form onSubmit={changeStatus} className={c.single_order} key={event.id}>
            <div className={c.delete_btn} onClick={() => deleteEvent(event.id)}>
              <FiTrash2 />
            </div>
            <p><b>Name:</b> {event.name}</p>
            <p><b>Coins:</b> {event.coins} coins</p>
            <p><b>Date:</b> {event.date} </p>
            <p><b>Location:</b> {event.location} </p>
            <i><b>You can change the properties here...</b></i>
            <input type="text" placeholder="Event Name..." onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Event Coins..." onChange={(e) => setCoins(e.target.value)} />
            <input type="datetime-local" onChange={(e) => setDate(e.target.value)} />
            <input type="text" placeholder="Event Location..." onChange={(e) => setLocation(e.target.value)} />
            <button onClick={() => setEventId(event.id)}>
              <FiCheck /> Done
            </button>
          </form>
        ))
      ) : (
        <p>No Events</p>
      )}
    </div>
  );
};

export default PatchEvent;
