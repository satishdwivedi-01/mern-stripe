import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get(
      "http://localhost:3000/getAllProducts"
    ); // Replace with your backend URL
    console.log("fetched products : ", response.data);
    setProducts(response.data);
    if (response.data.length < 1) {
      createDummyProductsAndCart();
    }
  };

  // Create 10 dummy products and post them to the backend
  const createDummyProductsAndCart = async () => {
    const dummyProducts = [];
    for (let i = 1; i <= 10; i++) {
      dummyProducts.push({
        name: `Product ${i}`,
        description: `This is a description for Product ${i}`,
        price: (i * 10).toFixed(2),
        category: `Category ${i}`,
      });
    }

    try {
      await Promise.all(
        dummyProducts.map(
          (product) =>
            axios.post("http://localhost:3000/createProduct", product)
        )
      );

      const response = await axios.post("http://localhost:3000/createCart");

      console.log("New cart created:", response.data);
      setProducts(dummyProducts); // Set the dummy products in the state once they are created successfully
      fetchProducts();
      console.log("Dummy products and Cart created successfully : ", dummyProducts);
    } catch (err) {
      console.error("Error creating products:", err.message);
    }
  };

  

  useEffect(() => {
    // Fetch products only after dummy products are created and set
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products]);

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:3000/addProductToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json(); // Parse JSON from response

      if (!response.ok) {
        // Show server-sent error message if available
        throw new Error(data.error || "Failed to add product to cart");
      }

      console.log("Cart updated:", data);
      alert("✅ Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
      alert(`${error.message}`);
    }
  };



  return (
    <div>
      <div className="flex gap-[30vw] mb-8 mt-3">
        <h1>Product List</h1>
        <button onClick={() => navigate('/cart')}>see cart</button>
      </div>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul className="flex flex-wrap gap-5">
          {products.map((product) => (
            <li key={product._id} className="border-2 border-gray-600 p-2">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => handleAddToCart(product._id)}>
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductPage;
