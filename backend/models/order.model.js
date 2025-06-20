import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    productItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    email: { type: String, required: true },
    paymentStatus: { type: String, enum: ["Success", "Cancel"], required: true },
    transactionId: { type: String, required: true }, // Stripe ID
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
