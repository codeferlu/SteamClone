import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
              <p>{item.price}</p>
            </div>
          ))}
          <button className="btn btn-primary">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
