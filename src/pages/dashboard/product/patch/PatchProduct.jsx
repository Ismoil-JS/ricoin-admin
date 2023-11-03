import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { FiCheck } from 'react-icons/fi';
import c from "./Product.module.scss"

const PatchProduct = () => {
  const [products, setProducts] = useState([]); // [1]
  const [productId, setProductId] = useState([]); // [1]
  const [name, setName] = useState(); // [1]
  const [price, setPrice] = useState(); // [1]
  const [image, setImage] = useState(); // [1]

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
      .get('http://localhost:9000/api/products', { headers })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [headers]);


  function changeStatus(e){
    e.preventDefault();
    axios
      .patch(`http://localhost:9000/api/products/${productId}`, 
      {
        name,
        price,
        image
      },
      { headers })
      .then(() => 
        {
          alert("Product status changed!")
          window.location.reload()
        }
      )
    .catch(err => console.log(err))
  }

  return <div className={c.all_orders}>
    {products.length ? products.map((product) => {
      return  <form onSubmit={changeStatus} className={c.single_order} key={product.id}>
                <img src={product.image} alt="" style={{ width: "200px" }} />
                <p><b>Name:</b> {product.name}</p>
                <p><b>Price:</b> {product.price} coins</p>
                <i>You can change the properties here...</i>
                <input  type="text" placeholder="Product Name..." onChange={(e) => setName(e.target.value)} />
                <input  type="number" placeholder="Product Price..." onChange={(e) => setPrice(e.target.value)} />
                <input  type="file" placeholder="Product Image..." onChange={uploadImage} />
                <button onClick={(e) => setProductId(product.id)}><FiCheck /> Done</button>
              </form>;
    }) : <p>No orders</p>}
  </div>;
}

export default PatchProduct
