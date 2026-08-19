import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        TechStore
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/checkout">
          Cart 🛒 ({cartCount})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;