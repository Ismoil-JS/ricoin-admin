import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { QRCode } from "react-qr-code"
import c from "./Event.module.scss"

const CreateEventQRCode = () => {
  const [events, setEvents] = useState([]); // [1]
  const [eventId, setEventId] = useState([]); // [1]
  const [qrId, setQrId] = useState('')

  // Retrieve the token from local storage
  const token = localStorage.getItem('token');

  // Define the headers with the Authorization header containing the token using useMemo
  const headers = useMemo(() => {
    return {
      Authorization: token, // Correctly formatted Authorization header
    };
  }, [token]);

  useEffect(() => {
    axios
      .get('http://localhost:9000/api/events', { headers })
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [headers]);


  function generateQR(e){
    e.preventDefault();
    axios
      .get(`http://localhost:9000/api/events/${eventId}`, 
      { headers })
      .then((response) => setQrId(response.data[0].id))
      .catch(err => console.log(err))
  }

  return <div className={c.all_orders}>
    <div className={c.order_content}>
      {events.length ? events.map((event) => {
        return <form onSubmit={generateQR} className={c.single_order} key={event.id}>
        <p><b>Name:</b> {event.name}</p>
        <p><b>Date:</b> {event.date}</p>
        <button onClick={() => setEventId(event.id)}>QR-code</button>  
      </form>;
    }) : <p>No Events</p>}
    </div>
      <div className={c.qrCode}>
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 205, width: "100%"}}>
          <h3>Enter</h3>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%", border: "2px solid black", padding: "15px" }}
            value={"start" + qrId}
            viewBox={`0 0 256 256`}
          />
          <button>Download</button>
        </div>  
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 205, width: "100%" }}>
          <h3>End</h3>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%", border: "2px solid black", padding: "15px" }}
            value={"end" + qrId}
            viewBox={`0 0 256 256`}
          />
          <button>Download</button>
        </div> 
      </div>
  </div>;
}

export default CreateEventQRCode;
