import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "../context/CartContext.jsx";

function Checkout() {
  const { cart, totalPrice, dispatch } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    dispatch({
      type: "CLEAR_CART",
    });
    setSubmitted(true);
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>

      {submitted && (
        <p className="success" role="status">
          Order placed successfully. Thank you for your purchase!
        </p>
      )}

      {cart.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />

                <div>
                  <h3>{item.title}</h3>

                  <p>${item.price}</p>

                  <div>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: {
                            id: item.id,
                            change: -1,
                          },
                        })
                      }
                    >
                      -
                    </button>

                    <span> {item.quantity} </span>

                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: {
                            id: item.id,
                            change: 1,
                          },
                        })
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item.id,
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2>Total: ${totalPrice.toFixed(2)}</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName", {
                required: "Full Name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              })}
            />

            {errors.fullName && (
              <p className="error">{errors.fullName.message}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />

            {errors.email && (
              <p className="error">{errors.email.message}</p>
            )}

            <textarea
              placeholder="Shipping Address"
              {...register("address", {
                required: "Shipping address is required",
              })}
            />

            {errors.address && (
              <p className="error">{errors.address.message}</p>
            )}

            <button type="submit">Place Order</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Checkout;