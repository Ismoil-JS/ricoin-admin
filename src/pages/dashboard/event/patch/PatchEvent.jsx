import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { FiCheck, FiEdit3, FiTrash2 } from "react-icons/fi";
import c from "./Event.module.scss";

const PatchEvent = () => {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [coins, setCoins] = useState("");
  const [location, setLocation] = useState("");
  const [editEventId, setEditEventId] = useState(null);

  const headers = useMemo(() => {
    return { "x-auth-token": localStorage.getItem("token") };
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.ricoin.uz/api/events", { headers })
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [headers]);

  const formatDate = (selectedDate) => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const hours = String(selectedDate.getHours()).padStart(2, "0");
    const minutes = String(selectedDate.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  function changeStatus(e, eventId) {
    e.preventDefault();

    const formattedDate = date
      ? formatDate(new Date(date))
      : events.find((event) => event.id === eventId).date;

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
        alert("Event updated successfully!");
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId
              ? {
                  ...event,
                  name: name || event.name,
                  coins: coins || event.coins,
                  date: formattedDate || event.date,
                  location: location || event.location,
                }
              : event
          )
        );
        setEditEventId(null);
      })
      .catch(() => {
        alert("An error occurred. Please try again later.");
      });
  }

  function deleteEvent(id) {
    axios
      .delete(`https://api.ricoin.uz/api/events/${id}`, { headers })
      .then(() => {
        alert("Event has been deleted!");
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );
      })
      .catch(() => {
        alert("An error occurred. Please try again later.");
      });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={c.all_orders}>
      <table className={c.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Coins</th>
            <th>Date</th>
            <th>Location</th>
            <th>Edit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.length ? (
            events.map((event) => (
              <tr key={event.id}>
                <td>
                  {editEventId === event.id ? (
                    <input
                      type="text"
                      placeholder={event.name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  ) : (
                    event.name
                  )}
                </td>
                <td>
                  {editEventId === event.id ? (
                    <input
                      type="number"
                      placeholder={event.coins}
                      onChange={(e) => setCoins(e.target.value)}
                    />
                  ) : (
                    event.coins
                  )}
                </td>
                <td>
                  {editEventId === event.id ? (
                    <input
                      type="datetime-local"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  ) : (
                    event.date
                  )}
                </td>
                <td>
                  {editEventId === event.id ? (
                    <input
                      type="text"
                      placeholder={event.location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  ) : (
                    event.location
                  )}
                </td>
                <td>
                  {editEventId === event.id ? (
                    <button
                      onClick={(e) => changeStatus(e, event.id)}
                      className={c.okButton}
                    >
                      <FiCheck />
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditEventId(event.id)}
                      className={c.edit_btn}
                    >
                      <FiEdit3 />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className={c.delete_btn}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Events</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatchEvent;
