import React, { useEffect, useState } from "react";
import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";

const CartsPage = () => {
  const stripePromise = loadStripe(
    "pk_test_51Rc1gf2cxL7pRCWiBKPKM3cAR2SAnXNaOgcc6QVm6R0TEpePHam5N7DNaRqGFJMflJv9O95SJ2jAq6RdGYprLkte00iOLTVUiu"
  ); // Replace with your real publishable key

  const [cartProducts, setcartProducts] = useState([]);
  const [selectedProduct, setselectedProduct] = useState("");
  const [checkOutVisible, setcheckOutVisible] = useState(false);

  console.log("cartProducts: ", cartProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getCart");
        console.log(response.data);
    
        setcartProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      }
    };

    fetchProducts();
  }, []);

  const handleProceedToStripeCheckOutPage = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/create-stripe-checkout-session",
        {
          product,
        }
      );

      const { id: sessionId } = response.data;
      localStorage.setItem("productId", product._id);
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error("Stripe redirect error:", err.message);
    }
  };
  return (
    <div className="carts-page relative">
      <h2 className="font-bold text-3xl my-10">Cart List</h2>
      <div className="products-container flex gap-6">
        {cartProducts.length > 0 &&
          cartProducts.map((product) => (
            <div
              key={product.product._id}
              className="product-card border-2 border-gray-600 p-2"
            >
              <h3>{product.product.name}</h3>
              <p>{product.product.description}</p>
              <p>
                <strong>Price: ${product.product.price}</strong>
              </p>
              <button
                onClick={() => {
                  setselectedProduct(product.product);
                  setcheckOutVisible(true);
                }}
              >
                checkOut this product
              </button>
            </div>
          ))}
      </div>

      {checkOutVisible && selectedProduct && (
        <div className="h-[100vh] w-[100vw] rounded overflow-hidden shadow-lg p-6 bg-white fixed top-0 left-0 flex justify-center items-top">
          <div className="border-2 border-r-gray-600 h-[40vh] p-5">
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              name : {selectedProduct.name}
            </h2>
            <p className="mt-2 text-gray-700 text-sm">
              description : {selectedProduct.description}
            </p>
            <p class="mt-4 text-lg font-bold text-green-600">
              price : {selectedProduct.price}
            </p>
            <div className="flex gap-6">
              <button
                onClick={() =>
                  handleProceedToStripeCheckOutPage(selectedProduct)
                }
                class="mt-6 w-full bg-green-600 hover:bg-green-700  font-semibold py-2 rounded transition duration-300"
              >
                Proceed to buy
              </button>
              <button
                onClick={() => setcheckOutVisible(false)}
                className="mt-6 w-full bg-green-600 hover:bg-green-700  font-semibold py-2 rounded transition duration-300"
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartsPage;
