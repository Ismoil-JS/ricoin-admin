import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FiCheck, FiTrash2 } from 'react-icons/fi';
import c from './Product.module.scss';
import useCloudinaryUpload from '../../../../components/UploadWidget.js';

const PatchProduct = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [productId, setProductId] = useState(null);

  const { openWidget } = useCloudinaryUpload((imageUrl) => {
    setImage(imageUrl);
  });

  const headers = useMemo(() => {
    return { 'x-auth-token': localStorage.getItem('token') };
  }, []);

  useEffect(() => {
    axios
      .get('https://api.ricoin.uz/api/products', { headers })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error.message);
      });
  }, [headers]);

  const changeStatus = (e) => {
    e.preventDefault();

    axios
      .patch(
        `https://api.ricoin.uz/api/products/${productId}`,
        {
          name,
          price,
          description,
          image,
        },
        { headers }
      )
      .then((response) => {
        if (response && response.status === 204) {
          alert('Product status changed!');
          // Update local state instead of reloading the entire page
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === productId
                ? { ...product, name, price, description, image }
                : product
            )
          );
        } else {
          alert('An error occurred. Please try again later.');
        }
      })
      .catch(() => {
        alert('An error occurred. Please try again later.');
      });
  };

  function deleteProduct(id) {
    console.log(id);
    axios
      .delete(`https://api.ricoin.uz/api/products/${id}`, { headers })
      .then((e) => {
        console.log(e.response);
        alert('Product has been deleted!');
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      })
      .catch(() => {
        alert('An error occurred on delete.');
      });
  };

  return (
    <div className={c.all_orders}>
      {products.length ? (
        products.map((product) => (
          <form onSubmit={changeStatus} className={c.single_order} key={product.id}>
            <div className={c.delete_btn} onClick={() => deleteProduct(product.id)}>
              <FiTrash2 />
            </div>
            <img src={product.image} alt="" style={{ height: '80px' }} />
            <p>
              <b>Name:</b> {product.name}
            </p>
            <p>
              <b>Price:</b> {product.price} coins
            </p>
            <p>
              <b>Description:</b> {product.description}
            </p>
            <i>You can change the properties here...</i>
            <input type="text" placeholder="Product Name..." onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Product Price..." onChange={(e) => setPrice(e.target.value)} />
            <input type="text" placeholder="Product Description..." onChange={(e) => setDescription(e.target.value)} />
            <input hidden type="text" placeholder="Product Image..." value={image} readOnly />
            <button className={c.imageUpload} type="button" onClick={openWidget}>
              Select Image
            </button>
            <button className={c.okButton} onClick={() => setProductId(product.id)}>
              <FiCheck /> Done
            </button>
          </form>
        ))
      ) : (
        <p>No products</p>
      )}
    </div>
  );
};

export default PatchProduct;
