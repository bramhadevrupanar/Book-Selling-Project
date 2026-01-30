import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";
import { Link } from "react-router-dom";

function Order() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      const res = await axios.get("http://localhost:5000/cart");
      setCart(res.data);
      calculateTotals(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  }

  function calculateTotals(cartItems) {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + Number(item.books_count || 0),
      0
    );
    const disc = Math.floor(totalPrice * 0.5); 
    setTotal(totalPrice - disc);
    setDiscount(disc);
  }

  async function handleRemove(id) {
    try {
      await axios.delete(`http://localhost:5000/cart/${id}`);

      const updatedCart = cart.filter(item => item.id !== id);
      setCart(updatedCart);
      calculateTotals(updatedCart);

      window.dispatchEvent(new Event("cartUpdatedRemove"));
    } catch (err) {
      console.error(err);
    }
  }

  async function handlePlaceOrder() {
    if (cart.length === 0) return alert("Cart is empty!");
    alert(`Order placed successfully! Total: ₹${total}`);
    for (let item of cart) {
      await axios.delete(`http://localhost:5000/cart/${item.id}`);
      window.dispatchEvent(new Event("cartUpdatedRemove"));
    }
    setCart([]);
    setTotal(0);
    setDiscount(0);
  }

  return (
    <div className="order-page">
      <Link to='/morebook' className="back-btn">Back</Link>
      <h1>My Cart</h1>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.original_title} />
              <div className="item-details">
                <h3>{item.original_title}</h3>
                <p>⭐ {item.average_rating} ({item.ratings_count})</p>
                <p>Price: ₹{item.books_count}</p>
                <p>Category: {item.category}</p>
                <div className="item-btns">
                  <button onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="price-details">
          <h2>Price Details</h2>
          <div className="price-row">
            <span>Price</span>
            <span>₹{cart.reduce((acc, i) => acc + Number(i.books_count || 0), 0)}</span>
          </div>
          <div className="price-row"><span>Discount</span><span>- ₹{discount}</span></div>
          <div className="price-row total"><span>Total Amount</span><span>₹{total}</span></div>
          <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
          <p className="save-msg">You'll save ₹{discount} on this order!</p>
        </div>
      )}
    </div>
  );
}

export default Order;
