// server/models/WasteRequest.js
import mongoose from "mongoose";

const wasteRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: { type: [Number], required: true }, // [lat, lon]
  photo: String,
  status: { type: String, default: "pending" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

// 👇 Default export of the model
export default mongoose.model("WasteRequest", wasteRequestSchema);