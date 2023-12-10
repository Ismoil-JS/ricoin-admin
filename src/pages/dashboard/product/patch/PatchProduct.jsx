import React, { useState } from 'react';
import axios from 'axios';
import { FiCheck } from 'react-icons/fi';
import c from "./Product.module.scss";
import useCloudinaryUpload from '../../../../components/UploadWidget.js'; // Adjust the path accordingly



const PatchProduct = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [describtion, setDescribtion] = useState('');

  const { openWidget } = useCloudinaryUpload((imageUrl) => {
    // Handle the imageUrl, for example, set it in the state
    setImage(imageUrl);
  });

  const headers = { 'x-auth-token': localStorage.getItem('token') };

  axios
    .get('https://api.ricoin.uz/api/products', { headers })
    .then((response) => {
        setProducts(response.data);
    }).catch((err) => {
      console.log(err);
    });

  const changeStatus = (e, productId) => {
    e.preventDefault();

    axios
      .patch(`https://api.ricoin.uz/api/products/${productId}`,
        {
          name,
          price,
          description: describtion,
          image
        },
        { headers }
      )
      .then((response) => {
        if (response && response.status === 200) {
          alert("Product status changed!");
          window.location.reload();
        } else {
          alert("An error occurred. Please try again later.");
        }
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div className={c.all_orders}>
      {products.length ? products.map((product) => (
        <form onSubmit={(e) => changeStatus(e, product.id)} className={c.single_order} key={product.id}>
          <img src={product.image} alt="" style={{ width: "200px", aspectRatio: "2/1" }} />
          <p><b>Name:</b> {product.name}</p>
          <p><b>Price:</b> {product.price} coins</p>
          <p><b>Describtion:</b> {product.description}</p>
          <i>You can change the properties here...</i>
          <input type="text" placeholder="Product Name..." onChange={(e) => setName(e.target.value)} />
          <input type="number" placeholder="Product Price..." onChange={(e) => setPrice(e.target.value)} />
          <input type="text" placeholder="Product Description..." onChange={(e) => setDescribtion(e.target.value)} />
          <input hidden type="text" placeholder="Product Image..." value={image} readOnly />
          <button className={c.imageUpload} type="button" onClick={openWidget}>Select Image</button>
          <button className={c.okButton} type="submit"><FiCheck /> Done</button>
        </form>
      )) : <p>No orders</p>}
    </div>
  );
};

export default PatchProduct;
