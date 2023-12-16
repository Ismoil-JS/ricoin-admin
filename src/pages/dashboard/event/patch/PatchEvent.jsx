import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FiCheck, FiEdit3, FiTrash2 } from 'react-icons/fi';
import c from "./Event.module.scss"

const PatchEvent = () => {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [coins, setCoins] = useState('');
  const [location, setLocation] = useState('');
  const [singleEv, setSingleEv] = useState([]);
  const [editEventId, setEditEventId] = useState(null);

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
      .catch(() => {
        setLoading(false);
      });
  }, [headers]);

  if (loading) {
    return <p>Loading...</p>;
  }

  function changeStatus(e, eventId) {
    e.preventDefault();

    axios
      .get(`https://api.ricoin.uz/api/events/${eventId}`, { headers })
      .then((response) => {
        setSingleEv(response.data);
      });

    const formattedDate = date ? formatDate(new Date(date)) : singleEv.date;

    axios
      .patch(
        `https://api.ricoin.uz/api/events/${eventId}`,
        {
          name,
          coins,
          date: formattedDate,
          location,
        },
        { headers }
      )
      .then(() => {
        alert('Event status changed!');
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId
              ? {
                ...event, 
                name: name ? name : event.name, 
                coins: coins ? coins : event.coins, 
                date: formattedDate ? formattedDate : event.date, 
                location: location ? location : event.location
              }
              : event
          )
        );
        window.location.reload();
      })
      .catch(() => {
        alert('An error occurred. Please try again later.');
      })
      .finally(() => {
        setEditEventId(null); 
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
          <form onSubmit={(e) => changeStatus(e, event.id)} className={c.single_order} key={event.id}>
            <div className={c.delete_btn} onClick={() => deleteEvent(event.id)}>
              <FiTrash2 />
            </div>
            <p>
              <b className={c.bold}>Name:</b>{' '}
              {editEventId === event.id ? (
                <input type="text" placeholder="Event Name..." onChange={(e) => setName(e.target.value)} />
              ) : (
                event.name
              )}
            </p>
            <p>
              <b>Coins:</b>{' '} 
              {editEventId === event.id ? (
                <input type="number" placeholder="Event Coins..." onChange={(e) => setCoins(e.target.value)} />
              ) : (
                event.coins
              )}
            </p>
            <p>
              <b>Date:</b> {' '} 
              {editEventId === event.id ? (
                <input type="datetime-local" onChange={(e) => setDate(e.target.value)} />
              ) : (
                event.date
              )}
            </p>
            <p>
              <b>Location:</b> {' '} 
              {editEventId === event.id ? (
                <input type="text" placeholder="Event Location..." onChange={(e) => setLocation(e.target.value)} />
              ) : (
                event.location
              )}
            </p>
            {editEventId === event.id ? (
              <button className={c.okButton} type="submit">
                <FiCheck />
              </button>
            ) : <></>}
            <div className={c.edit_btn} onClick={() => setEditEventId(event.id)}><FiEdit3 /></div>
          </form>
        ))
      ) : (
        <p>No Events</p>
      )}
    </div>
  );
};

export default PatchEvent;
