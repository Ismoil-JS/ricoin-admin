import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FiCheck, FiEdit3, FiTrash2 } from 'react-icons/fi';
import c from './Product.module.scss';
import useCloudinaryUpload from '../../../../components/UploadWidget.js';

const PatchProduct = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(1);
  const [editProductId, setEditProductId] = useState(null); // Track the currently edited product ID

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
      .catch(() => {
      });
  }, [headers]);

  const changeStatus = (e, productId) => {
    e.preventDefault();

    axios
      .patch(
        `https://api.ricoin.uz/api/products/${productId}`,
        {
          name,
          price,
          description,
          image,
          amount,
        },
        { headers }
      )
      .then((response) => {
        if (response && response.status === 204) {
          alert('Product status changed!');
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === productId
                ? {
                    ...product,
                    name: name ? name : product.name,
                    price: price ? price : product.price,
                    description: description ? description : product.description,
                    image: image ? image : product.image,
                    amount: amount ? amount : product.amount,
                  }
                : product
            )
          );
        } else {
          alert('An error occurred. Please try again later.');
        }
      })
      .catch(() => {
        alert('An error occurred. Please try again later.');
      })
      .finally(() => {
        setEditProductId(null); // Reset the currently edited product ID
      });
  };

  function deleteProduct(id) {
    axios
      .delete(`https://api.ricoin.uz/api/products/${id}`, { headers })
      .then(() => {
        alert('Product has been deleted!');
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      })
      .catch(() => {
        alert('An error occurred on delete.');
      });
  }

  return (
    <div className={c.all_orders}>
      {products.length ? (
        products.map((product) => (
          <form onSubmit={(e) => changeStatus(e, product.id)} className={c.single_order} key={product.id}>
            <div className={c.delete_btn} onClick={() => deleteProduct(product.id)}>
              <FiTrash2 />
            </div>
            <img src={product.image} alt="" style={{ height: '100px', maxWidth: '200px' }} />
            <p>
              <b>Name:</b>{' '}
              {editProductId === product.id ? (
                <input type="text" placeholder={product.name} value={name} onChange={(e) => setName(e.target.value)} />
              ) : (
                <span>{product.name}</span>
              )}
            </p>
            <p>
              <b>Price:</b>{' '}
              {editProductId === product.id ? (
                <input type="number" placeholder="Product Price..." value={price} onChange={(e) => setPrice(e.target.value)} />
              ) : (
                <span>{product.price + ' coins'}</span>
              )}
            </p>
            <p>
              <b>Amount:</b>{' '}
              {editProductId === product.id ? (
                <input type="number" placeholder={product.amount} value={amount} onChange={(e) => setAmount(e.target.value)} />
              ) : (
                <span>{product.amount}</span>
              )}
            </p>
            <p>
              <b>Description:</b>{' '}
              {editProductId === product.id ? (
                <input type="text" placeholder={product.description} value={description} onChange={(e) => setDescription(e.target.value)} />
              ) : (
                <span>{product.description}</span>
              )}
            </p>
            <input hidden type="text" placeholder="Product Image..." value={image} readOnly />
            <button className={c.imageUpload} type="button" onClick={openWidget}>
              Select Image
            </button>
            {editProductId === product.id ? (
              <button className={c.okButton} type="submit">
                <FiCheck />
              </button>
            ) : ( <></>
            )}
              <div className={c.edit_btn} onClick={() => setEditProductId(product.id)}>
                <FiEdit3 />
              </div>
          </form>
        ))
      ) : (
        <p>No products</p>
      )}
    </div>
  );
};

export default PatchProduct;
