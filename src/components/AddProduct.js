import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AddProduct.css";
import api from "../api";

const AddProduct = ({ setProducts }) => {
  const [product_name, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");

  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !product_name ||
      !price ||
      !brand ||
      !category ||
      !description ||
      !rating ||
      !stock
    ) {
      alert("Please fill in all required fields!");
      return;
    }

    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5!");
      return;
    }

    if (price <= 0) {
      alert("Price must be greater than 0!");
      return;
    }

    const formData = new FormData();
      formData.append("product_name", product_name)
      formData.append("price", price)
      formData.append("brand", brand)
      formData.append("category",category)
      formData.append("description",description)
      formData.append("stock",stock)
      formData.append("image",image)

    api
      .post(`/api/product`, formData, {
        headers: {
          "Content-Type": "multipart/formData",
        },
      })
      .then((res) => {
        console.log("✅ Product Added:", res.data);

        setProducts((prev) => [...prev, res.data.data]);

        alert("✅ Product added successfully!");
        navigate("/");
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  return (
    <div className="add-product-page">
      <div className="add-product-container">
        <h1>Add New Product</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <div className="image-upload">
            <label htmlFor="imageUpload" className="upload-label">
              Upload Product Image
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              required
              
            />
            {
            preview && 
            <img src={preview} alt="Preview" className="preview-image" />}
            
          </div>

          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />

          <select
            className="dropdown-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="fragrances">Fragrances</option>
            <option value="beauty">Beauty</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
            <option value="kitchen-accessories">Kitchen Accessories</option>
          </select>

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Stock quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />

          <button type="submit">Add Product</button>
        </form>

        <Link to="/">
          <button className="back-btn">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default AddProduct;
