import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CancelPage = () => {
  const location = useLocation();

useEffect(() => {
  const storeOrder = async () => {
    const sessionId = new URLSearchParams(location.search).get("session_id");
    const productId = localStorage.getItem("productId");

    try {
      await axios.post("http://localhost:3000/api/store-order", {
        sessionId,
        productId,
        paymentStatus: "Cancel", // Mark as Cancel
      });

      console.log("Order stored as cancel");
      localStorage.removeItem("productId");
    } catch (err) {
      console.error("Error storing canceled order:", err.message);
    }
  };

  storeOrder();
}, [location]);



  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-red-600 my-4">❌ Payment Cancelled</h1>
      <p>Your transaction was canceled. No charges were made.</p>
    </div>
  );
};

export default CancelPage;

