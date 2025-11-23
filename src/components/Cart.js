import React, { useEffect, useState } from "react";
import "./Cart.css";
import api from "../api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/api/cart/list");
        setCartItems(res.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);
  // ✅ Remove Item
  const handleRemove = async (id) => {
    try {
      await api.delete(`/api/cart/remove/${id}`);
      const res = await api.get("/api/cart/list");
      setCartItems(res.data);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleQuantityChange = async (id, newQty) => {
    try {
      await api.put(`/api/cart/update/${id}`, { quantity: newQty });
      const res = await api.get("/api/cart/list");
      setCartItems(res.data);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const handleClearCart = async () => {
    try {
      await api.delete("/api/cart/clear");
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-layout">
          {/* LEFT SIDE — Cart Items */}
          <div className="cart-items-section">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item-card">
                <img
                  src={item.product_id?.image}
                  alt={item.product_id?.product_name}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <h3>{item.product_id?.product_name}</h3>
                  <p>Brand: {item.product_id?.brand}</p>
                  <p>Price: ${item.price}</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="cart-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE — Order Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Subtotal</span>
              <span>
                $
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <div className="summary-line">
              <span>Delivery</span>
              <span>$12.99</span>
            </div>
            <div className="summary-line">
              <span>Discount</span>
              <span>-</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>
                $
                {(
                  cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  ) + 12.99
                ).toFixed(2)}
              </span>
            </div>
            <button className="checkout-btn">Checkout</button>

            <button className="clear-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
