import { useNavigate } from "react-router-dom";
import { CartItem } from "../types/CartItem";
import { useCart } from "../context/CartContext";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  // Calculate the grand total (sum of all subtotals)
  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item: CartItem) => {
            // Subtotal for this item
            const itemSubtotal = item.price * item.quantity;

            return (
              <li key={item.bookID} style={{ marginBottom: "1rem" }}>
                <p><strong>{item.title}</strong></p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ${itemSubtotal.toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.bookID)}>
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <h3>Total: ${total.toFixed(2)}</h3>

      <button onClick={() => navigate("/")}>Back to Browsing</button>
    </div>
  );
}

export default CartPage;
