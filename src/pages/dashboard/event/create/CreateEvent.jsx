import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import c from './Event.module.scss';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [coins, setCoins] = useState('');
  const [location, setLocation] = useState('');

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

  function createProduct(e) {
    e.preventDefault();

    const headers = { Authorization: localStorage.getItem('token') };

    axios
      .post('http://localhost:9000/api/events', {
        name,
        coins,
        date,
        location,
        image,
      }, {
        headers, // Include headers in the request
      })
      .then((response) => 
      {console.log(response)
        if(response.status === 204) {
        alert("Event created")
        window.location.reload();
      }}
      )
      .catch((err) => {
        if(err.response.status === 401) {
          alert("You are not an admin")
          window.location.reload();
        }
      });
  }

  return (
    <div>
      <form onSubmit={createProduct} className={c.product__form}>
        <input required type="text" placeholder="Event Name..." onChange={(e) => setName(e.target.value)} />
        <input required type="number" placeholder="Event Coins..." onChange={(e) => setCoins(e.target.value)} />
        <input required type="text" placeholder="Event Date..." onChange={(e) => setDate(e.target.value)} />
        <input required type="text" placeholder="Event Location..." onChange={(e) => setLocation(e.target.value)} />
        <input required type="file" placeholder="Event Image..." onChange={uploadImage} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateEvent;
