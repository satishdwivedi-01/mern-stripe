import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SuccessPage = () => {
  const location = useLocation();

  useEffect(() => {
  const storeOrder = async () => {
    const sessionId = new URLSearchParams(location.search).get("session_id");
    const productId = localStorage.getItem("productId");

    try {
      await axios.post("http://localhost:3000/api/store-order", {
        sessionId,
        productId,
        paymentStatus: "Success", // Mark as Success explicitly
      });

      console.log("Order stored as success");
      localStorage.removeItem("productId");
    } catch (err) {
      console.error("Error storing success order:", err.message);
    }
  };

  storeOrder();
}, [location]);


  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600 my-4">✅ Payment Successful</h1>
      <p>Thank you! Your order has been recorded.</p>
    </div>
  );
};

export default SuccessPage;
