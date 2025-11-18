import express from 'express';
import WasteRequest from '../models/WasteRequest.js';
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all requests
router.get('/', async (req, res) => {
  const requests = await WasteRequest.find();
  res.json(requests);
});

// Create a new request
router.post("/", verifyToken, async (req, res) => {
  try {
    const newRequest = new WasteRequest({
      ...req.body,
      userId: req.user.id,
    });
    await newRequest.save();
    res.json(newRequest);
  } catch (err) {
    console.error("Create Request Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Update status
router.put('/:id', async (req, res) => {
  const updated = await WasteRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.get("/mine", verifyToken, async (req, res) => {
  try {
    const requests = await WasteRequest.find({ userId: req.user.id });
    res.json(requests);
  } catch (err) {
    console.error("User requests error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;