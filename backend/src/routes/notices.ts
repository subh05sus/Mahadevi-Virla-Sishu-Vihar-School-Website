import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Notice from "../models/Notice";

const router = express.Router();

// Create a new notice
router.post("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const { title, date, content } = req.body;
    const newNotice = new Notice({ title, date, content });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create notice" });
  }
});

// Get all notices
router.get("/", async (req: Request, res: Response) => {
  try {
    const notices = await Notice.find().sort("-date");
    res.status(200).json(notices);
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({ message: "Failed to fetch notices" });
  }
});

// Get a notice by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(200).json(notice);
  } catch (error) {
    console.error("Error fetching notice:", error);
    res.status(500).json({ message: "Failed to fetch notice" });
  }
});

// Delete a notice
router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error("Failed to delete notice:", error);
    res.status(500).json({ message: "Failed to delete notice" });
  }
});

export default router;
