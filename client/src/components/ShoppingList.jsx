import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";

const ShoppingList = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  console.log(cartItems);
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const renderCartItems = () => {
    return cartItems.map((item) => (
      <div key={item.id}>
        <p>{item.name}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Price: ${item.price}</p>
        <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) =>
            handleUpdateQuantity(item.id, parseInt(e.target.value))
          }
        />
      </div>
    ));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {renderCartItems()}
          <p>Total Price: ${calculateTotalPrice()}</p>
          {/* Add checkout button and other features as needed */}
        </>
      )}
    </div>
  );
};

export default ShoppingList;
