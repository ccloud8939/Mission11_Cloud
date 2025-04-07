import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  // Summation of all quantities
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Summation of price * quantity for all items
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        fontSize: '16px',
      }}
      onClick={() => navigate('/cartPage')}
    >
      🛒 
      <span style={{ marginLeft: '5px' }}>
        {totalQuantity} item{totalQuantity !== 1 ? 's' : ''} | ${totalAmount.toFixed(2)}
      </span>
    </div>
  );
};

export default CartSummary;

