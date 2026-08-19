import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./compnents/Navbar.jsx";
import Home from "./pages/Home.jsx";

const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
const Checkout = lazy(() => import("./pages/Checkout"));

function App() {
  return (
    <>
      <Navbar />

      <Suspense fallback={<h2 className="center">Loading Page...</h2>}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;