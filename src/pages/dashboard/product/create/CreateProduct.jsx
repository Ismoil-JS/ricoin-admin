import React, { useState } from 'react';
import axios from 'axios';
import c from './Product.module.scss';
import useCloudinaryUpload from '../../../../components/UploadWidget.js'; // Adjust the path accordingly

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const { openWidget } = useCloudinaryUpload((imageUrl) => {
    // Handle the imageUrl, for example, set it in the state
    setImage(imageUrl);
  });

  function createProduct(e) {
    e.preventDefault();

    const headers = { 'x-auth-token': localStorage.getItem('token') };

    axios
      .post('https://api.ricoin.uz/api/products', {
        name,
        price,
        description,
        image,
      }, {
        headers, // Include headers in the request
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Product created");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          alert("You are not an admin");
          window.location.reload();
        }
      });
  }

  return (
    <div>
      <form onSubmit={createProduct} className={c.product__form}>
        <input required type="text" placeholder="Product Name..." onChange={(e) => setName(e.target.value)} />
        <input required type="number" placeholder="Product Price..." onChange={(e) => setPrice(e.target.value)} />
        <input required type="text" placeholder="Product Description..." onChange={(e) => setDescription(e.target.value)} />
        <input hidden type="text" placeholder="Product Image..." value={image} readOnly />
        <button type="button" onClick={openWidget}>Select Image</button>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CreateProduct;
