import { useCallback, useMemo, useState } from "react";
import ProductCard from "../compnents/ProductCard.jsx";
import useFetch from "../hooks/UseFetch.js";
import useDebounce from "../hooks/useDebounce.js";
import { useCart } from "../context/CartContext.jsx";

function Home() {
  const { data, loading, error } = useFetch(
    "https://fakestoreapi.com/products"
  );

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { dispatch } = useCart();

  const addToCart = useCallback(
    (product) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: product,
      });
    },
    [dispatch]
  );

  const filteredProducts = useMemo(() => {
    if (!data) return [];

    return data.filter((product) =>
      product.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );
  }, [data, debouncedSearch]);

  if (loading) {
    return <h2 className="center">Loading...</h2>;
  }

  if (error) {
    return <h2 className="center">Error: {error}</h2>;
  }

  return (
    <div className="container">
      <h1>TechStore Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <h2>No products found</h2>
        )}
      </div>
    </div>
  );
}

export default Home;