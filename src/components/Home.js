import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import api from "../api";

// ✅ Images
import "../images/Save-Money-On-Groceries_UBC-Food-Services.jpg";
import "../images/pexels-rethaferguson-3059609.jpg";
import "../images/beauty-photography-trends-2024-FI-683x1024.jpeg";
import "../images/hunyhuny-premium-rocking-glider-nursing-armchair-ottoman-cum-footstool-set-in-beige-colour.jpg";
import "../images/Screenshot 2025-10-27 100250.png";

function Home(props) {   
  const { products, setProducts } = props;
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [, setLoading] = useState(false);
  const role = localStorage.getItem("role");
  

  const limit = 3;
  const totalPages = Math.ceil(totalProducts / limit); // ✅ calculated after totalProducts

  // ✅ Categories
  const categories = [
    {
      name: "All",
      image: require("../images/Screenshot 2025-10-27 100250.png"),
    },
    {
      name: "fragrances",
      image: require("../images/pexels-rethaferguson-3059609.jpg"),
    },
    {
      name: "beauty",
      image: require("../images/beauty-photography-trends-2024-FI-683x1024.jpeg"),
    },
    {
      name: "furniture",
      image: require("../images/hunyhuny-premium-rocking-glider-nursing-armchair-ottoman-cum-footstool-set-in-beige-colour.jpg"),
    },
    {
      name: "groceries",
      image: require("../images/Save-Money-On-Groceries_UBC-Food-Services.jpg"),
    },
    {
      name: "kitchen-accessories",
      image: require("../images/Screenshot 2025-10-27 100250.png"),
    },
  ];

  // ✅ Fetch products
  useEffect(() => {
    setLoading(true);

    const endpoint = `/api/products?limit=${limit}&skip=${
      page * limit
    }&category=${selectedCategory}${
      searchTerm ? `&q=${encodeURIComponent(searchTerm)}` : ""
    }`;

    api
      .get(endpoint)
      .then((res) => {
        const { data: apiProducts = [], total = apiProducts.length } = res.data;
        setTotalProducts(total);
        setProducts(apiProducts);

        const finalProducts =
          searchTerm.trim() === "" ? [...apiProducts] : apiProducts;

        setProducts(finalProducts); // ✅ this updates the displayed list
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, [selectedCategory, searchTerm, page, setProducts]);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const handleAddToCart = async (productId) => {
    try {
      await api.post("/api/cart/add", { product_id: productId, quantity: 1 });
      alert("Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Add Your Products</h1>
          <p>List your products!</p>
          {role === "admin" && (
          <button className="add-btn" onClick={() => navigate("/add-product")}>
            ➕ Add Product
          </button>
          )}
        </div>

        <div className="home-header">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
      </section>

      <section className="category-cards">
        {categories.map((item) => (
          <div
            key={item.name}
            className={`category-card ${
              selectedCategory === item.name ? "active" : ""
            }`}
            onClick={() => {
              setSelectedCategory(item.name);
              setSearchTerm("");
              setPage(0);
            }}
          >
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
          </div>
        ))}
      </section>

      <div className="home-header">
        <h1>
          {selectedCategory === "All"
            ? "All Products"
            : `${selectedCategory} Products`}
        </h1>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div
            key={product._id || product.product_name}
            className="product-card"
          >
            <img 
            src={`${process.env.REACT_APP_BACKEND_URL}/${product.image}`} 
            alt={product.product_name} 
            />
            <div className="product-info">
              <h3>{product.product_name}</h3>
              <p>{product.description?.slice(0, 50)}...</p>
              <p className="price">${product.price}</p>
              <button
                className="view-btn"
                key={product._id || product.product._id}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                View Details
              </button>

              {role === "customer" && (
              <button
                className="cart-btn"
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            ◀ Prev
          </button>

          {(() => {
            const pagesPerGroup = 8;
            const currentGroup = Math.floor(page / pagesPerGroup);
            const startPage = currentGroup * pagesPerGroup;
            const endPage = Math.min(startPage + pagesPerGroup, totalPages);

            const pageNumbers = [];
            for (let i = startPage; i < endPage; i++) {
              pageNumbers.push(
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={page === i ? "active" : ""}
                >
                  {i + 1}
                </button>
              );
            }

            return pageNumbers;
          })()}

          <button
            onClick={() =>
              setPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))
            }
            disabled={page + 1 >= totalPages}
          >
            Next ▶
          </button>
        </div>
      )}
    </>
  );
}

export default Home;
