import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import c from './Product.module.scss';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

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
      .post('http://localhost:9000/api/products', {
        name,
        price,
        image,
      }, {
        headers, // Include headers in the request
      })
      .then((response) => 
      {console.log(response)
        if(response.status === 200) {
        alert("Product created")
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
        <input required type="text" placeholder="Product Name..." onChange={(e) => setName(e.target.value)} />
        <input required type="number" placeholder="Product Price..." onChange={(e) => setPrice(e.target.value)} />
        <input required type="file" placeholder="Product Image..." onChange={uploadImage} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateProduct
