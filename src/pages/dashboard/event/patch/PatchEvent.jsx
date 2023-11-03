import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { FiCheck } from 'react-icons/fi';
import c from "./Event.module.scss"

const PatchEvent = () => {
  const [events, setEvents] = useState([]); // [1]
  const [eventId, setEventId] = useState([]); // [1]
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [coins, setCoins] = useState('');
  const [location, setLocation] = useState('');

  // Retrieve the token from local storage
  const token = localStorage.getItem('token');

  // Define the headers with the Authorization header containing the token using useMemo
  const headers = useMemo(() => {
    return {
      Authorization: token, // Correctly formatted Authorization header
    };
  }, [token]);

  const uploadImage = async (e) => {
    const files = e.target.files[0];
    const base64 = await convertBase64(files);
    setImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  }

  useEffect(() => {
    axios
      .get('http://localhost:9000/api/events', { headers })
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [headers]);


  function changeStatus(e){
    e.preventDefault();
    axios
      .patch(`http://localhost:9000/api/events/${eventId}`, 
      {
        name,
        coins,
        date,
        location,
        image
      },
      { headers })
      .then(() => 
        {
          alert("Event status changed!")
          window.location.reload()
        }
      )
    .catch(err => console.log(err))
  }

  return <div className={c.all_orders}>
    {events.length ? events.map((event) => {
      return  <form onSubmit={changeStatus} className={c.single_order} key={event.id}>
                {event.image.length ? <img src={event.image} alt="" style={{ width: "200px" }} /> :
                <div style={{ width: "200px", height: "125px", display: "flex", alignItems: "center", border: "1px solid black", padding: "15px"}}>No image</div>}
                <p><b>Name:</b> {event.name}</p>
                <p><b>Coins:</b> {event.coins} coins</p>
                <p><b>Date:</b> {event.date} </p>
                <p><b>Location:</b> {event.location} </p>
                <i><b>You can change the properties here...</b></i>
                <input  type="text" placeholder="Event Name..." onChange={(e) => setName(e.target.value)} />
                <input  type="number" placeholder="Event Coins..." onChange={(e) => setCoins(e.target.value)} />
                <input  type="text" placeholder="Event Date..." onChange={(e) => setDate(e.target.value)} />
                <input  type="text" placeholder="Event Location..." onChange={(e) => setLocation(e.target.value)} />
                <input  type="file" placeholder="Event Image..." onChange={uploadImage} />
                <button onClick={() => setEventId(event.id)}><FiCheck /> Done</button>
              </form>;
    }) : <p>No Events</p>}
  </div>;
}

export default PatchEvent 
