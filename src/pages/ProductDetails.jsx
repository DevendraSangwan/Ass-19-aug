import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch.js";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const { data, loading, error } = useFetch(
    `https://fakestoreapi.com/products/${id}`
  );

  const { dispatch } = useCart();

  if (loading) {
    return <h2 className="center">Loading...</h2>;
  }

  if (error) {
    return <h2 className="center">Error: {error}</h2>;
  }

  return (
    <div className="details">
      <img src={data.image} alt={data.title} />

      <div>
        <h1>{data.title}</h1>

        <p>{data.description}</p>

        <h2>${data.price}</h2>

        <p>Category: {data.category}</p>

        <button
          onClick={() =>
            dispatch({
              type: "ADD_TO_CART",
              payload: data,
            })
          }
        >
          Add to Cart
        </button>

        <br />
        <br />

        <Link to="/">← Back to Products</Link>
      </div>
    </div>
  );
}

export default ProductDetails;