import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewProduct.css";
import api from "../api";
import { useAuth } from "../context/AuthContext"; 

const ViewProduct = ({ products, setProducts }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage] = useState("");
  const navigate = useNavigate();
  const { role, token } = useAuth();

  useEffect(() => {
    api
      .get(`/api/product/${id}`)
      .then((res) => {
        const data = res.data.data; // ✅ Correct path
        setProduct(data);
      })
      .catch((err) => console.error("Error loading product:", err));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      api
        .put(`/api/product/restore/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          console.log(handleDelete);
          navigate("/");
          // alert("Product deleted successfully!");
        })
        .catch((err) => console.error("Delete failed:", err));
    }
  };

  if (!product) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>
    );
  }

  return (
    <div className="product-details-container">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="product-details-card">
        <div className="image-section">
          <img
            className="main-image"
            src={
              selectedImage
                ? `${process.env.REACT_APP_BACKEND_URL}/${selectedImage}`
                : `${process.env.REACT_APP_BACKEND_URL}/${product.image}`
            }
            alt={product.product_name}
          />
        </div>

        <div className="info-section">
          <h1>{product.product_name}</h1>
          <p className="brand">Brand: {product.brand}</p>
          <p className="category">Category: {product.category}</p>
          <p className="desc">{product.description}</p>
          <h2 className="price">${product.price}</h2>
          <p>Rating: ⭐ {product.rating}</p>
          <p>Stock: {product.stock}</p>
          {role === "admin" && (
            <>
              <button
                className="edit-btn"
                onClick={() => navigate(`/product/${id}/edit`)}
              >
                ✏️ Edit
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                🗑️ Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
