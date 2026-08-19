import { useEffect, useState,Route } from "react";
function App() {
  const [products, setProducts] = useState([]);
  const[cart,setCart]=useState([]);
  const[count,setCount]=useState(0)
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

function addProduct(id){
  products.map((product)=>(
  setCart[product.id]
),setCount(count+1)
)
}


return (
    <div>
      <h1>Products</h1>
 <button>checkout {count} </button>
      {products.map((product) => (
        <div key={product.id}>
          <img  src={product.image} alt={product.title} width="200" />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <p>Rating:{product.rating.rate}</p>
          <p>Count:{product.rating.count}</p>
          <button onClick={addProduct}>Add</button>
        </div>
      ))}
    </div>
  );
}

export default App;