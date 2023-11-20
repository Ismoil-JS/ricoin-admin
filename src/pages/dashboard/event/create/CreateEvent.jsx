import React, { useState } from 'react';
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
  };

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

    const headers = { Authorization: localStorage.getItem('token') };

    axios
      .post('http://localhost:9000/api/events', {
        name,
        coins,
        date: formatDate(new Date(date)),
        location,
        image,
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
        if (err.response && err.response.status === 401) {
          alert("You are not an admin");
          window.location.reload();
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
        <input required type="file" placeholder="Event Image..." onChange={uploadImage} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateEvent;
