import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { QRCode } from "react-qr-code"
import html2canvas from 'html2canvas';
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
      .get('https://api.ricoin.uz/api/events', { headers })
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
      .get(`https://api.ricoin.uz/api/events/${eventId}`, 
      { headers })
      .then((response) => setQrId(response.data[0].id))
      .catch()
  }

  const downloadQRCodeAsJPGStart = () => {
    if (qrId) {
      const qrCodeContainer = document.getElementById('qrCodeContainerStart'); // Specify the container's ID
  
      html2canvas(qrCodeContainer).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        const a = document.createElement('a');
        a.href = imgData;
        a.download = `qr_code_end_${qrId}.jpg`;
        a.click();
      });
    }
  };

  const downloadQRCodeAsJPGEnd = () => {
    if (qrId) {
      const qrCodeContainer = document.getElementById('qrCodeContainerEnd'); // Specify the container's ID
  
      html2canvas(qrCodeContainer).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        const a = document.createElement('a');
        a.href = imgData;
        a.download = `qr_code_end_${qrId}.jpg`;
        a.click();
      });
    }
  };

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
        <div id="qrCodeContainerStart" style={{ height: "auto", margin: "0 auto", maxWidth: 225, width: "100%"}}>
          <h3>Enter</h3>
          <QRCode
            size={256}
            style={{ height: "auto", width: "90%" }}
            value={"start" + qrId}
            viewBox={`0 0 206 206`}
          />
          <button onClick={downloadQRCodeAsJPGStart}>Download</button>
        </div>  
        <div id="qrCodeContainerEnd" style={{ height: "auto", margin: "0 auto", maxWidth: 225, width: "100%"}}>
          <h3>End</h3>
          <QRCode
            size={256}
            style={{ height: "auto", width: "90%" }}
            value={"end" + qrId}
            viewBox={`0 0 206 206`}
          />
          <button onClick={downloadQRCodeAsJPGEnd}>Download</button>
        </div> 
      </div>
  </div>;
}

export default CreateEventQRCode;
