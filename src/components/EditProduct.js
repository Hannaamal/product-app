import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./EditProduct.css";
import api from "../api";

const EditProduct = ({ setProducts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState({
    product_name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });
  const [newImage, setNewImage] = useState(null); // NEW image file
  const [preview, setPreview] = useState(null); // PREVIEW image
  const [errors, setErrors] = useState({});

  // ✅ Load product data
  useEffect(() => {
    api
      .get(`/api/product/${id}`)
      .then((res) => {
        setProduct(res.data.data);
        setPreview(res.data.data.image); // show existing image
      })
      // show existing image
      .catch((err) => console.error("Error loading product:", err));
  }, [id, location.state?.updated]);

  //  Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!product.product_name?.trim())
      newErrors.product_name = "Product name is required.";
    if (!product.brand?.trim()) newErrors.brand = "Brand is required.";
    if (!product.category?.trim()) newErrors.category = "Category is required.";
    if (!product.description?.trim())
      newErrors.description = "Description is required.";
    if (!product.price || product.price <= 0)
      newErrors.price = "Enter a valid price.";
    if (!product.stock || product.stock < 0)
      newErrors.stock = "Stock must be 0 or more.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("brand", product.brand);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    if (newImage) {
      formData.append("image", newImage);
    }
    api
      .put(`/api/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("Updated product (mock):", res.data);

        setProducts((prev) =>
          prev.map((p) =>
            String(p.id) === String(id) ? { ...p, ...product } : p
          )
        );

        alert("Product updated successfully!");
        navigate(`/product/${id}`, { replace: true, state: { updated: true } });
      })
      .catch((err) => {
        console.error("Update failed:", err);

        setProducts((prev) =>
          prev.map((p) =>
            String(p.id) === String(id) ? { ...p, ...product } : p
          )
        );

        alert("Product updated locally (mock API doesn’t persist).");
        navigate(`/product/${id}`, { replace: true });
      });
  };

  return (
    <div className="edit-product-page">
      <div className="edit-product-container">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
        <h2>Edit Product</h2>

        <form className="edit-form" onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
          />
          {errors.product_name && (
            <p className="error">{errors.product_name}</p>
          )}

          <label>Brand</label>
          <input name="brand" value={product.brand} onChange={handleChange} />
          {errors.brand && <p className="error">{errors.brand}</p>}

          <label>Category</label>
          <input
            name="category"
            value={product.category}
            onChange={handleChange}
          />
          {errors.category && <p className="error">{errors.category}</p>}

          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}

          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
          {errors.price && <p className="error">{errors.price}</p>}

          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
          {errors.stock && <p className="error">{errors.stock}</p>}

          <label>Product Image</label>

          {/* Existing image (only when user has NOT selected a new file) */}
          {product.image && !newImage && (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/${product.image}`}
              alt="Current Product"
              className="edit-preview-img"
            />
          )}

          {/* File Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setNewImage(file);
                setPreview(URL.createObjectURL(file)); // preview new image only
              }
            }}
          />

          {/* Preview ONLY when new image selected */}
          {newImage && preview && (
            <img src={preview} alt="Preview" className="edit-preview-img" />
          )}

          <button type="submit" className="edit-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
