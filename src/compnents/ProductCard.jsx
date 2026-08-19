import { memo } from "react";
import { Link } from "react-router-dom";

const ProductCard = memo(function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />

      <h3>{product.title}</h3>

      <p className="price">${product.price}</p>

      <div className="buttons">
        <Link to={`/product/${product.id}`}>
          <button>View Details</button>
        </Link>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
});

export default ProductCard;