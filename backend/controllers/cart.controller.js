import Cart from "../models/carts.model.js";

export const createCart = async (req, res) => {
  try {
    // Create a new cart with an empty products array
    const newCart = new Cart({
      products: [], // Empty products array at the time of creation
    });

    // Save the new cart to the database
    const savedCart = await newCart.save();

    // Respond with the newly created cart
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const getcart = await Cart.findOne().populate("products.product");

    console.log(getCart);

    if (!getcart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(getcart); // Send the populated cart to the client
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { productId } = req.body; // Get productId from request body
    console.log("Adding product with ID:", productId);

    if (!productId) {
      return res.status(400).json({ error: "Please Refresh Before" });
    }

    // Assuming there's only one cart in the system (find the first one)
    const cart = await Cart.findOne(); // Find the first cart (assuming only one exists)

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Add the product to the cart's products array directly (no check for duplicates)
    cart.products.push({ product: productId });

    // Save the updated cart
    const saved = await cart.save();
    res.json(saved); // Return the updated cart
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
