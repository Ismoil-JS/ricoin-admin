import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import c from "./Product.module.scss";
import useCloudinaryUpload from "../../../../components/UploadWidget.js";

const PatchProduct = () => {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    amount: 1,
  });

  const { openWidget } = useCloudinaryUpload((imageUrl) => {
    setProductForm((prev) => ({ ...prev, image: imageUrl }));
  });

  const headers = useMemo(
    () => ({
      "x-auth-token": localStorage.getItem("token"),
    }),
    []
  );

  useEffect(() => {
    axios
      .get("https://api.ricoin.uz/api/products", { headers })
      .then((response) => setProducts(response.data))
      .catch(() => alert("Failed to load products"));
  }, [headers]);

  const openEditModal = (product) => {
    setEditProductId(product.id);
    setProductForm({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      amount: product.amount,
    });
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setModalOpen(false);
    setEditProductId(null);
  };

  const updateProduct = (e) => {
    e.preventDefault();

    axios
      .patch(
        `https://api.ricoin.uz/api/products/${editProductId}`,
        productForm,
        { headers }
      )
      .then((response) => {
        if (response && response.status === 204) {
          alert("Product updated successfully");
          setProducts((prev) =>
            prev.map((product) =>
              product.id === editProductId
                ? { ...product, ...productForm }
                : product
            )
          );
          closeEditModal();
        }
      })
      .catch(() => alert("An error occurred. Please try again later."));
  };

  const deleteProduct = (id) => {
    axios
      .delete(`https://api.ricoin.uz/api/products/${id}`, { headers })
      .then(() => {
        alert("Product has been deleted!");
        setProducts((prev) => prev.filter((product) => product.id !== id));
      })
      .catch(() => alert("An error occurred on delete."));
  };

  return (
    <div className={c.all_orders}>
      <table className={c.product_table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Edits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    alt=""
                    style={{ height: "100px", maxWidth: "200px" }}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.amount}</td>
                <td>{product.description}</td>
                <td>
                  <button
                    onClick={() => openEditModal(product)}
                    style={{ backgroundColor: "yellow" }}
                  >
                    <FiEdit3 />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    style={{ backgroundColor: "red" }}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products</td>
            </tr>
          )}
        </tbody>
      </table>

      {modalOpen && (
        <div className={c.modal}>
          <form onSubmit={updateProduct}>
            <h2>Edit Product</h2>
            <input
              type="text"
              value={productForm.name}
              onChange={(e) =>
                setProductForm({ ...productForm, name: e.target.value })
              }
              placeholder="Name"
            />
            <input
              type="number"
              value={productForm.price}
              onChange={(e) =>
                setProductForm({ ...productForm, price: e.target.value })
              }
              placeholder="Price"
            />
            <input
              type="number"
              value={productForm.amount}
              onChange={(e) =>
                setProductForm({ ...productForm, amount: e.target.value })
              }
              placeholder="Amount"
            />
            <textarea
              value={productForm.description}
              onChange={(e) =>
                setProductForm({ ...productForm, description: e.target.value })
              }
              placeholder="Description"
            />
            <button type="button" onClick={openWidget}>
              Select Image
            </button>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={closeEditModal}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PatchProduct;
